import Vue from 'vue';
import App from './App';
import router from './router';
import api from '@/api';
import ElementUI from 'element-ui';
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('v-icon', Icon)

// Vue.component('Aloading', AtomSpinner)
// import baseTable from '@/components/baseTable.vue';
import baseTable from '@/components/baseTable.vue';
import "babel-polyfill";
// import iView from 'iview'
// import 'iview/dist/styles/iview.css'    // 使用 CSS


// Vue.use(iView);
Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$http = api;


// token获取
router.beforeEach((to, from, next) => {
    // localStorage.setItem('accessToken', 值);
    const token = localStorage.getItem('token');
    console.log(token);
    if(!token && to.path !== '/login'){
        // console.log(accessToken);
        next('/login');
    }else {
        next();
    }
});

// 全局注册组件
Vue.component('baseTable', baseTable);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');


//重写message的显示时间
Vue.prototype.$message1 = function (msg) {
  this.$message({message: msg,duration:1000})
};


Vue.prototype.$sleep = time => {
return new Promise((resolve, reject) => {
window.setTimeout(() => {
resolve()
}, time)
})
}
