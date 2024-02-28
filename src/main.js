import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

import "@arcgis/core/assets/esri/themes/dark/main.css"
import * as echarts from "echarts";


Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app')
