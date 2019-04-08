<template>
  <div class="wrap">
    <div>
      <p @click="goToIndex">
        请登录
        <Login/>
      </p>
    </div>
  </div>
</template>
<script>
import Login from "../../components/user/login";
export default {
  data: {
    info:""
  },
  components: {
    Login
  },
  methods: {
    goToIndex() {
      console.log("去首页");
      wx.getStorage({
        key: "inviteCode",
        success(res) {
          console.log(res)
        },
        fail(res){
          console.log('fail',res)
        }
      });
    }
  },
  onShow() {
    wx.getStorage({
      key: "inviteCode",
      success(res) {
        console.log(res.data);
        if (res.data) {
          wx.redirectTo({
            url: "/pages/index/main"
          });
        }
      }
    });
  }
};
</script>
<style>
</style>