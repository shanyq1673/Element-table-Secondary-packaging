<template>
    <div>
        <div class="pagination">
            <div class="remove-cule-total" v-if="pageInfo.totalPage && pageInfo.removalPage">
                <span>线索总量：{{pageInfo.totalPage}}</span>
                <span>当前活动去重后线索总数：{{pageInfo.removalPage}}</span>
            </div>
            <div class="remove-cule-total" v-if="pageInfo.totalPage === 0 && pageInfo.removalPage === 0">
                <span>线索总量：{{pageInfo.totalPage}}</span>
                <span>当前活动去重后线索总数：{{pageInfo.removalPage}}</span>
            </div>
            <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                :page-size="pageInfo.size || 20"
                :total="pageInfo.count"
                :current-page="pageInfo.current"
                @current-change="getFetchTableList"
            >
            </el-pagination>
        </div>
        <el-table
            v-loading="loading"
            :data="tableList"
            :style="{width: width}"
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
                :page-size="pageInfo.size || 20"
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

const { mapState } = createNamespacedHelpers('table');
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
            width: {
                type: String,
                default: '100%'
            }
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
            ...mapState(['pageInfo', 'tableList', 'loading'])
        },
        beforeDestroy() {
            // 表格相关数据置空
            this.$store.dispatch('table/resetTableList');
        },
        watch: {
            fetchUrl(newUrl, oldUrl) {
                if (newUrl !== oldUrl) {
                    this.$store.dispatch('table/resetTableList');
                    this.getFetchTableList(1);
                }
            },
        },
    }
</script>

<style scoped>
.pagination {
    position: relative;
    height: 60px;
    line-height: 60px;
}
.el-pagination {
    position: absolute;
    right: 10px;
    top: 0;
}
.remove-cule-total {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    color: #697387;
    font-size: 14px;
    font-weight: 400;
}

.remove-cule-total span {
    margin-right: 20px;
}
</style>