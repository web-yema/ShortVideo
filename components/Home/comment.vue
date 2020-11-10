<template>
	<view>
		<h4 class="h3box">全部评论</h4>
		<h3 class="goout" @click="goout">✖</h3>
		<view class="combody">
			<text class="nopinglun">暂无评论</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goout(){
				this.$emit('fromComment', false)
			}
		}
	}
</script>

<style lang="less">
	.h3box{
		margin-left: 30rpx;
		margin-top: 20rpx;
	}
	.goout{
		position: absolute;
		top: 20rpx;
		right: 30rpx;
	}
	.combody{
		margin-top: 20rpx;
	}
	.nopinglun{
		font-size: 28rpx;
		color: #999999;
		line-height: 720rpx;
		text-align: center;
	}
</style>
