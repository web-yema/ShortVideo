<template>
	<view class="chat-list">
		<view class="list-box" @click="toChat('抖音小助手')">
			<image class="photo" src="../../static/msg/at.png" mode=""></image>
			<view class="name-box">
				<view class="nickname">抖音小助手</view>
				<view class="signature">ssdsd</view>
			</view>
		</view>

		<view class="list-box" v-for="(item,index) in arr" :key='index' @click="toChat(`机器人${item}`)">
			<image class="photo" src="../../static/msg/at.png"></image>
			<view class="name-box">
				<view class="nickname">机器人</view>
				<view class="signature">ssdsd</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr:[1,2,3,4,5,6,7,8]
			}
		},
		methods: {
			toChat(item){
				this.$store.dispatch('chatDates',{usename:'12345',nickname:item})
				uni.navigateTo({
				    url: '/components/news/chat/chat'
				});
			}
		}
	}
</script>

<style lang="less" scoped>
.chat-list{
	color: #FFFFFF;
	padding-bottom: 2rem ;
	.list-box{
		display: flex;
		padding: 1rem;
		box-sizing: border-box;
		.photo{
			width: 3rem;
			height: 3rem;
			border-radius: 50%;
			display: block;
			margin-right: 0.5rem;
		}
		.name-box{
			width: 70%;
			height: 3rem;
			font-size: 1rem;
			.signature{
				font-size: 0.9rem;
				color: #999999;
			}
		}
	}
}
</style>
