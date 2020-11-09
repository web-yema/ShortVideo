
<script>
import { mapState } from "vuex";
export default {
  onLaunch: function () {
    this.$store.dispatch("admins");
    this.$store.dispatch("loginStates");
    this.socket.on("connect", () => {});
    // 获取登录信息
    if (this.$store.state.admin.username) {
      uni.switchTab({
        url: "/pages/index/index",
      });
      this.socket.emit("online", this.$store.state.admin.username);
    } else {
      uni.reLaunch({
        url: "/pages/login/login",
      });
    }
    //接收广播消息
    this.socket.on("newChart", (context) => {
      this.music.play_dede();
      if (this.hideToast) {
        this.$store.dispatch("xiaoxitisi", context);
        uni.showToast({
          title: `你的好友：${context.nickname}发来消息`,
          icon: "none",
          duration: 2000,
          position: "top",
        });
      } else {
        if (this.chatdate.username !== context.username) {
          this.$store.dispatch("xiaoxitisi", context);
        }
      }
    });
  },
  onShow: function () {
    console.log("ss");

    console.log(this.socket.id);
    console.log("App Show");
  },
  computed: {
    ...mapState(["hideToast", "chatdate"]),
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
  font-family: uniicons;
  src: url("/static/uni.ttf");
}

/* #endif */
</style>
