<template>
	<view class="synopsisbox">
		<view class="top_box">
			<text class="username">@{{thisuser.nickname}}</text>
			<text class="username"> · </text>
			<text class="timeago">1天前</text>
			<br/>
		</view>
		<view class="flex_synopsis">
			<text class="synopsistext">{{thisuser.video_describe}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			thisuser:Object
		},
		mounted() {
			
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.synopsisbox{
		padding-left: 20rpx;
	}
	.top_box{
		width: 500rpx;
		flex-direction: row;
	}
	.username{
		color: #FFFFFF;
		font-size: 34rpx;
	}
	.timeago{
		color: #c8c8c8;
		font-size: 30rpx;
	}
	.flex_synopsis{
		margin-top: 14rpx;
		flex-direction: column;
		margin-bottom: 50rpx;
		width: 500rpx;
	}
	.synopsistext{
		color: #e6e6e6;
		font-size: 30rpx;
	}
</style>
