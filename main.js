import Vue from 'vue'
import App from './App'
import io from 'common/weapp.socket.io.js'
import { baseUrl } from '@/api/index.js'
import store from './store/index.js'
import music from './utils/utils.js'
Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.socket = io(baseUrl);
// 消息提示
Vue.prototype.music =music 
const app = new Vue({
	...App,
	store
	
})
app.$mount()
