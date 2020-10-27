<template>
	<view class="page">
		<view class="messages">
			<view class="content" v-for="(item,index) in list" :key='index'>
				<text class="name">{{item.name}}: </text>
				<text class="msg">{{item.msg}}</text>
			</view>
		</view>

		<!-- 遮掩层，提示输入姓名 -->
		<view v-show="show">
			<view class="tip">
				<input class="inputName" v-model="name" placeholder="姓名或昵称" />
				<button class="submitName" @click="onSubmitName">提交</button>
			</view>
		</view>
		<view class="send">
			<input class="input" placeholder="输入内容,点击发送" v-model="content" />
			<button class="submit" @click="send()">发送</button>
		</view>
	</view>
</template>

<script>
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
			this.socket.on('connect', () => {
				console.log('connection created.')
			});

			if (this.name) {
				this.show = false
			}
			//监听广播消息
			this.getMsg()
		},
		methods: {
			//提交姓名
			onSubmitName: function() {
				console.log(this.name)
				if (this.name) {
					this.show = false
					this.socket.emit('newPeople', this.name);
				}
			},
  
			//发送消息
			send: function() {
				if (this.content) {
					this.list.push({
						"name": this.name,
						"msg": this.content
					})
					console.log(this.list)
					this.socket.emit('sendMessage', {
						"name": this.name,
						"msg": this.content
					});
					this.content = ''
					console.log(this.list.length)
					uni.pageScrollTo({
						duration: 0,
						scrollTop: this.list.length * 100
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
	page {
		width: 750rpx;
		/* height: 2000px; */
		background-color: #f3f4f5;
	}

	.page {
		width: 100%;
		padding-bottom: 3rem;
	}

	/* 遮掩层 */
	.tip {
		width: 400rpx;
		height: 400rpx;
		padding: 40rpx;
		background-color: white;
		margin: 300rpx auto;
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
		position: fixed;
		bottom: 0;
	}

	.input {
		width: 710rpx;
		padding: 20rpx;
		border: 1px solid #e8e8e8;
		border-radius: 20rpx;
	}

	.submit {
		color: white;
		background-color: #007AFF;
	}
</style>