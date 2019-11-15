<template>
   <el-date-picker
        v-model="currentValue"
        :type="date || 'date'"
        @input="onInputEvent"
        :placeholder="placeholder || `请选择${label}`">
    </el-date-picker>
</template>

<script>
import formMixins from '@/mixins/form-model';
    export default {
        name: 'RcDatePicker',
        props: ['placeholder', 'label', 'name', 'value', 'labelWidth', 'date'],
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
