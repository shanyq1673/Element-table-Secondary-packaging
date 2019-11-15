<template>
    <div class="table-button-bar">
        <div class="table-buttons" v-if="buttonList && buttonList.length">
            <button v-for="(item, index) in buttonList" :key="index" :class="item.className" @click="item.click">
                {{item.text}}
            </button>
        </div>
        <div class="table-search-icon">

            按条件搜索
        </div>
    </div>
</template>

<script>
    export default {
        name: 'button-bar',
        props: ['buttonList'],
        data() {
            return {

            }
        }
    }
</script>

<style scoped lang="less">
.table-button-bar {
    box-shadow:0px 1px 3px 0px rgba(184,184,184,0.3);
    height: 60px;
    line-height: 60px;
    font-weight:400;
    color:rgba(77,77,77,1);
    padding: 0 25px;

    & > div {
        float: left;
    }

    .table-search-icon {
        height: 100%;
        display: flex;
        align-items: center;

        img {
            margin-right: 6px;
        }
    }

    .table-buttons {
        margin-right: 2%;

        button {
            border: none;
            font-size: 17px;
            outline: none;
        }
        .add-btn {
            background: #3063D7;
            color: #fff;
            padding: 5px 10px;
        }
    }
}
</style>
