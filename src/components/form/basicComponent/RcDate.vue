<template>
    <el-form-item :label="label" label-width="22%" class="k-form-item_content">
        <el-col :span="10">
            <el-date-picker @change="handleStartTime" value-format="yyyy-MM-dd" type="date" placeholder="选择时间" v-model="formData[(multiple && multiple[0]) || startTime]" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="inline" :span="2">---</el-col>
        <el-col :span="10">
            <el-date-picker @change="handleEndTime" type="date" value-format="yyyy-MM-dd" placeholder="选择时间" v-model="formData[(multiple && multiple[1]) || endTime]" style="width: 100%;"></el-date-picker>
        </el-col>
    </el-form-item>
</template>

<script>
    export default {
        inheritAttrs: false,
        name: 'rc-date',
        props: ['formData', 'startTime', 'endTime', 'label', 'multiple'],
        data() {
            return {}
        },
        methods: {
            handleStartTime(val) {
                this.updateForm(this.startTime, val);
            },
            handleEndTime(val) {
                this.updateForm(this.endTime, val);
            },
            updateForm(fileName, val) {
                this.$emit('input', fileName, val);
            }
        },
    }
</script>

<style scoped>
.inline {
    margin: 0 10px 0 10px;
    text-align: center;
    color: #ccc;
}
</style>