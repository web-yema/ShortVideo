<template>
	<view>
		<view class="topNav">
			<view @click="toRt">返回</view>
			<view class="title">{{ chatdate.nickname }}</view>
		</view>
		<view class="content">
			<scroll-view
				class="content-box"
				scroll-y="true"
				:scroll-top="scrollTop"
				@scroll="scroll"
				:style="{
					height: `calc(100% - 4rem - ${boardHeight}px)`
				}"
			>
				<view @click="showBot()">
					<view v-if="list.length == 0" class="text-content"></view>
					<view v-else v-for="(item, index) in list" :key="index">
						<view class="text-content" v-if="admin.username != item.username">
							<image class="imgs" :src="receivers.photourl"></image>
							<view class="chat-box">
								<view class="title-box">
									<view class="title-name">{{ receivers.nickname }}</view>
								</view>
								<view class="text">{{ item.msg }}</view>
							</view>
						</view>
						<view class="text-content-right" v-else>
							<view class="chat-box">
								<view class="title-box">
									<view class="title-name">{{ admin.nickname }}</view>
								</view>
								<view class="text">{{ item.msg }}</view>
							</view>
							<image class="imgs" :src="admin.photourl"></image>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="send">
				<input class="input" @click="showBot()"  placeholder="输入内容,点击发送"  v-model="content" @focus="focusTextarea" @blur="blurTextarea" />
				<view class="jias" @touchend="botBootm('biaoqing')" >🤮</view>
				<view class="jia" v-show="content.length == 0" @touchend="botBootm('flie')"><image src="../../../static/image/fabu.png"></image></view>
				<view class="submit-box"><button v-show="content.length != 0" class="submit" @touchend.prevent="send()">发送</button></view>
			</view>
			<view class="board-shows" v-show='boardHeight!=0' :style="{
					height: `${boardHeight}px`
				}" >
				<view v-show="showbox=='biaoqing'">
					表情 正在开发中
				</view>
				<view v-show="showbox=='flie'">
					文件 正在开发中
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { baseUrl } from '@/api/index';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			content: '',
			list: [],
			showbox:'',
			itemAverageHeight: 200,
			inputBottom: 0,
			scrollTop: 0,
			boardHeight: 0,
			boards:0,
			old: {
				scrollTop: 0
			},
			receivers: {}
		};
	},
	onLoad() {
		// 获取聊天记录
		this.$store.dispatch('hideToast', false);
		let tiemsas = setInterval(() => {
			if (this.admin.username) {
				clearInterval(tiemsas);
				this.getMessage();
				this.$store.dispatch('qingchuxi', this.chatdate.username);
			}
		}, 100);

		//监听广播消息
		this.getMsg();
		// 监听键盘弹出
		uni.onKeyboardHeightChange(res => {
			if (res.height != 0) {
				this.boards = res.height;
			}
		});
	},

	computed: {
		...mapState(['chatdate', 'admin'])
	},

	methods: {
		botBootm(data) {
			this.showbox=data;
		
			if(this.boardHeight!=0){
				return
			}
			let ides = 0
			let tiemabs = setInterval(() => {
				ides = ides+30
				if (ides >=this.boards ) {
					clearInterval(tiemabs);
					this.boardHeight = this.boards!=0?this.boards:277
				}else{
					this.boardHeight =ides
				}
			
			}, 1)
			
		},
		showBot(){
			if(this.boardHeight==0){
				return
			}
			let ide = this.boardHeight
			let tiemab = setInterval(() => {
				ide = ide-30
				if (ide < 0) {
					clearInterval(tiemab);
					this.boardHeight = 0;
				}else{
					this.boardHeight =ide
				}

			}, 1)
			
		},
		scroll: function(e) {
			this.old.scrollTop = e.detail.scrollTop;
		},
		goTop: function(e) {
			this.scrollTop = this.old.scrollTop;
			this.$nextTick(function() {
				this.scrollTop = 0;
			});
		},
		// 获取聊天记录
		getMessage() {
			let data = {
				username: this.admin.username,
				receiver: this.chatdate.username
			};
			uni.request({
				url: `${baseUrl}/getmessage`,
				method: 'POST',
				data: data,
				success: res => {
					this.receivers = res.data.mage;
					if (res.data.data) {
						this.list = res.data.data;
					} else {
						this.list = [];
					}

					let that = this;
					this.$store.dispatch('qingchuxi', this.chatdate.username);
					//滚动到底部
					// 因为vue的虚拟DOM 每次生成的新消息都是之前的，所以采用异步setTimeout
					setTimeout(() => {
						that.scrollTop = this.itemAverageHeight * this.list.length;
					}, 100);
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		// 处理键盘弹出滚动到底部
		focusTextarea(e) {
			this.boardHeight = 0;
			this.inputBottom = e.detail.height;
			this.scrollTop += 1; //滚到底部
		},
		// 处理键盘关闭滚动到底部
		blurTextarea(e) {
			this.inputBottom = 0;
			this.scrollTop += 1; //滚到底部
		},
		// 放回上一页
		toRt() {
			uni.navigateBack({
				delta: 1
			});
		},
		//发送消息
		send() {
			if (this.content) {
				let chatData = {
					username: this.admin.username,
					nickname: this.admin.nickname,
					receiver: this.chatdate.username,
					sender: this.admin.username,
					msg: this.content
				};
				this.list.push(chatData);
				this.socket.emit('private_chat', chatData);
				this.content = '';
				let that = this;
				setTimeout(() => {
					//判断子元素高度是否大于显示高度
					that.scrollTop = this.itemAverageHeight * this.list.length; //用子元素的高度减去显示的高度就获益获得序言滚动的高度
				}, 100);
			} else {
				uni.showToast({
					title: '请输入内容',
					icon: 'none'
				});
			}
		},

		//接收消息
		getMsg() {
			//接收广播消息
			this.socket.on('reply_private_chat', content => {
				if (content.sender == this.chatdate.username) {
					this.list.push(content);
					let that = this;
					setTimeout(() => {
						that.scrollTop = this.itemAverageHeight * this.list.length;
					}, 100);
				}
			});
		}
	},
	onUnload() {
		this.$store.dispatch('hideToast', true);
	}
};
</script>
<style lang="less" scoped>
// 导航栏
.topNav {
	padding: 0 0.5rem;
	padding-top: 2.3rem;
	box-sizing: border-box;
	width: 100vw;
	height: 4.3rem;
	background: #007aff;
	display: flex;
	color: #ffffff;
	.title {
		margin-left: 0.5rem;
	}
}
// 内容
.content {
	width: 100vw;
	background: red;
	height: calc(100vh - 4.3rem);
	display: flex;
	flex-direction: column;
}
.content-box {
	width: 100vw;
	background: #f2f6fc;
	height: calc(100% - 4rem);
	padding: 0 1rem;
	padding-bottom: 0.5rem;
	overflow: hidden;
	overflow-y: scroll;
	box-sizing: border-box;
}
// 我的消息列表
.text-content-right {
	width: 100%;
	margin: 1rem 0;
	display: flex;
	justify-content: flex-end;
	.imgs {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		display: block;
		margin-left: 0.5rem;
	}
	.chat-box {
		// width: 80%;
		// height: 3rem;
		// background: red;
		.title-box {
			min-width: 1rem;
			height: 2rem;
			position: relative;
		}
		.title-name {
			position: absolute;
			top: 0;
			right: 0;
			// min-width: 5rem;
			width: 80vw;
			text-align: right;
			height: 1.5rem;
		}
		.text {
			min-width: 2rem;
			max-width: 80vw;
			min-height: 2rem;
			border-radius: 5px;
			padding: 0.5rem;
			box-sizing: border-box;
			background: #ffffff;
			word-wrap: break-word;
			white-space: normal;
			word-break: break-all;
		}
	}
}
.text-content {
	width: 100%;
	margin: 1rem 0;
	display: flex;
	.imgs {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		display: block;
		margin-right: 0.5rem;
	}
	.chat-box {
		.title-box {
			min-width: 1rem;
			height: 2rem;
			position: relative;
		}
		.title-name {
			position: absolute;
			top: 0;
			left: 0;
			width: 80vw;
			height: 1.5rem;
		}
		.text {
			min-width: 2rem;
			max-width: 80vw;
			min-height: 2rem;
			border-radius: 5px;
			padding: 0.5rem;
			box-sizing: border-box;
			background: #ffffff;
			word-wrap: break-word;
			white-space: normal;
			word-break: break-all;
		}
	}
}

// 发送消息
.send {
	width: 100vw;
	height: 4rem;
	display: flex;
	padding: 0.5rem;
	box-sizing: border-box;
	background: #ffffff;
}

.input {
	flex: 1;
	height: 2.6rem;
	margin-right: 1vw;
	box-sizing: border-box;
	padding: 20rpx;
	border: 1px solid #e8e8e8;
	border-radius: 20rpx;
	font-size: 0.9rem;
}
submit-box {
	height: 2.6rem;
	box-sizing: border-box;
}

.submit {
	margin-top: 0.3rem;
	width: 4rem;
	height: 2rem;
	line-height: 2rem;
	text-align: center;
	font-size: 0.9rem;
	color: white;
	box-sizing: border-box;
	background-color: #007aff;
}
.jias {
	width: 2rem;
	height: 2.6rem;
	font-size: 1.6rem;
	line-height: 2.6rem;
	margin-left: 0.3rem;
	text-align: center;
	// border-radius: 50%;
	// border: 2px solid #000000;
}
.jia {
	width: 2rem;
	height: 2.6rem;
	margin: 0 0.3rem;
	line-height: 2.6rem;
	text-align: center;
	border-radius: 50%;
	padding-top: 0.3rem;
	box-sizing: border-box;
}
.jia image {
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
}
.board-shows{
	background: #f2f6fc;
	// color: #FFFFFF;
	text-align: center;
	overflow: hidden;
	padding-top: 3rem;
	box-sizing: border-box;
}
</style>
