<template>
	<view>
		<view class="cu-list grid col-4 tools align-center justify-center">
				<view class="flex align-center justify-center"  @click="btns()"  >
					<image  src="../../static/msg/fans.png" mode="widthFix"></image>
					<text>粉丝</text>
				</view>
				<view class="flex align-center justify-center">
					<image src="../../static/msg/zan.png" mode="widthFix"></image>
					<text>赞</text>
				</view>
				<view class="flex align-center justify-center">
					<image src="../../static/msg/at.png" mode="widthFix"></image>
					<text>@我的</text>
				</view>
				<view class="flex align-center justify-center">
					<image src="../../static/msg/comment.png" mode="widthFix"></image>
					<text>评论</text>
				</view>
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
			btns(){
				console.log('ss')
				
			}
		}
	}
</script>

<style lang="less" scoped>
.tools{
	view{
		display: flex;
		flex-direction: column;
	}
	image{
		width: 100upx;
		height: 100upx;
		display: flex;
	}
}
.cu-list.grid{
	background-color: #161823;
	padding: 20upx 0;
	text-align: center;
	display: flex;
	justify-content:space-around;
	color: #FFFFFF;
}
.cu-list+.cu-list{
	margin-top: 0;
}
.cu-list.menu-avatar>.cu-item{
	background-color: #161823;
	border-color: rgba(110,111,117,0.5);
}
</style>
