<script>
export default {
  onLaunch: function () {
    this.$store.dispatch("admins");
    this.$store.dispatch("loginStates");
    if (this.$store.state.admin.username) {
      this.socket.on("connect", () => {
        this.socket.emit("online", this.$store.state.admin.username);
      });
    } else {
      uni.navigateTo({
        url: "/pages/login/login",
      });
    }
  },
  onShow: function () {
    console.log(this.socket.id);
    console.log("App Show");
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
