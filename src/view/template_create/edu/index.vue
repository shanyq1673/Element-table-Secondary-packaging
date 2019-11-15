<template>
    <div class="tab-header-box">
        <div class="tab-header-top">
            <button @click="handleBack" class="tab-header-back-btn">返回</button>
        </div>
        <EduIndex
            v-model="formData"
            :rules="rules"
            :isChanged="isChanged"
        />

        <div class="template-submit-group" v-if="!isChanged">
            <button @click="handleSubmit" type="button" class="template-submit-btn">发布</button>
            <el-popover
                ref="backTablePopver"
                placement="top"
                width="200"
                v-model="popverStatus">
                <p><i class="el-icon-warning"></i> 您是否要保存当前修改？</p>
                <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="handleBack">取消</el-button>
                    <el-button type="primary" size="mini" @click="handleSubmit">保存</el-button>
                </div>
            </el-popover>
            <button v-popover:backTablePopver type="button" class="template-cancel-btn">取消</button>
        </div>
    </div>
</template>

<script>
    import EduIndex from '../../../components/create_template/edu';
    const templateConfig = require('./template_edu');
    import _ from 'lodash';
    import { fillImgUrl } from './defaultInfo';
    import { TEMPLATE_ADD_RUL, TEMPLATE_EDIT_URL } from '@/api/url';
    import { isArray } from '@/utils/tools';
    export default {
        name: 'edu_template',
        props: ['templateType', 'temData'],
        data() {
            return {
                formData: _.cloneDeep(this.temData.configs),
                rules: {
                    template_name: [
                        { required: true, message: '请输入模板名称', trigger: 'blur' },
                    ]
                },
                popverStatus: false,
                isChanged: false
            }
        },
        components: {
            EduIndex
        },
        mounted() {
            const type = this.templateType;

            if (type === 'view') {
                this.isChanged = true;
            }
        },
        methods: {
            handleBack() {
                this.$emit('handleBackTable');
            },
            handleSubmit() {
                let data = _.cloneDeep(this.formData);
                let subInfo = _.cloneDeep(this.temData);
                let url = TEMPLATE_ADD_RUL;

                if (_.isEmpty(data.template_name)) {
                    this.$message.error('模板名称为必填项');
                    return;
                }

                // 处理图片
                fillImgUrl.forEach(key => {
                    if (data[key] && isArray(data[key]) && data[key].length) {
                        let fileList = [];
                        data[key].map(item => {
                            fileList.push(item.path);
                        });

                        data[key] = key === 'edu_info_url' ? fileList : fileList.join(',')
                    } else if (data[key] && isArray(data[key])) {
                        data[key] = '';
                    }
                })

                if (this.templateType === 'edit') {
                    url = TEMPLATE_EDIT_URL;
                }
                subInfo.name = data.template_name;
                subInfo.tags = data.template_tags && data.template_tags.length && data.template_tags.filter(tag => tag !== 'all');
                subInfo.configs = data;
                this.$axios.post(url, subInfo).then(res => {
                    if (res.status === 1) {
                        this.$message.success(res.message);
                        this.handleBack();
                    } else {
                        this.$message.error(res.message);
                    }
                })
            }
        },
    }
</script>

<style scoped lang="less">
@import '../less/index.less';
</style>
