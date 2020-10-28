import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {
	baseUrl
} from '@/api/index.js'

import io from 'common/weapp.socket.io.js'
// const socket = io(baseUrl);
export default new Vuex.Store({
	state: {
		admin: {
			username:'1234567890',
			nickname:'12345'
		},
		squareId:0,
		chatdate:{},
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
					url: '/pages/mine/mine'
				})
			}
		},
		squareids(state,data){
			state.squareId = data
		},
		
	},
	actions: {
		// 聊天建立
		onlines({state}){
			if(state.admin.username){
				
				
			}else{
				uni.navigateTo({
				    url: '/pages/login/login'
				});
			}
			
		},
		// 消息好友信息
		chatDates({commit},data){
			commit('chatDate',data);
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