<template>
  <div class="main">
    <div class="item">
      <div>订单应付金额(含邮)</div>
      <div>
        ￥
        <span>123</span>
      </div>
      <div>
        订单总计
        <span>123</span>
      </div>
    </div>
    <div></div>
    <div @click="pay" class="foot">去支付</div>
  </div>
</template>
<script>
export default {
  props: ["orderInfo"],
  data() {
    return {};
  },
  methods: {
    pay() {
      let that = this;
      let trackId = wx.getStorageSync("trackId");
      wx.request({
        method: "POST",
        url: "http://test.api.jinaup.com/api/open/order/pay/order/1", // 仅为示例，并非真实的接口地址
        data: {
          payChannel: "1",
          prepareId: that.orderInfo.prepareId,
          platform: "4"
        },
        header: {
          "content-type": "application/x-www-form-urlencoded", // 默认值
          // 'content-type': 'application/json', // 默认值
          trackId: trackId
        },
        success(res) {
          console.log("成", res.data.result);
          wx.requestPayment({
            timeStamp: res.data.result.timeStamp,
            nonceStr: res.data.result.nonceStr,
            package: res.data.result.package,
            paySign: res.data.result.sign,
            signType: res.data.result.signType,
            paySign: res.data.result.sign,
            success(res) {
              console.log("支付成", res);
              wx.switchTab({
                url: "pages/index/main"
              });
            },
            fail(res) {
              console.log("支付失败", res);
            }
          });
        },
        error(res) {
          console.log("失败", res);
        }
      });
    }
  },
  onShow() {
    console.log("orderInfo", this.orderInfo);
  },
  onLoad() {
    console.log("onLoad,orderInfo", this.orderInfo);
  }
};
</script>




<style type="text/css">
page {
  background-color: rgba(243, 247, 247, 1);
}
.mian {
  width: 100%;
  height: 100%;
}
.item {
  margin: 10px;
  border-radius: 5px;
  background-color: #fff;
}
.foot {
  text-align: center;
  line-height: 50px;
  background: linear-gradient(
    217deg,
    rgba(248, 99, 103, 1) 0%,
    rgba(251, 37, 121, 1) 100%
  );
}
</style>