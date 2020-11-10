<template>
	<view class="funbox">
		<view class="right_box">
			<view class="headbox">
				<image @click="gouserlist" class="headimg" src="https://profile.csdnimg.cn/6/2/8/3_leizi929" mode=""></image>
			</view>
			<!-- 喜欢 -->
			<image @click.stop="changexihuan" v-if="thisuser.dianzan.find((n)=>n==admin.username)==admin.username?false:true" class="usicon" src="../../static/homeimg/xihuan@x1.png" mode=""></image>
			<image @click.stop="changexihuan" v-if="thisuser.dianzan.find((n)=>n==admin.username)==admin.username?true:false" class="usicon" src="../../static/homeimg/xihuan@x2.png" mode=""></image>
			<view class="numfont"><text class="num_span">99万</text></view>
			<!-- 评论 -->
			<image @click.stop="getpinlun" class="usicon" src="../../static/homeimg/pinglun@x1.png" mode=""></image>
			<view class="numfont"><text class="num_span">0</text></view>
			<!-- 转发 -->
			<image @click.stop="goshare" class="usicon" src="../../static/homeimg/zhuanfa@x1.png" mode=""></image>
			<view class="numfont"><text class="num_span">分享</text></view>
			
		</view>
		<!-- 评论 -->
		<uni-popup ref="popup" type="bottom">
			<view class="pinglunbox">
				<Comment @fromComment="getComment"/>
			</view>
		</uni-popup>
		<!-- 转发 -->
		<uni-popup ref="popup2" type="bottom">
			<view class="pinglunbox visz">
				<Share @fromComment="getComment"/>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import Comment from './comment.vue'
	import Share from './share.vue'
	export default {
		components:{
			Comment,
			Share
		},
		data() {
			return {
				islike:false,
				admin:''
			};
		},
		props:{
			thisuser:Object
		},
		mounted() {
			let _this = this
			uni.getStorage({
				key:'admin',
				success:(res)=>{
					_this.admin = res.data
				}
			})
		},
		methods:{
			// 喜欢按钮控制
			changexihuan(){
				let asd = this.admin.username
				if(this.admin){
					if(this.thisuser.dianzan.find((n)=>n==this.admin.username)){
						this.thisuser.dianzan.pop(this.admin.username)
					}else{
						this.thisuser.dianzan.push(this.admin.username)
					}
				}else{
					uni.showLoading({
					    title: '请登录',
						mask:true
					});
				}
			},
			getpinlun(){
				this.$refs.popup.open()
			},
			goshare(){
				this.$refs.popup2.open()
			},
			gouserlist(){
				uni.navigateTo({
					url:"/pages/them/them"
				})
			},
			// 评论、分享关闭按钮控制
			getComment(v){
				if(v == false){
					this.$refs.popup.close()
				}else{
					this.$refs.popup2.close()
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
