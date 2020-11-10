<template>
	<view>
		<h4 class="h3box">分享到</h4>
		<h3 class="goout" @click="goout">✖</h3>
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
				this.$emit('fromComment', 'true')
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
</style>
