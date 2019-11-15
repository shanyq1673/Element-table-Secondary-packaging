<template>
    <el-form-item :label="label" :label-width="labelWidth" :prop="name">
        <el-switch
            v-model="currentValue"
            active-color="#3063D7"
            inactive-color="#C6C6C6"
            @input="onInputEvent"
            :width="52"
            :active-value="checked || 1"
            :inactive-value="0"
            :disabled="isChanged"
        />
    </el-form-item>
</template>

<script>
    import formMixins from '@/mixins/form-model';
    export default {
        inheritAttrs: false,
        name: 'RcSwitch',
        props: ['placeholder', 'name', 'value', 'label', 'labelWidth', 'checked', 'isChanged'],
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
