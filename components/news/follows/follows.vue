<template>
	<view class="follows">
			<view class="chat-list">
			  <view
			    class="list-box"
			    v-for="(item, index) in arr"
			    :key="index"

			  >
			    <image class="photo" :src="item.photourl"></image>
			    <view class="name-box">
			      <view class="nickname">{{ item.nickname }}</view>
			      <view class="signature">关注了你</view>
			    </view>
				 
				<view class="guanbox">
					<view v-if='!item.fans.includes(admin.username)' class="hui" @click="toCustoms(item)">
						回关
					</view>
					<view v-else @click="cancelBtn(item)">
						互想关注
					</view>
				 </view>
			  </view>
			</view>
	</view>
</template>

<script>
	import { baseUrl } from "@/api/index";
	import { mapState } from "vuex";
	export default {
	  data() {
	    return {
	      arr: [],
		  isshow:{}
	    };
	  },
	  mounted() {
		  let tiemsa =setInterval(()=>{
		  	if(this.admin.username){
		  		clearInterval(tiemsa)
		  		 this.friendsList()
		  	}
		  },100) 	
	  },
	  computed: {
	    ...mapState(["admin",'xiaoxitisi']),
	  },
	  methods: {
		 
		// 获取好友列表
	    friendsList(showa) {
	      uni.request({
	        url: `${baseUrl}/allfans`,
	        method: "POST",
	        data: {
	          username: this.admin.username,
	        },
	        success: (res) => {
				if(showa){
					this.arr=[]
					this.arr = [...res.data.data];
				}else{
					 this.arr = res.data.data
				}
	         
	        },
	        fail: (err) => {
	          console.log(err);
	        },
	      });
	    },
		cancelBtn(item){
			this.isshow = {
				...this.isshow,
				[item]:true
			}
			if(this.isshow[item]){
				this.isshow = {
					...this.isshow,
					[item]:false
				}
				uni.request({
				  url: `${baseUrl}/cancelfollow`,
				  method: "POST",
				  data: {
				    username: this.admin.username,
					followusername:item.username
				  },
				  success: (res) => {
					this.friendsList(item)
					this.socket.emit("friends", {
						followusername:item.username
					});
					this.isshow = {
						...this.isshow,
						[item]:true
					}
				  },
				  fail: (err) => {
				    console.log(err);
				  },
				});
			}
			
		},
		toCustoms(item){
			uni.request({
			  url: `${baseUrl}/setfollow`,
			  method: "POST",
			  data: {
			    username: this.admin.username,
				followusername:item.username
			  },
			  success: (res) => {
				this.friendsList(item)
				this.socket.emit("friends", {
					followusername:item.username
				});
			  },
			  fail: (err) => {
			    console.log(err);
			  },
			});
		}
	    
	  },
	  onUnload(){
		  this.$store.dispatch("admins");
		  this.$store.dispatch('friendsList')
		  this.$store.dispatch("loginStates");
	  }
	};
</script>

<style lang="less" scoped>
.follows{
	width: 100vw;
	min-height:100vh;
	background-color: #161823;
}
.chat-list {
  color: #ffffff;
  padding-bottom: 2rem;
  .list-box {
    display: flex;
    padding: 1rem;
    box-sizing: border-box;
    .photo {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      display: block;
      margin-right: 0.5rem;
    }
    .name-box {
      width: 65%;
      height: 3rem;
      font-size: 1rem;
      .signature {
        font-size: 0.9rem;
        color: #999999;
      }
    }
	
	.guanbox{
		width: 20%;
		height: 1.5rem;
		border-radius: 3px;
		background: #999999;
		color: #F0F0F0;
		text-align: center;
		line-height: 1.5rem;
		font-size: 0.8rem;
	}
	.hui{
		background: red;
	}
  }
}
</style>


