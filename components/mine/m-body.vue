<template>
	<view class='m-body'>
		<view class='b-one'>
			<view class='touxiang'>
				<image class='tu1' src='../../static/img/toux.jpg'></image>
				<view class='ziliao'>
					<view @click="openbianji()">编辑资料</view>
					<view>+好友</view>
				</view>
			</view>
			<view class='xinxi'>
				<p>善良的李锡</p>
				<p>微拍号：77777777</p>
			</view>
			</view>
			<view class='b-two'>
				<p>100亿获赞</p>
				<p>10亿关注</p>
				<p>70亿粉丝</p>
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
			openbianji(){
				uni.navigateTo({
					url: '/components/mine/bianji/bianji',
				});
			},
		}
	}
</script>

<style>
	.m-body{
		width: 100%;
		height: 190px;
		background-color: #171A23;
		position: relative;
	}
	.touxiang{
		position: relative;
	}
	.touxiang .tu1{
		width: 6rem;
		height: 6rem;
		border-radius:50%;
		position: absolute;
		top:-30px;
		left: 25px;
		
	}
	.ziliao{
		width: 220px;
		height: 35px;
		position: absolute;
		left: 143px;
		top: 10px;
		float: left;
	}
	.ziliao :nth-child(1){
		width: 50%;height: 100%;
		background-color: #393C45;
		float: left;
		text-align: center;
		line-height: 35px;
	}
	.ziliao :nth-child(2){
		width: 40%;height: 100%;
		background-color: #393C45;
		float: left;
		margin-left: 10px;
		text-align: center;
		line-height: 35px;
	}
	.xinxi p{
		color: #FFFFFF;
		position: absolute;
	}
	.xinxi :nth-child(1){
		position: absolute;
		top:80px;
		left:30px;
		font-size: 18px;
	}
	.xinxi :nth-child(2){
		position: absolute;
		top:110px;
		left:30px;
		font-size: 12px;
		color: #5E616C;
	}
	.b-one{
		width: 100%;
		height: 150px;
	}
	.b-two{
		width: 100%;height: 27px;
		color: #FFFFFF;
		float: left;
	}
	.b-two p{
		float: left;
		margin-left: 25px;
	}
</style>
