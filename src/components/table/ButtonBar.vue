<template>
    <div class="table-button-bar">
        <div class="table-buttons" v-if="buttonList && buttonList.length">
            <div style="float: left" v-for="(item, index) in buttonList" :key="index" >
                <el-upload
                    v-if="item.type === 'upload'"
                    :action="fetchUrl"
                    :headers="headers"
                    accept=".xlsx"
                    :on-success="handleSuccess"
                    multiple
                    :fileList="fileList"
                >
                    <el-button type="primary">点击上传</el-button>
                </el-upload>
                <button v-else :class="item.className" @click="item.click">
                    {{item.text}}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
// import { ACTIVITY_INDEX_IMPORT } from '@/api/url';
    export default {
        name: 'button-bar',
        props: ['buttonList'],
        data() {
            return {
                headers: {},
                fetchUrl: '',
                fileList: []
            }
        },
        mounted() {
            this.headers = { 'x-access-token': sessionStorage.getItem('token') };
        },
        methods: {
            handleSuccess(res, file, fileList) {
                this.fileList = [];
                if (res.status === 1) {
                    this.$store.dispatch('table/refreshTableList');
                    this.$message.success(res.message || '文件上传成功');
                } else {
                    this.$message.error(res.message || '文件上传失败');
                }
            },
        },
    }
</script>

<style scoped lang="less">
.table-button-bar {
    box-shadow:0px 1px 3px 0px rgba(184,184,184,0.3);
    height: 60px;
    line-height: 60px;
    font-weight:400;
    color:rgba(77,77,77,1);
    padding: 0 25px;
    position: relative;

    & > div {
        float: left;
    }


    .table-search-icon {
        height: 100%;
        display: flex;
        align-items: center;

        img {
            margin-right: 6px;
        }
    }

    .table-buttons {
        margin-right: 2%;

        button {
            border: none;
            font-size: 17px;
            outline: none;
            margin-right: 25px;
            padding: 5px 10px;
        }
        .add-btn {
            background: #3063D7;
            color: #fff;
        }
        .back-btn {
            font-weight: 400;
            background: #e2e2e2;
            color: #666;
            position: absolute;
            right: 2%;
            top: 13px;
            border-radius: 5px;
            padding: 4px 17px;
        }
    }
}
</style>