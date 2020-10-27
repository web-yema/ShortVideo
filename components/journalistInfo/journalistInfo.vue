<template>
	<view class="box">
		<view class="video-list">
			<video src="http://domhttp.kksmg.com/2018/12/20/h264_450k_mp4_SHNewsHD30000002018122030705997091_aac.mp4" controls autoplay></video>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
.box{
	width: 100%;
	height: 93vh;
	background-color: #333333;
}
.video-list{
	height: 93vh;
}
.video-list video{
	width: 100%;
	height: 100%;
}
</style>
