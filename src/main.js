require('dotenv').config();
import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';
import store from './store'

Vue.config.productionTip = false

axios.defaults.baseURL = 'https://firestore.googleapis.com/v1/projects/vuejs-http-81da8/databases/(default)/documents';
// axios.defaults.headers.common['Authorization'] = ''; // commonとは全てのリクエストにアタッチするという意味
// axios.defaults.headers.get['Accept'] = 'application/json'; // getリクエストのみにアタッチするという意味

// リクエスト前の処理を行うコールバック
// 工夫：例外発生時に共通のエラーページhtmlを出力させたり
const interceptorsRequest = axios.interceptors.request.use(
  config => {
    console.log('intercepters request', config); // configとはheaderに含まれるオブジェクト
    return config;
  },
  error => {
    // axios.get(); もう一回getリクエストチャレンジ！
    return Promise.reject(error);
  },
);
const interceptorsResponse = axios.interceptors.response.use(
  response => {
    console.log('intercepters response', response); // configでもresponseでも同じ、headerに含まれるオブジェクト
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);
console.log(interceptorsRequest, interceptorsResponse, 'hello');
axios.interceptors.request.eject(interceptorsRequest);
 // この1行を記述することでconsole.logが'intercepters request'を出力しなくなった
 // つまりconst interceptorsRequestが発火しなくなった、という意味
axios.interceptors.response.eject(interceptorsResponse);

store.dispatch('autoLogin').then(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
});
