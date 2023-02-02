<template>
    <div>
        <ButtonBar :buttonList="buttonList"/>
        <SearchBar
            :searchList="tableConfig.searchList"
            :name="tableConfig.name"
            :formatSelectList="formatSelectList"
            :fetchUrl="tableConfig.fetchUrl"
            v-bind="$attrs"
            ref="form"
        />
        <RcTable
            style="padding: 0 40px;"
            :columns="tableConfig.columns"
            v-bind="tableConfig"
        />
    </div>
</template>

<script>
import SearchBar from './SearchBar';
import RcTable from './Table';
import ButtonBar from './ButtonBar';
    export default {
        inheritAttrs: false,
        name: 'table-component',
        components: { SearchBar, RcTable, ButtonBar },
        props: {
            checkSwitch: Boolean,
            tableConfig: Object,
            formatSelectList: Object,
            buttonList: Array,
        },
        data() {
            return {}
        },
        methods: {
            // 多选事件
            handleCheck(checked) {
                console.log(checked);
            },
            resetFields() {
                this.$refs.form.resetFields && this.$refs.form.resetFields();
            },
        }
    }
</script>

<style scoped>

</style>