<template>
	<view class="funbox">
		<view class="right_box">
			<view class="headbox">
				<image class="headimg" src="https://profile.csdnimg.cn/6/2/8/3_leizi929" mode=""></image>
			</view>
			<image @click="changexihuan" v-if="show===0" class="usicon" src="../../static/homeimg/xihuan@x1.png" mode=""></image>
			<image @click="changexihuan" v-if="show===1" class="usicon" src="../../static/homeimg/xihuan@x2.png" mode=""></image>
			<view class="numfont"><text class="num_span">99万</text></view>
			<image @click="getpinlun" class="usicon" src="../../static/homeimg/pinglun@x1.png" mode=""></image>
			<view class="numfont"><text class="num_span">0</text></view>
			<image @click="goshare" class="usicon" src="../../static/homeimg/zhuanfa@x1.png" mode=""></image>
			<view class="numfont"><text class="num_span">分享</text></view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="pinglunbox">
				<h3 class="h3box">全部评论</h3>
			</view>
		</uni-popup>
		<uni-popup ref="popup2" type="bottom">
			<view class="pinglunbox visz">
				<h3 class="h3box">分享到</h3>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:0
			};
		},
		methods:{
			changexihuan(){
				if(this.show===0){
					this.show=1
				}else{
					this.show=0
				}
			},
			getpinlun(){
				this.$refs.popup.open()
			},
			goshare(){
				this.$refs.popup2.open()
			}
		}
	}
</script>

<style lang="less" scoped>
	.headbox{
		width: 70rpx;
		height: 70rpx;
		margin-bottom: 30rpx;
		background-color: white;
		z-index: 10000;
		border-radius: 50%;
		padding: 4rpx;
		overflow: hidden;
	}
	.headimg{
		width: 66rpx;
		height: 66rpx;
		border-radius: 50%;
	}
	.funbox{
		position: relative;
	}
	.right_box{
		width: 100rpx;
	}
	.usicon{
		width: 70rpx;
		height: 70rpx;
		margin-top: 30rpx;
	}
	.pinglunbox{
		background-color: white;
		height: 900rpx;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
	}
	.visz{
		height: 400rpx;
	}
	.h3box{
		margin-left: 30rpx;
		margin-top: 20rpx;
	}
	.numfont{
		width: 70rpx;
		margin-top: 10rpx;
	}
	.num_span{
		font-size: 24rpx;
		text-align: center;
		color: white;
	}
</style>
