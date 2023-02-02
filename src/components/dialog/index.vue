<template>
    <el-dialog
        :title="title"
        :visible="status"
        :width="width"
        @close="handleCancel"
        id="costomModel"
    >
        <el-form ref="modelForm" :rules="rules" :model="formData" label-suffix=":" :label-width="labelWidth">
            <el-row>
                <el-col :span="field.cols" v-for="(field, index) in modelConfig.modelList" v-bind:key="index">
                    <component
                        :key="index"
                        :is="field.fieldType"
                        :label="field.label"
                        :multiple="field.multiple"
                        @input="updateForm"
                        :options="field.options"
                        v-bind="{...$attrs, ...field}"
                        :ref="field.name"
                        :formData="formData"
                        :getFetchList="getFetchList && getFetchList[field.name]"
                        :operationType="type"
                        :value="formData[field.name]"
                    >
                    </component>
                </el-col>
                <el-col :span="24" >
                    <slot name="buttons" >
                        <el-form-item class="dialog-footer">
                            <el-button type="primary" :disabled="disabled" @click="handleOkFn">确定</el-button>
                            <el-button :disabled="disabled" type="info" @click="handleCancel">取消</el-button>
                        </el-form-item>
                    </slot>
                </el-col>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<script>
import RcSelect from '@/components/form/basicComponent/RcSelect';
import RcInput from '@/components/form/basicComponent/RcInput';
import RcRadio from '@/components/form/basicComponent/RcRadio';
import RcDatePicker from '@/components/form/basicComponent/RcDatePicker';
import RcTextarea from '@/components/form/basicComponent/RcTextarea';
import { mapGetters } from 'vuex';
import _ from 'lodash';
/**
 * @param status 模态框状态
 * @param title 模态框标题
 * @param width 模态框宽度
 * @param modelConfig 模态框配置文件
 * @param defaultValue 模态框默认值
 * @param type 模态框操作状态
 * @param handleSubmitInfo 处理数据函数
 * @param labelWidth 模态框表单 label 宽度
 * @param rules 表单规则
 */
    export default {
        props: {
            status: {
                type: Boolean,
                default: false
            },
            title: String,
            width: {
                type: String,
                default: '45%'
            },
            modelConfig: Object, // 表单项
            defaultValue: Object, // 默认值
            type: { // add 新增、edit 编辑、view 查看
                type: String,
                default: 'add'
            },
            handleSubmitInfo: Function, // 处理提交数据，需要 return 返回数据
            labelWidth: {
                type: String,
                default: '25%'
            },
            rules: Object,
            getFetchList: Object
        },
        data() {
            return {
                formData: this.initVal(),
                searchList: this.modelConfig.modelList,
                disabled: false
            }
        },
        components: {
            RcSelect, RcInput, RcRadio, RcTextarea, RcDatePicker
        },
        methods: {
            initVal() {
                let modelList = _.cloneDeep(this.modelConfig.modelList);
                let formData = modelList.reduce((acc, v) => {
                    // 如果存在多个key值(自定义组件)
                    if (_.isArray(v.multiple)) {
                        v.multiple.forEach(item => {
                            if (this.defaultValue && !_.isNil(this.defaultValue[item])) {
                                acc[item] = this.defaultValue[item];
                            } else {
                                acc[item] = '';
                            }
                        })
                    } else if (this.defaultValue && !_.isNil(this.defaultValue[v.name])) {
                        // 赋默认值
                        acc[v.name] = this.defaultValue[v.name];
                    } else {
                        // 默认为空
                        acc[v.name] = '';
                    }
                    return acc;
                }, {})

                return {...this.defaultValue, ...formData};
            },
            // 重置表单
            handleCancel() {
                // 清空表单
                this.$refs.modelForm && this.$refs.modelForm.resetFields();
                this.$emit('handleCancel');
                this.disabled = false;
            },
            handleOkFn() {
                this.$refs.modelForm.validate((valid) => {
                    if (valid) {
                        const { addlUrl, editUrl, tableListUrl } = this.modelConfig;
                        let url = addlUrl, data = _.cloneDeep(this.formData);
                        if (this.type === 'edit') {
                            url = editUrl;
                        }
                        if (!url) {
                            this.$emit('handleOkFn', data);
                            return;
                        }
                        this.disabled = true;
                        data = this.handleSubmitInfo ? this.handleSubmitInfo(data) : data;
                        this.$axios.post(url, data).then(res => {
                            if (res.status === 1) {
                                this.$message.success(res.message);
                                this.formData = {};
                                this.handleCancel();
                                this.$store.dispatch('table/refreshTableList');
                            } else {
                                this.disabled = false;
                                this.$message.error(res.message);
                            }
                        }).catch(err => {
                            this.disabled = false;
                            if (this.type === 'edit') {
                                this.$message.error('编辑失败, 请重试');
                            } else {
                                this.$message.error('添加失败, 请重试');
                            }
                        })
                    } else {
                        console.log(valid);
                    }
                })
            },
            updateForm(fieldName, value) {
                this.formData[fieldName] = value;
            }
        },
        watch: {
            defaultValue(newValue, oldValue) {
                let formData = _.cloneDeep(newValue);
                this.formData = {...this.formData, ...formData};
            },
            status(newValue) {
                if (newValue === false) {
                    this.$refs.modelForm && this.$refs.modelForm.resetFields();
                    this.formData = {};
                } else {
                    this.formData = this.initVal();
                }
            }
        },
    }
</script>

<style scoped lang="less">
.dialog-footer {
    text-align: center;
    margin-top: 30px;

    .dialog-cancel-btn {
        background: #999;
        color: #fff;
    }

    .dialog-submit-btn {
        background: #3063D7;
        color: #fff;
    }
}
</style>