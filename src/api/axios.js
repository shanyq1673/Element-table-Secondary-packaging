/*
axios 请求
*/
const axios = require('axios');

export const baseUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000' : '';

// 添加请求拦截器，在发送请求之前执行的动作
axios.interceptors.request.use(function(config) {
    // 请求成功执行
    return config;
}, function(err) {
    // 请求错误执行
    return Promise.reject(err);
})

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    // 响应数据， 数据返回客户端前，修改响应的数据
    let res = response.data;
    if(res && res.code === 401){
        sessionStorage.setItem('errorMessage', '登录超时');
        // 登录超时跳转的路由
        return;
    }
    return response.data;
}, function(err) {
    // 响应错误
    return Promise.reject(err);
})

// 封装数据返回失败的函数
// function errorState(response) {
//     if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
//         return response;
//     } else {
//         // 数据获取错误
//     }
// }

// 封装数据返回成功提示的函数
// function successState(res) {

// }

function apiAxios(method, params, url) {
    let httpDefault = {
        method: method,
        // baseURL: baseURL, baseURL 会自动加在 url 前面，除非 url 是一个绝对 URL
        url: url,
        params: method === 'GET' ? params : null,
        data: method === 'POST' ? params : null,
        timeout: 10000,
        headers: {},
    }

    return new Promise((resolve, reject) => {
        axios(httpDefault).then(res => {
            // 这里可以调用 successState 处理成功返回的参数
            resolve(res);
        }).catch(response => {
            // 这里可以调用 errorState 处理失败返回的参数
            reject(response);
        })
    })
}

const ajax = {
    get: (url, params) => apiAxios('GET', params, url),
    post: (url, params) => apiAxios('POST', params, url),
}

export default ajax;
