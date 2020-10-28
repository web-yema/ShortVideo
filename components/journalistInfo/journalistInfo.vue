<template>
	<view class="box">
		<view class="video-list">
			<video src="https://videocdn.jellow.site/lr2GzKAHbbLQYz1aL4s3Vex60zmM.mp4?sign=be7a7311c6dc2000837ce58a0d619e50&t=5f96beba" controls autoplay loop></video>
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
