<template>
	<view>
		<view class="box">
			<view class="title">
				Generator是ES6中新增的语法，和Promise一样，都可以用来异步编程
			</view>
			<view class="img-list">
				<image class="img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2703043434,1252590424&fm=26&gp=0.jpg" mode=""></image>
				<image class="img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2703043434,1252590424&fm=26&gp=0.jpg" mode=""></image>
				<image class="img" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2703043434,1252590424&fm=26&gp=0.jpg" mode=""></image>
			</view>
			<view class="publisher">
				
			</view>
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
	width: 32%;
	height: 20vh;
	margin-top: 1vh;
	margin-left: 1vw;
}
.publisher{
	width: 90%;
	height: 4vh;
	margin: 2vw auto;
	background-color: red;
}
</style>
