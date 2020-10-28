<template>
	<view class="funbox">
		<view class="right_box">
			<view class="headbox">
				123456
			</view>
			<image @click="changexihuan" v-if="show===0" class="usicon" src="../../static/homeimg/xihuan@x1.png" mode=""></image>
			<image @click="changexihuan" v-if="show===1" class="usicon" src="../../static/homeimg/xihuan@x2.png" mode=""></image>
			<image class="usicon" src="../../static/homeimg/pinglun@x1.png" mode=""></image>
			<image class="usicon" src="../../static/homeimg/zhuanfa@x1.png" mode=""></image>
		</view>
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
			}
		}
	}
</script>

<style lang="less" scoped>
	.headbox{
		width: 70rpx;
		height: 70rpx;
		margin-bottom: 30rpx;
		border: 3px solid #FFFFFF;
		z-index: 10000;
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
		margin: 30rpx 0;
	}
</style>
