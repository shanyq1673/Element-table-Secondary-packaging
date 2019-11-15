<template>
    <div>
        <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                :page-size="20"
                :total="pageInfo.count"
                :current-page="pageInfo.current"
                @current-change="getFetchTableList"
            >
            </el-pagination>
        </div>
        <el-table
            v-loading="loading"
            :data="tableList"
            style="width: 100%"
            @selection-change="handleCheck"
        >
            <el-table-column
                type="selection"
                width="55"
                v-if="checkSwitch"
            ></el-table-column>
            <el-table-column
                v-for="(item, index) in columns" :key="index"
                :prop="item.prop"
                :label="item.label"
                :formatter="item.render"
                v-bind="item"
                align="center"
                header-align="center"
            >
            </el-table-column>

        </el-table>
        <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                :page-size="20"
                :total="pageInfo.count"
                :current-page="pageInfo.current"
                @current-change="getFetchTableList"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState } = createNamespacedHelpers('table')
    export default {
        inheritAttrs: false,
        name: 'RcTable',
        props: {
            checkSwitch: Boolean,
            columns: {
                type: Array,
                default: () => []
            },
            fetchUrl: String,
        },
        data() {
            return {
                data: []
            }
        },
        methods: {
            // 多选事件
            handleCheck(checked) {
                console.log(checked);
            },
            // 分页器
            getFetchTableList(current) {
                this.$store.dispatch('table/getTableList', { url: this.fetchUrl, searchInfo: { page: current } })
            }
        },
        mounted() {
            // 获取列表数据
            this.getFetchTableList(1);
        },
        computed: {
            ...mapState(['pageInfo', 'tableList', 'loading']),
        },
        beforeDestroy() {
            // 表格相关数据置空
            this.$store.dispatch('table/resetTableList');
        }
    }
</script>

<style scoped>
.pagination {
    position: relative;
    height: 60px;
}
.el-pagination {
    position: absolute;
    right: 10px;
    top: 0;
}
</style>
