import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {
	baseUrl
} from '@/api/index.js'



export default new Vuex.Store({
	state: {
		admin: {},
		squareId: 0,
		chatdate: {},
		receivers: {}
	},
	mutations: {
		// 消息好友信息
		chatDate(state, data) {
			state.chatdate = data
		},
		Receiver(state, data) {
			state.receivers = data
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
				console.log('ss')
					uni.hideLoading();
					uni.switchTab({
						url: '/pages/mine/mine'
					})
				
			}
		},
		squareids(state, data) {
			state.squareId = data
		},

	},
	actions: {
		// 聊天建立
		onlines({
			state
		}) {
			if (!state.admin.username) {
				uni.reLaunch({
				    url: '/pages/login/login'
				});
			}
		},
		// 消息好友信息
		Receivers({
			commit
		}, data) {
			commit('Receiver', data);
		},
		// 消息好友信息
		chatDates({
			commit
		}, data) {
			commit('chatDate', data);
		},
		squareid({
			commit
		}, data) {
			commit('squareids', data)
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