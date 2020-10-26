
<template>
	<view class="page">
		<view class="messages">
			<view class="content" v-for="(item,index) in list" :key='index'>
				<text class="name">{{item.name}}: </text>
				<text class="msg">{{item.msg}}</text>
				
			</view>
		</view>

		<!-- 遮掩层，提示输入姓名 -->
		
		<view class="send">
			<input class="input" placeholder="输入内容,点击发送" v-model="content" @click="btn()" />
			<button class="submit" @click="send()">发送</button>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				show: true,
				name: '',
				list: [{
					"name": 'tip',
					"msg": 'The first content!'
				}],
				content: ''
			}
		},
		onLoad() {
			// console.log(this.chatdate)
			this.socket.on('connect', () => {
				console.log('connection created.')
			});

			if (this.name) {
				this.show = false
			}
			//监听广播消息
			this.getMsg()
			this.onSubmitName(); 
		},
	
		computed:{
			...mapState(['chatdate'])
		},
		methods: {
			btn(){
				uni.onWindowResize((res) => {
				    console.log('变化后的窗口宽度=' + res.size.windowWidth)
				    console.log('变化后的窗口高度=' + res.size.windowHeight)
				})
			},
			
			//提交姓名
			onSubmitName: function() {
				if (this.chatdate.nickname) {
					console.log(this.chatdate.nickname)
					// this.show = false
					this.socket.emit('newPeople', this.chatdate.nickname);
				}
			},
  
			//发送消息
			send: function() {
				if (this.content) {
					this.list.push({
						"name": this.chatdate.nickname,
						"msg": this.content
					})
					console.log(this.list)
					this.socket.emit('sendMessage', {
						"name": this.chatdate.nickname,
						"msg": this.content
					});
					this.content = ''
					console.log(this.list.length)
					uni.pageScrollTo({
						duration: 0,
						scrollTop: this.list.length * 200
					}) 
				} else {
					uni.showToast({
						title: '请输入内容',
						icon: 'none'
					})
				}
			},

			//接收消息
			getMsg: function() {
				//接收广播消息
				this.socket.on('getMessage', (content) => {
					console.log(content)
					this.list.push(content)
					uni.pageScrollTo({
						duration: 0,
						scrollTop: this.list.length * 300
					})
				});

				//接收有新人连接的消息
				this.socket.on('newPeer', (name) => {
					console.log(name)
					uni.showToast({
						title: name + '来吃瓜了。。'
					});
					// this.list.push(data)
				});
			}
		}
	}
</script>

<style>
/* 	page {
		width: 100vw;
		background-color: #f3f4f5;
		position: relative;
		background: #4CD964;
		
	} */

	.page {
		width: 100%;
		padding-bottom: 3rem;
		box-sizing: border-box;
	}

	/* 遮掩层 */
	.tip {
		width: 400rpx;
		height: 400rpx;
		padding: 40rpx;
		position: absolute;
		top:10%;
		left: 30%;
		background-color: white;
		/* margin: 300rpx auto; */
		border: 1rpx solid white;
		border-radius: 40rpx;
	}

	.inputName {
		width: 250rpx;
		/* height: 80rpx; */
		margin: 40rpx 0;
		padding: 20rpx;
		border: 1rpx solid #007AFF;
		border-radius: 40rpx;
	}

	.submitName {
		width: 300rpx;
		height: 80rpx;
		margin: 100rpx 0 0;
		color: white;
		background-color: #007AFF;
	}

	.messages {
		width: 100vw;
		margin: 0rpx auto 5rem;
	}

	.content {
		width: 100%;
		display: flex;
		/* flex-direction: column; */
		align-items: center;
		justify-content: flex-start;

	}
	.name {
		margin-right: 10rpx;
	}

	.msg {
		/* display: flex;
		flex-wrap:wrap; */
		background-color: white;
		padding: 20rpx;
		border: 1rpx solid white;
		border-radius: 20rpx;
		margin: 20rpx 0 0;
		word-wrap: break-word;
		word-break: break-all;
	}

	.send {
		width: 100vw;
		height: 4rem;
		/* background: #007AFF; */
		position: fixed;
		bottom: 0;
		display: flex;
		padding: 0 0.5rem;
		box-sizing: border-box;
	}

	.input {
		width: 78vw;
		height: 3rem;
		margin-right: 1vw;
		box-sizing: border-box;
		padding: 20rpx;
		border: 1px solid #e8e8e8;
		border-radius: 20rpx;

	}

	.submit {
		width: 20vw;
		height: 3rem;
		color: white;
		box-sizing: border-box;
		background-color: #007AFF;
	}
</style>
