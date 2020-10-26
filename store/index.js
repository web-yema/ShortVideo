import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {
	baseUrl
} from '@/api/index.js'
export default new Vuex.Store({
	state: {
		admin: {
			username:'15735163995',
			nickname:'lxp'
		},
		squareId:0,
		chatdate:{
			username:'15735163994'
		},
	},
	mutations: {
		// 消息好友信息
		chatDate(state,data){
			state.chatdate=data
		},
		tologins(state) {
			state.admin = {}
		},
		admins(state) {
			const admin = uni.getStorageSync('admin');

			if (admin) {
				state.admin = admin
			}

		},
		loginStatesa(state, data) {
			state.admin = data.data
			const admins = uni.getStorageSync('admin');
			uni.setStorage({
				key: 'admin',
				data: data.data
			});
			if (!admins) {
				uni.switchTab({
					url: '/pages/mys/mys'
				});
			}
		},
		squareids(state,data){
			state.squareId = data
		},
		
		
		
	},
	actions: {
		// 消息好友信息
		chatDates({commit},data){
			console.log('ss')
			commit('chatDate',data)
		},
		squareid({commit},data){
			commit('squareids',data)
		},
		tologin({
			commit
		}) {
			commit('tologins')
		},
		admins({
			commit
		}) {
			commit('admins')
		},
		// 验证登录
		loginStates({
			commit
		}) {
			const token = uni.getStorageSync('token');
			uni.request({
				url: `${baseUrl}/getadmin`,
				method: "POST",
				data: {
					token: token
				},
				success: res => {
					if (res.data.code == 200) {
						commit('loginStatesa', res.data)
					} else {
						// 清除缓存
						uni.clearStorage('token');
						uni.clearStorage('admin');
					}

				},
				fail: (err) => {
					console.log(err)
				}
			})
		}
	},
	modules: {}
});