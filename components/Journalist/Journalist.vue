<template>
	<view>
		<view class="box" v-for="(tuijian,index) in Journalist" :key="index">
			<view class="title">
				{{tuijian.title}}
			</view>
			<view class="img-list" @tap="openjournalistInfo">
				<video class="img" :src="tuijian.videourl" mode=""></video>
			</view>
			<view class="publisher">
				<text class="user">{{tuijian.user}}</text>
				<text class="date">{{tuijian.date}}</text>
				<text class="time">{{tuijian.time}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Journalist:[
					{
						_id:'1',
						title:'Generator是ES6中新增的语法，和Promise一样，都可以用来异步编程',
						videourl:'https://videocdn.jellow.site/lr2GzKAHbbLQYz1aL4s3Vex60zmM.mp4?sign=be7a7311c6dc2000837ce58a0d619e50&t=5f96beba',
						user:'哈哈哈',
						date:'2020-4-14',
						time:'17:24:08'
					}
				],
			};
		},
		methods: {
			openjournalistInfo(e){
				uni.navigateTo({
					url: '/components/journalistInfo/journalistInfo',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
		}
	}
</script>

<style lang="less">
.box{
	width: 90%;
	margin: 1vh auto;
	border: 1rpx solid #FFFFFF;
	border-radius: 12px;
	box-shadow: darkgrey 0px 0px 10px 1px;
}
.title{
	width: 90%;
	margin: 2vw auto;
	font-size: 28rpx;
}
.img-list{
	width: 90%;
	height: 22vh;
	margin: 2vw auto;
}
.img-list .img{
	width: 100%;
	height: 20vh;
	margin-top: 1vh;
	margin-left: 1vw;
}
.publisher{
	width: 90%;
	height: 4vh;
	margin: 2vw auto;
}
.user{
	font-size: 28rpx;
	color: #909399;
}
.date{
	font-size: 20rpx;
	color: #909399;
	margin-left: 2vw;
}
.time{
	font-size: 20rpx;
	color: #909399;
	margin-left: 2vw;
}
</style>
