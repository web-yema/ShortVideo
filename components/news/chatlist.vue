<template>
  <view class="chat-list">
    <!-- <view class="list-box" @click="toChat('抖音小助手')">
      <image class="photo" src="../../static/msg/at.png" mode=""></image>
      <view class="name-box">
        <view class="nickname">抖音小助手</view>
        <view class="signature">ssdsd</view>
      </view>
    </view> -->

    <view
      class="list-box"
      v-for="(item, index) in arr"
      :key="index"
      @click="toChat(item)"
    >
      <image class="photo" :src="item.photourl"></image>
      <view class="name-box">
        <view class="nickname">{{ item.nickname }}</view>
        <view class="signature">{{ item.signature }}</view>
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
    };
  },
  mounted() {
    this.friendsList();
  },
  computed: {
    ...mapState(["admin"]),
  },
  methods: {
    friendsList() {
      uni.request({
        url: `${baseUrl}/getfriends`,
        method: "POST",
        data: {
          username: this.admin.username,
        },
        success: (res) => {
          this.arr = res.data.data;
        },
        fail: (err) => {
          console.log(err);
        },
      });
    },
    toChat(item) {
      this.$store.dispatch("chatDates", item);
      uni.navigateTo({
        url: "/components/news/chat/chat",
      });
    },
  },
};
</script>

<style lang="less" scoped>
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
      width: 70%;
      height: 3rem;
      font-size: 1rem;
      .signature {
        font-size: 0.9rem;
        color: #999999;
      }
    }
  }
}
</style>
