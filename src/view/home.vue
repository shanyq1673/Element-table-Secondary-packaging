<template>
    <div>
        <RcTable
            :tableConfig="tableConfig"
            :searchForm="searchForm"
            :formatSelectList="formatSelectList"
            :handleLinkage="handleLinkage"
        />
    </div>
</template>

<script>
import RcTable from '@/components/table';
import HomeData from './home_data';
    export default {
        name: 'home',
        data() {
            return {
                tableConfig: HomeData,
                searchForm: {
                    type: '',
                    name: ''
                },
                formatSelectList: {
                    name: (list) => list.map(v => ({ id: v.text, name: v.text }))
                },
                // 处理联动
                handleLinkage: {
                    name: {key: 'sex', fetchSelectList: (val) => {
                        console.log('val', val);
                        return [{id: 0, name: '男'}, {id: 1, name: '女'}]
                    }}
                },
            };
        },
        components: {
            RcTable,
        },
        beforeCreate() {
            let columns = HomeData.columns;
            columns[columns.length-1].render = (record, _, text) => {
                return (
                    <div class="table-acions-item">
                        <el-button type="primary" onClick={() => this.handleEdit(record)}>编辑</el-button>
                        <el-button type="danger" onClick={() => this.handleDlt(record)}>删除</el-button>
                    </div>
                )
            }
        },
        methods: {
            handleEdit(record) {
                this.$message('编辑' + record.name);
                console.log(record);
            },
            handleDlt(record) {
                this.$message('删除' + record.name);
                console.log(record);
            }
        },
        mounted() {
        }
    }
</script>

<style scoped lang="less">
</style>
