<template>
    <div class="search-item-box">
        <FormGenerrator
            :serachConfig="searchList"
            v-model="formData"
            @submit="handleSubmit"
            v-bind="$attrs"
            :fetchUrl="fetchUrl"
            :inline="true"
        />
    </div>
</template>

<script>
import FormGenerrator from '../form/FormGenerrator';
    export default {
        inheritAttrs: false,
        name: 'RcTable',
        components: { FormGenerrator },
        props: {
            searchList: {
                type: Array,
                default: []
            },
            name: String,
            fetchUrl: {
                type: String,
                required: true
            },
            searchForm: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                formData: this.searchForm,
            }
        },
        methods: {
            handleSubmit() {
                let searchInfo = this.formData;
                let formData =  Object.keys(searchInfo).reduce((acc, v) => {
                    if (searchInfo[v] === 'all') {
                        acc[v] = undefined;
                    } else if (searchInfo[v]) {
                        acc[v] = searchInfo[v];
                    };

                    return acc;
                }, {});
                formData.page = 1;
                this.$store.dispatch('table/getTableList', { url: this.fetchUrl, searchInfo: formData });
            }
        },
        mounted() {}
    }
</script>

<style scoped>
.search-item-box {
    margin-top: 20px;
    padding-left: 26px;
}
</style>
