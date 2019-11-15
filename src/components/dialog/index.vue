<template>
    <el-dialog
        :title="title"
        :visible="status"
        :width="width"
        @close="handleCancel"
    >
        <FormGenerrator
            :serachConfig="dialogList"
            v-bind="$attrs"
            :inline="false"
            :footerSpan="24"
        >
            <div slot="buttons" class="dialog-footer">
                <button class="dialog-cancel-btn" type="button" @click="handleCancel">取 消</button>
                <button class="dialog-submit-btn" type="button" @click="handleOkFn">确 定</button>
            </div>
        </FormGenerrator>
    </el-dialog>
</template>

<script>
import FormGenerrator from '../form/FormGenerrator';
    export default {
        props: {
            status: {
                type: Boolean,
                default: false
            },
            title: String,
            width: {
                type: String,
                default: '45%'
            },
            dialogList: Array
        },
        components: {
            FormGenerrator,
        },
        methods: {
            handleCancel() {
                this.$emit('handleCancel');
            },
            handleOkFn() {
                this.$emit('handleOk');
            }
        },
    }
</script>

<style scoped lang="less">
.dialog-footer {
    text-align: right;

    button {
        padding: 6px 19px;
        outline: none;
        border: none;
        font-size: 14px;
        font-weight: 400;
        border-radius: 3px;
    }

    .dialog-cancel-btn {
        background: #999;
        color: #fff;
    }

    .dialog-submit-btn {
        background: #3063D7;
        color: #fff;
    }
}
</style>
