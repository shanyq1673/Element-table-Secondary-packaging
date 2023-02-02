<template>
    <div class="search-item-box" v-if="searchList && searchList.length">
        <FormGenerrator
            :serachConfig="searchList"
            v-model="formData"
            @submit="handleSubmit"
            v-bind="$attrs"
            :fetchUrl="fetchUrl"
            :inline="true"
            labelPosition="left"
            labelWidth="30%"
            ref="form"
            :handleLinkage="handleLinkage"
        />
    </div>
</template>

<script>
import FormGenerrator from '../form/FormGenerrator';
import _ from 'lodash';
    export default {
        inheritAttrs: false,
        name: 'RcTable',
        components: { FormGenerrator },
        props: {
            searchList: {
                type: Array,
                default: () => []
            },
            name: String,
            fetchUrl: {
                type: String,
                required: true
            },
            formatFormData: Function,
            defaultSearch: Object,
            handleLinkage: Object
        },
        data() {
            return {
                formData: this.initFormData(),
            }
        },
        methods: {
            initFormData() {
                let searchList = _.cloneDeep(this.searchList);

                return searchList.reduce((acc, v) => {
                    // 如果存在多个key值(自定义组件)
                    if (_.isArray(v.multiple)) {
                        v.multiple.forEach(item => {
                            if (this.defaultSearch && !_.isNil(this.defaultSearch[item])) {
                                acc[item] = this.defaultSearch[item];
                            } else {
                                acc[item] = '';
                            }
                        })
                    } else if (this.defaultSearch && !_.isNil(this.defaultSearch[v.name])) {
                        acc[item] = this.defaultSearch[v.name];
                    } else {
                        // 默认为空
                        acc[v.name] = '';
                    }

                    return acc;
                }, {})
            },
            resetFields() {
                this.$refs.form.resetFields && this.$refs.form.resetFields();
            },
            handleSubmit() {
                let searchInfo = _.cloneDeep(this.formData);
                let formData =  Object.keys(searchInfo).reduce((acc, v) => {
                    if (searchInfo[v] === 'all' || searchInfo[v] === '全部') {
                        acc[v] = '';
                        if (this.handleLinkage && this.handleLinkage[v]) {
                            acc[this.handleLinkage[v].key] = '';
                        }
                    } else if (searchInfo[v]) {
                        acc[v] = searchInfo[v];
                    } else if (searchInfo[v] === 0) {
                        acc[v] = searchInfo[v];
                    }

                    return acc;
                }, {});
                formData.page = 1;
                formData = this.formatFormData ? this.formatFormData(formData) : formData;
                this.$store.dispatch('table/getTableList', { url: this.fetchUrl, searchInfo: formData });
            }
        },
    }
</script>

<style scoped>
.search-item-box {
    margin-top: 20px;
    padding: 0 43px;
}
</style>