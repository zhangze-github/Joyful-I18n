import {createApp} from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';
import './style/global.less'
import antd from 'ant-design-vue'
import {createPinia} from 'pinia'


createApp(App).use(antd).use(createPinia()).mount('#app')
