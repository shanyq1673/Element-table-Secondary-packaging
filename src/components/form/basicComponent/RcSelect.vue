<template>
    <el-form-item :label="label" :label-width="labelWidth" :prop="name" :rules="rules">
        <el-select
            filterable
            :allow-create="isCreate"
            :multiple="multiple"
            :loading="loading"
            @focus="handleFocus"
            :placeholder="placeholder || `请选择${label}`"
            v-model="formData[name]"
            @input="handleChange"
            value-key="id"
            :disabled="isChanged"
        >
            <el-option
                label="全部"
                v-if="!isHideAll"
                :value="labelInValue ? {id: 'all', name: '全部'} : 'all'"
            >
            </el-option>
            <el-option
                v-for="item in dataList"
                :key="item.id"
                :label="item.name"
                :value="labelInValue ? item : item.id">
            </el-option>
        </el-select>
    </el-form-item>
</template>

<script>
import formMixins from '@/mixins/form-model';
import { isFunction, isArray, isString } from '@/utils/tools';
/**
 * props 参数文档
 * @param {isHideAll} 是否隐藏全部 true 隐藏 false 显示
 * @param {getSelectFetchUrl} 级联选择获取Url或者下拉框数据的集合
 * @param {handleLinkage} 级联选择配置
 * @param {formatSelectList} 获取接口的数据需要格式化的配置项
 * @param {labelInValue} value 是否绑定为集合 true 绑定全部 false id作为value被绑定
*/
    export default {
        inheritAttrs: false,
        name: 'RcSelect',
        props: ['isHideAll' ,'getSelectFetchUrl', 'handleLinkage', 'rules', 'getFetchUrl', 'isCreate', 'isChanged', 'multi', 'options', 'name', 'label', 'value', 'placeholder', 'formatSelectList', 'labelWidth', 'multiple', 'labelInValue', 'getFetchList', 'formData'],
        mixins: [formMixins],
        data() {
            return {
                dataList: [],
                loading: false,
                fetchUrl: '',
            }
        },
        methods: {
            handleFocus() {
                const options = this.options;
                // 如果是接口则请求
                if (this.dataList.length === 0 && options && isString(options)) {
                    this.getFetchSelectList(options);
                } else if (this.getSelectFetchUrl && this.getSelectFetchUrl[this.name]) {
                    let data = this.getSelectFetchUrl[this.name];
                    if (isString(data)) {
                        this.getFetchSelectList(data)
                    } else if (isArray(data)) {
                        this.dataList = data;
                    }
                }
            },
            getFetchSelectList(url) {
                this.$axios.get(url).then(res => {
                    if (res.status === 1) {
                        this.loading = false;
                        this.dataList = this.formatSelectList && this.formatSelectList[this.name] ? this.formatSelectList[this.name](res.data) : res.data;
                    } else {
                        this.loading = false;
                        this.dataList = [];
                    }
                })
            },
            fetchSelectList() {
                const options = this.options;
                // 默认值为数组，直接赋值
                if (isArray(options) && options.length) {
                    this.dataList = options;
                } else if (this.getFetchList && isArray(this.getFetchList) && this.getFetchList.length) {
                    this.dataList = this.getFetchList;
                }
            },
            handleChange(val) {
                if (this.handleLinkage && this.handleLinkage[this.name]) {
                    let info = this.handleLinkage[this.name];
                    this.$emit('input', info.key, '');
                    this.$emit('setSelectFetchUrl', info.key, info.fetchSelectList(val));
                }
                this.onInputEvent(val);
            }
        },
        mounted() {
            this.fetchSelectList()
        },
        computed: {
            formValue() {
                return this.formData[this.name];
            }
        },
        watch: {
            getFetchList(newValue, oldValue) {
                this.dataList = newValue;
            },
            formValue(newVal, oldVal) {
                if (newVal === 'all') {
                    if (this.handleLinkage && this.handleLinkage[this.name]) {
                        let info = this.handleLinkage[this.name];
                        this.$emit('input', info.key, '');
                    }
                }
            }
        },
    }
</script>

<style scoped>

</style>