import axios from '@/api/axios';

const state = {
    tableList: [], // 列表
    pageInfo: { "count": 0, "current": 1, "total": 0, "size": 20 }, // 分页器
    loading: false,
    searchInfo: {}, // 搜索条件
    fetchUrl: '', // 列表 url
};

let userList = [
    {
        id: 0,
        type: 0,
        name: '赵云',
    },
    {
        id: 1,
        type: 1,
        name: '李白',
    },
    {
        id: 2,
        type: 1,
        name: '黄忠',
    },
    {
        id: 3,
        type: 0,
        name: '张飞',
    },
    {
        id: 4,
        type: 0,
        name: '花木兰',
    },
];

const mutations = {
    // 列表赋值
    SET_TABLE_LIST(state, { data, url }) {
        state.loading = false;
        state.tableList = data;
        state.fetchUrl = url;
    },
    // 初始化列表
    INIT_TABLE_LIST(state) {
        state.tableList = [];
        state.loading = false;
        state.searchInfo = {};
        state.fetchUrl = '';
    },
    // 分页器
    SET_PATE_INFO(state, data) {
        state.pageInfo = data;
    },
    // laoding 开关
    OPEN_LOADIN_SWITCH(state) {
        state.loading = true;
    },
    // 储存搜索条件
    SAVE_SEARCH_INFO(state, data) {
        state.searchInfo = data;
    },
    // 清空搜索条件
    RESET_SEARCH_INFO(state) {
        state.searchInfo = {}
    }
};

const actions = {
    // 获取列表
    getTableList({ commit, state }, { url, searchInfo }) {
        let info = Object.assign({}, state.searchInfo, searchInfo);
        // 开启loading
        commit('OPEN_LOADIN_SWITCH');
        // 保存搜索条件
        commit('SAVE_SEARCH_INFO', searchInfo);
        // 获取列表, // 实际项目中放开请求，根据实际返回修改状态码。
        // axios.get(url, info).then(res => {
        //     let data = res.data;
        //     if (res.status === 1) {
        //         let page = {
        //             count: data.count,
        //             current: +data.page,
        //             total: data.total,
        //             size: data.num
        //         };
        //         commit('SET_PATE_INFO', page);
        //         commit('SET_TABLE_LIST', { data: data.data, url });
        //     } else {
        //         // 请求失败
        //         commit('SET_TABLE_LIST', { data: [], url });
        //     }
        // }).catch(err => {
        //     // 请求失败
        //     commit('SET_TABLE_LIST', { data: [], url });
        // })
        // 模拟列表请求
        let list = [...userList];
        if (typeof searchInfo.type === 'number') {
            list = list.filter(user => user.type === searchInfo.type)
        }
        if (searchInfo.name) {
            list = list.filter(user => user.name === searchInfo.name)
        }
        setTimeout(() => {
            commit('SET_TABLE_LIST', { data: list })
        }, 2000);
    },
    // 离开页面清空列表
    resetTableList({ commit }) {
        commit('INIT_TABLE_LIST');
    },
    // 初始化列表
    initTableList({ commit, dispatch }, url) {
        commit('RESET_SEARCH_INFO');
    },
    // 刷新当前列表
    refreshTableList({ dispatch, state }) {
        if (state.fetchUrl) {
            dispatch('getTableList', { url: state.fetchUrl });
        } else {
            console.error('检查 store/table, state 中 fetchUrl 是否赋值成功');
        }
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
