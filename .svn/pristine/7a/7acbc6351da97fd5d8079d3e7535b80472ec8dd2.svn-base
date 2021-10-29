import { createApp } from 'vue';
import App from './App.vue';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import store from './store';
import router from './router';

import './libs/flexible.js';  //自适应
import request from '@/utils/request';
import { hasPermission, hasNoPermission, hasAnyPermission, hasBtnPermission } from '@/utils/permissionDirect';
import validate from '@/utils/validate';
const Plugins = [
    hasPermission,
    hasNoPermission,
    hasAnyPermission,
    hasBtnPermission,
    validate
]

const app = createApp(App);

app.use(Antd);
app.use(store);
app.use(router);
Plugins.map((plugin) => {
    app.use(plugin);
})

app.config.productionTip = false;
app.config.globalProperties.$request = request

app.mount('#app');


