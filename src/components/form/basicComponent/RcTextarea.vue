<template>
    <el-form-item :label="label" :label-width="labelWidth" :prop="name">
        <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6}"
            :name="name"
            :value="currentValue"
            @input="onInputEvent"
            :placeholder="placeholder || `请输入${label}`"
            :maxLength="maxLength"
            :disabled="isChanged"
        />
    </el-form-item>
</template>

<script>
import formMixins from '@/mixins/form-model';
    export default {
        inheritAttrs: false,
        name: 'RcTextarea',
        props: ['placeholder', 'label', 'name', 'value', 'maxLength', 'labelWidth', 'isChanged'],
        mixins: [formMixins],
        data() {
            return {
                currentValue: this.value
            }
        }
    }
</script>

<style scoped>

</style>
