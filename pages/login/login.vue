<template>
  <view class="login">
    <uni-popup ref="popup" type="message">
      <uni-popup-message :type="succe" :message="messages"></uni-popup-message>
    </uni-popup>
    <uni-segmented-control
      :current="current"
      :values="items"
      @clickItem="onClickItem"
      style-type="text"
      active-color="#1CD0CE"
    ></uni-segmented-control>
    <view class="content">
      <view v-if="current === 0">
        <view class="viewlogin">
          <label>
            <input
              placeholder="请输入您的手机号"
              type="text"
              v-model="Flag.username"
            />
          </label>
          <label>
            <input
              placeholder="请输入您的密码"
              type="password"
              v-model="Flag.password"
            />
          </label>
        </view>

        <view class="denglu" @click="login"> 登录 </view>
      </view>
      <view v-if="current === 1">
        <view class="viewregaster">
          <label>
            <input
              placeholder="请输入您的手机号"
              type="text"
              v-model="reFlag.rename"
            />
          </label>
          <label>
            <input
              placeholder="请输入您的密码"
              type="password"
              v-model="reFlag.repass"
            />
          </label>
          <label>
            <input
              placeholder="请确认您的密码"
              type="password"
              v-model="reFlag.reendpass"
            />
          </label>
        </view>
        <view class="zhuce" @click="regaster"> 注册 </view>
      </view>
    </view>
  </view>
</template>

<script>
import uniPopupMessage from "@/components/uni-popup/uni-popup-message.vue";
import { baseUrl } from "@/api/index.js";
export default {
  components: {
    uniPopupMessage,
  },
  data() {
    return {
      // 选项卡内容
      items: ["登录", "注册"],
      current: 0,
      messages: "",
      succe: "success",
      // 登录
      Flag: {
        username: "",
        password: "",
      },
      // 注册
      reFlag: {
        rename: "",
        repass: "",
        reendpass: "",
      },
    };
  },

  methods: {
    messa(succe, messages) {
      this.succe = succe;
      this.messages = messages;
      this.$refs.popup.open();
    },
    // 登录点击事件
    login() {
      if (this.Flag.username.length == 0 && this.Flag.password.length === 0) {
        this.messa("error", "手机号和密码不能为空");
      } else {
        uni.request({
          url: `${baseUrl}/login`,
          method: "POST",
          data: {
            username: this.Flag.username,
            password: this.Flag.password,
          },
          success: (res) => {
            if (res.data.code == 203) {
              this.messa("error", res.data.message);
            } else if (res.data.code == 201) {
              this.messa("error", res.data.message);
            } else if (res.data.code == 200) {
              uni.setStorage({
                key: "token",
                data: res.data.data.token,
              });
              this.$store.dispatch("loginStates");
            }
          },
          fail: (err) => {
            console.log(err);
          },
        });
      }
    },
    // 注册点击事件
    regaster() {
      if (this.reFlag.repass.length == 0 && this.reFlag.rename.length === 0) {
        this.messa("error", "手机号和密码不能为空");
      } else if (this.reFlag.repass != this.reFlag.reendpass) {
        this.messa("error", "俩次输入的密码不一样");
      } else {
        uni.request({
          url: `${baseUrl}/register`,
          method: "POST",
          data: {
            username: this.reFlag.rename,
            password: this.reFlag.repass,
          },
          success: (res) => {
            console.log(res.data);
            if (res.data.code == "201") {
              this.messa("error", res.data.message);
            } else if (res.data.code == "202") {
              this.messa("error", res.data.message);
            } else if (res.data.code == "204") {
              this.messa("error", res.data.message);
            } else if (res.data.code === "200") {
              this.messa("success", res.data.message);
              this.current = 0;
              this.reFlag.rename = "";
              this.reFlag.repass = "";
            }
          },
          fail: (err) => {
            console.log(err);
          },
        });
      }
    },
    // 选项卡点击事件
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.viewlogin {
  width: 80%;
  height: 200rpx;
  margin: 35rpx auto;
  background-color: #ffffff;
  border-radius: 25rpx;
  box-shadow: 0px 0px 0px 3px #f9f9f9;
  padding: 30rpx;

  input {
    border-color: #878787;
    border-style: solid;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    border-left-width: 0px;
    margin: 23rpx 0rpx 50rpx 0rpx;
  }
}

.viewregaster {
  width: 80%;
  height: 300rpx;
  margin: 35rpx auto;
  background-color: #ffffff;
  border-radius: 25rpx;
  box-shadow: 0px 0px 0px 3px #f9f9f9;
  padding: 30rpx;

  input {
    border-color: #878787;
    border-style: solid;
    border-top-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    border-left-width: 0px;
    margin: 28rpx 0rpx 50rpx 0rpx;
  }
}

.denglu {
  width: 90%;
  height: 80rpx;
  border-radius: 25rpx;
  color: #ffffff;
  font-size: 30rpx;
  text-align: center;
  line-height: 80rpx;
  font-family: 微软雅黑;
  margin: 0 auto;
  background: linear-gradient(
    to bottom,
    #2ed8c4 0%,
    #2ed8c4 50%,
    #36dcaa 51%,
    #36dcaa 100%
  );
}

.zhuce {
  width: 90%;
  height: 80rpx;
  border-radius: 25rpx;
  color: #ffffff;
  font-size: 30rpx;
  text-align: center;
  line-height: 80rpx;
  font-family: 微软雅黑;
  margin: 0 auto;
  background: linear-gradient(
    to bottom,
    #2ed8c4 0%,
    #2ed8c4 50%,
    #36dcaa 51%,
    #36dcaa 100%
  );
}
</style>
