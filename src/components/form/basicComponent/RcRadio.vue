<template>
    <el-form-item :label="label" :label-width="labelWidth" :prop="name">
        <el-radio-group :disabled="isChanged" v-model="currentValue" @input="onInputEvent">
            <el-radio v-for="item in dataList" :key="item.id" :label="item.id">{{item.name}}</el-radio>
        </el-radio-group>
    </el-form-item>
</template>

<script>
import formMixins from '@/mixins/form-model';
    export default {
        inheritAttrs: false,
        name: 'RcRadio',
        props: ['placeholder', 'label', 'name', 'value', 'options', 'labelWidth', 'isChanged'],
        mixins: [formMixins],
        data() {
            return {
                currentValue: this.value,
                dataList: [],
            }
        },
        methods: {
            fetchSelectList() {
                const options = this.options;
                if (typeof options === 'object') {
                    this.dataList = options;
                }
            }
        },
        mounted() {
            this.fetchSelectList()
        }
    }
</script>

<style scoped>

</style>
