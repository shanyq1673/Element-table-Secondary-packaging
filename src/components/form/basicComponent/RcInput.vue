<template>
    <el-form-item :label="label" :label-width="labelWidth" :prop="name">
        <el-input
            type="text"
            :name="name"
            :value="currentValue"
            @input="onInputEvent"
            :placeholder="placeholder || `请输入${label}`"
            :disabled="isChanged"
        >
        </el-input>
    </el-form-item>
</template>

<script>
import formMixins from '@/mixins/form-model';
    export default {
        inheritAttrs: false,
        name: 'RcInput',
        props: ['placeholder', 'label', 'name', 'value', 'labelWidth', 'isChanged'],
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
