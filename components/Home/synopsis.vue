<template>
	<view class="synopsisbox">
		<view class="top_box">
			<text class="username">@大孙和神仙奶奶</text>
			<text class="username"> · </text>
			<text class="timeago">1天前</text>
			<br/>
		</view>
		<view class="flex_synopsis">
			<text class="synopsistext">本来生在农村的我，可以吃腊肉香肠，可以放牛，它吃草我睡觉，也不知道谁发明的进城读书，整得我现在洋不洋土不土</text>
		</view>
	</view>
</template>

<script>
	export default {
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
