<template>
    <div class="tab-header-box">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="first">
                <span slot="label">
                    <img class="default" src="@/assets/template1.png" >
                    <img class="active" src="@/assets/template1-active.png" >
                    表单页
                </span>

                <Index v-model="formData" :rules="rules" :isChanged="isChanged"/>
            </el-tab-pane>
            <el-tab-pane name="second">
                <span slot="label">
                    <img class="default" src="@/assets/template2.png" >
                    <img class="active" src="@/assets/template2-active.png" >
                    验证码页
                </span>

                <CodePage v-model="formData" :isChanged="isChanged"/>
            </el-tab-pane>
            <el-tab-pane name="third">
                <span slot="label">
                    <img class="default" src="@/assets/template3.png" >
                    <img class="active" src="@/assets/template3-active.png" >
                    完善信息页
                </span>
                <InformationPage v-model="formData" :isChanged="isChanged"/>
            </el-tab-pane>
        </el-tabs>
        <button @click="handleBack" class="tab-header-back-btn">返回</button>
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
import Index from '@/components/create_template/cars/index';
import CodePage from '@/components/create_template/cars/CodePage';
import InformationPage from '@/components/create_template/cars/InformationPage';
import { fillImgUrl } from './submitInfoConfig';
import { isArray, isEmpty } from '../../../utils/tools';
import { TEMPLATE_ADD_RUL, TEMPLATE_EDIT_URL } from '@/api/url';
import _ from 'lodash';

    export default {
        name: 'home',
        props: ['templateType', 'temData'],
        data() {
            return {
                activeName: 'first',
                token: '',
                formData: _.cloneDeep(this.temData.configs),
                temDataConfig: this.temData,
                popverStatus: false,
                rules: {
                    template_name: [
                        { required: true, message: '请输入模板名称', trigger: 'blur' },
                    ],
                    ex_brand_txt: [
                        { required: true, message: '请选择参展品牌', trigger: 'change' },
                    ]
                },
                isChanged: false
            };
        },
        components: {
            Index, CodePage, InformationPage
        },
        mounted() {
            const type = this.templateType;

            if (type === 'view') {
                this.isChanged = true;
            }
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            handleBack() {
                this.$emit('handleBackTable');
            },
            handleSubmit() {
                let data = _.cloneDeep(this.formData);
                let subInfo = _.cloneDeep(this.temDataConfig);
                let url = TEMPLATE_ADD_RUL;

                if (isEmpty(data.template_name)) {
                    this.$message.error('模板名称为必填项');
                    return;
                }
                if (data.ex_brand === 1 && isEmpty(data.ex_brand_txt)) {
                    this.$message.error('请选择参展品牌');
                    return;
                }

                // 处理图片
                fillImgUrl.forEach(key => {
                    if (data[key] && isArray(data[key]) && data[key].length) {
                        data[key] = data[key][0].path;
                    } else if (data[key] && isArray(data[key])) {
                        data[key] = '';
                    }
                })

                // 处理参展品牌
                data.ex_brand_txt = data.ex_brand_txt.reduce((acc, v) => {
                    acc.push({ key: v.id, label: v.name });
                    return acc;
                }, [])

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
                console.log(data);
            }
        },
    }
</script>

<style scoped lang="less">
    @import '../less/index.less';
</style>
