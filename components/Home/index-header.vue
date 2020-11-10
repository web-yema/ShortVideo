<template>
  <view class="index-header"
    ><!--固定定位到首页顶部-->
    <view class="middle">
      <!--搜索图标绝对定位后，middle将会上移动到顶部，在搜索图标下面，里面内容居中显示即可-->
      <text class="text" @click="tuijian">推荐</text>
      <text class="bor">|</text>
      <text class="text isthis" @click="tongcheng">同城</text
      ><!--变成行内元素-->
      <!-- <view class="text">同城</view> 设置颜色无效 -->
    </view>
	<uni-popup ref="popup" type="center">
		<view class="pinglunbox">
			<text class="popupcomment">待开发</text>
		</view>
	</uni-popup>
  </view>
</template>
<script>
export default {
	components:{
		
	},
	data(){
		
	},
	methods:{
		tuijian(){
			
		},
		tongcheng(){
			this.$refs.popup.open()
			setTimeout(()=>{
				this.$refs.popup.close()
			},2000)
			
		}
	}
}
</script>
<style scoped>
.index-header {
  position: fixed;
  top: 25px;
  left: 0;
  z-index: 200;
  width: 750upx;
  height: 70upx;
  padding: 10upx 0;
  flex-direction: column;
}
.icon {
  position: absolute;
  left: 0;
  top: 0;
  color: white;
}
.middle {
  text-align: center;
  color: white;
  font-size: 24upx;
  line-height: 50upx;
  flex-direction: row;
  justify-content: center;
}
.bor {
  height: 48upx;
  margin-top: -5upx;
  color: white;
}
.text {
  margin: 0 10px;
  text-align: center;
  color: white;
}
.pinglunbox{
	width: 400rpx;
	height: 100rpx;
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 100rpx;
	z-index: 300;
}
.popupcomment{
	color: white;
	line-height: 100rpx;
	text-align: center;
	opacity: 1 !important;
}
.isthis{
	color: #c3c3c3;
}
</style>