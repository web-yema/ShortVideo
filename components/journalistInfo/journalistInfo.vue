<template>
	<view class="box">
		<view class="load" v-if='Journalist.length==0'>
			loading...
		</view>
		<view v-else>
			<view class="title">
				{{Journalist[0].title}}
			</view>
			<view class="video-list">
				<video :src="Journalist[0].videourl" controls></video>
			</view>
			<view class="text">
				<text>{{Journalist[0].text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {baseUrl} from '@/api/index.js'
	export default {
		data() {
			return {
				Journalist:[],
			};
		},
		onLoad(e){
			// console.log(e.id)
			uni.request({
			  url: `${baseUrl}/getjournalism`,
			  method: "POST",
			  data: {
			  		"id": e.id
			  	},
			  	success: res => {
			  		if (res.data) {
						console.log(res.data.data)
						this.Journalist.push(res.data.data[0]);
			  		}
			  	},
			  	fail: err => {
			  	}
			});
		}
	}
</script>

<style lang="less">
.box{
	width: 100%;
	height: 93vh;
	overflow: hidden;
}
.load{
	line-height: 93vh;
	text-align: center;
	font-size: 30px;
	color: #FFFFFF;
}
.title{
	width: 90%;
	margin: 18px auto;
	border: 1rpx solid #FFFFFF;
	border-radius: 12px;
	box-shadow: darkgrey 0px 0px 10px 1px;
}
.video-list{
	width: 90%;
	height: 29vh;
	margin: 18px auto;
}
.video-list video{
	width: 100%;
	height: 100%;
}
.text{
	width: 90%;
	margin: 18px auto;
}
.text text{
	margin-left: 32px;
}
</style>
