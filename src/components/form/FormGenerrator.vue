<template>
    <el-form :inline="inline" :label-position="labelPosition" ref="form" :rules="rules" :model="formData" label-suffix=":" :label-width="labelWidth">
        <el-row>
            <el-col :span="field.cols" v-for="(field, index) in serachConfig" v-bind:key="index">
                <component
                    :key="index"
                    :is="field.fieldType"
                    :label="field.label"
                    :value="formData[field.name]"
                    :multiple="field.multiple"
                    @input="updateForm"
                    :options="field.options"
                    v-bind="{...$attrs, ...field}"
                    :ref="field.name"
                    :formData="formData"
                    :getFetchList="getFetchList && getFetchList[field.name]"
                    :getSelectFetchUrl="getSelectFetchUrl"
                    @setSelectFetchUrl="setSelectFetchUrl"
                >
                </component>
            </el-col>
            <el-col :span="footerSpan" >
                <slot name="buttons" :submitForm="submitForm" >
                    <div class="search-btn" @click="submit">搜 索</div>
                    <div class="reset-btn" @click="reset">清 空</div>
                </slot>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
import RcSelect from './basicComponent/RcSelect';
import RcDatePicker from './basicComponent/RcDatePicker';
import RcInput from './basicComponent/RcInput';
import RcRadio from './basicComponent/RcRadio';
import RcSelectDate from './basicComponent/RcSelectDate';
import RcDate from './basicComponent/RcDate';
    export default {
        props: {
            serachConfig: Array,
            value: Object,
            fetchUrl: String,
            inline: {
                type: Boolean,
                default: true
            },
            footerSpan: {
                type: Number,
                default: 6
            },
            labelWidth: {
                type: String,
                default: '45%'
            },
            rules: Object,
            getFetchList: Object,
            labelPosition: {
                type: String,
                default: 'right'
            }
        },
        data() {
            return {
                formData: this.value,
                getSelectFetchUrl: {}
            }
        },
        components: {
            RcDatePicker, RcSelect, RcRadio, RcInput, RcSelectDate, RcDate
        },
        methods: {
            updateForm(fieldName, value) {
                this.formData[fieldName] = value;
            },
            setSelectFetchUrl(fieldName, url) {
                this.getSelectFetchUrl[fieldName] = url;
            },
            submit() {
                this.$emit("submit");
            },
            // 重置表单
            resetFields() {
                this.$refs.form.resetFields();
            },
            // 提交验证
            submitForm(formName) {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        console.log('submit');
                    } else {
                        console.log(valid);
                    }
                })
                console.log(this.$refs.form.validate);
            },
            reset() {
                for (var key in this.formData) {
                    if (typeof this.formData[key] === "String") {
                        this.formData[key] = "";
                    } else {
                        this.formData[key] = null;
                    }
                }
                // 存在列表 url 清空
                if (this.fetchUrl) {
                    this.$store.dispatch('table/initTableList', { url: this.fetchUrl })
                }
            }
        },
        watch: {
            value(newValue, oldValue) {
                this.formData = newValue;
            },
        },
    }
</script>

<style>
.el-form-item {
    width: 100%;
}
</style>

<style scoped lang="less">
.search-btn, .reset-btn {
    width: 74px;
    height: 34px;
    border: none;
    outline: none;
    display: inline-block;
    text-align: center;
    line-height: 34px;
    font-size: 14px;
    font-weight: 400;
    border-radius: 3px;
    cursor: pointer;
}

.search-btn {
    background: #3063D7;
    color: #fff;
    margin-right: 20px;
}

.reset-btn {
    color: #858585;
    background: #E4E9F0;
}
</style>