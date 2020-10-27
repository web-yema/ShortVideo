import Vue from 'vue'
import App from './App'
import io from 'common/weapp.socket.io.js' 
import {baseUrl} from '@/api/index.js'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.socket=io(baseUrl);
const app = new Vue({
	...App
})
app.$mount()
