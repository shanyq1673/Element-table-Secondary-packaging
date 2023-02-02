<template>
    <div class="select-data-box">
        <div @click="handleYesterday">昨天</div>
        <div @click="handleToday">今天</div>
        <div @click="handleSevenDaysAgo">7天前</div>
    </div>
</template>

<script>
    export default {
        name: 'rc-select-date',
        props: ['startTime', 'endTime'],
        methods: {
            // 昨天
            handleYesterday() {
                let day = this.$moment().subtract(1, 'days').format('YYYY-MM-DD');
                this.updateForm(day, day);
            },
            // 今天
            handleToday() {
                let day = this.$moment().format('YYYY-MM-DD');
                this.updateForm(day, day);
            },
            // 7天前
            handleSevenDaysAgo() {
                let startDay = this.$moment().subtract(7, 'days').format('YYYY-MM-DD');
                let endDay = this.$moment().subtract(1, 'days').format('YYYY-MM-DD');
                this.updateForm(startDay, endDay);
            },
            updateForm(startVal, endVal) {
                this.$emit('input', this.startTime, startVal);
                this.$emit('input', this.endTime, endVal);
            }
        },
    }
</script>

<style scoped lang="less">
.select-data-box {
    div {
        float: left;
        padding: 4px 12px;
        background: #3063D7;
        color: #fff;
        font-size: 14px;
        border-radius: 13px;
        margin: 5px 0 0 10px;
        cursor: pointer;
    }
}
</style>