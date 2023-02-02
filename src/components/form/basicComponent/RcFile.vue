<template>
    <el-form-item :label="label" :label-width="labelWidth" :prop="name">
        <el-upload
            class="upload-demo"
            :action="actionUrl"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :headers="headers"
            :on-exceed="handleExceed"
            accept="image/jpeg,image/gif,image/png"
            :disabled="isChanged"
            :limit="maxLength"
            :file-list="fileList">
            <div class="upload-file-btn" v-if="!isChanged">
                <i class="el-icon-circle-plus-outline"></i>
                <span>上传</span>
            </div>
        </el-upload>
        <el-dialog
            :visible.sync="dialogVisible"
            width="30%"
        >
            <img width="100%" :src="url">
        </el-dialog>
    </el-form-item>
</template>

<script>
// import { ACTIVITY_FILE_URL } from '@/api/url';
import formMixins from '@/mixins/form-model';
import _ from 'lodash';
import { getQuery, isArray } from '@/utils/tools';

    export default {
        inheritAttrs: false,
        name: 'file',
        props: {
            labelWidth: String,
            label: String,
            maxLength: {
                type: Number,
                default: 1
            },
            value: {
                type: [Array, String],
                default: []
            },
            isChanged: Boolean
        },
        mixins: [formMixins],
        data() {
            return {
                fileList: isArray(this.value) ? this.value : [],
                dialogVisible: false,
                actionUrl: '',
                headers: {},
                url: ''
            };
        },
        mounted() {
            this.headers = { 'x-access-token': getQuery('token') };
        },
        methods: {
            // 删除图片
            handleRemove(file, fileList) {
                this.fileList = fileList.filter(files => file.uid !== files.uid);
                this.onInputEvent(this.fileList);
            },
            // 查看图片
            handlePreview(file) {
                this.dialogVisible = true;
                this.url = file.url;
            },
            // 上传成功
            handleSuccess(res, file, fileList) {
                if (res && res.status && res.status === 1) {
                    this.$message.success(`${file.name}上传成功`);
                    this.fileList.push({
                        uid: file.uid, // 图片唯一的标识
                        name: file.name,
                        url: `http://static.yunheit.com/${res.data.fileurl}`, // 缩略图地址
                        path: res.data.fileurl, // 提交时的图片地址
                        status: 'success'
                    })
                    this.onInputEvent(this.fileList);
                } else {
                    this.$message.error(`${file.name}上传失败，${res.message}`);
                    this.fileList = fileList.filter(files => file.uid !== files.uid);
                }
            },
            // 文件上传超出函数
            handleExceed() {
                this.$message.error('文件上传已经到达上限，请删除图片后重试')
            }
        },
        watch: {
            value(newValue, oldValue) {
                if (!_.isEqual(newValue, this.fileList) && typeof newValue !== 'string') {
                    this.fileList = newValue;
                }
            },
        },
    }
</script>

<style scoped lang="less">
.upload-file-btn {
    text-align: right;
    width: 100%;
    display: block;

    i {
        color: #FF3914;
        position: relative;
        left: 3px;
        top: 1px;
    }
    span {
        color: #FF3914;
        font-size:12px;
        font-weight: 400;
    }
}
</style>
