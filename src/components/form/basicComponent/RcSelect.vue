<template>
    <el-form-item :label="label" :label-width="labelWidth" :prop="name" :rules="rules">
        <el-select
            filterable
            :allow-create="isCreate"
            :multiple="multiple"
            :loading="loading"
            @focus="handleFocus"
            :placeholder="placeholder || `请选择${label}`"
            v-model="currentValue"
            @input="onInputEvent"
            value-key="id"
            :disabled="isChanged"
        >
            <el-option
                label="全部"
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
import { isFunction } from '@/utils/tools';
    export default {
        inheritAttrs: false,
        name: 'RcSelect',
        props: ['rules', 'isCreate', 'isChanged', 'multi', 'options', 'name', 'label', 'value', 'placeholder', 'formatSelectList', 'labelWidth', 'multiple', 'labelInValue', 'getFetchList'],
        mixins: [formMixins],
        data() {
            return {
                currentValue: this.value,
                dataList: [],
                loading: false,
                fetchUrl: ''
            }
        },
        methods: {
            handleFocus() {
                const options = this.options;
                // 如果是接口则请求
                if (this.dataList.length === 0 && options && typeof options === 'string') {
                    // 根据后台接口返回规范更改
                    this.$axios.get(options).then(res => {
                        if (res.status === 1) {
                            this.loading = false;
                            this.dataList = this.formatSelectList && this.formatSelectList[this.name] ? this.formatSelectList[this.name](res.data) : res.data;
                        } else {
                            this.loading = false;
                            this.dataList = [];
                        }
                    })
                }
            },
            fetchSelectList() {
                const options = this.options;
                // 默认值为数组，直接赋值
                if (typeof options === 'object') {
                    // 没有数据库，模拟formatSelectList使用, 实际项目中 可以直接赋值
                    if (this.formatSelectList && this.formatSelectList[this.name]) {
                        this.dataList = this.formatSelectList[this.name](options);
                    } else {
                        this.dataList = options;
                    }
                } else if (typeof options === 'object') {

                }
            }
        },
        mounted() {
            this.fetchSelectList()
        },
        watch: {
            getFetchList(newValue, oldValue) {
                this.dataList = newValue;
            },
        },
    }
</script>

<style scoped>

</style>
