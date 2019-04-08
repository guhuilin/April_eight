<template>
  <div>
    <div class="wop-swiper">
      <img class="bigImg" :src="arr.mainImgUrl" mode="widthFix" alt>
      <span class="page">{{idx}}/{{lenth}}</span>
    </div>
    <div class="tit">
      <div class="ones">
        <p>￥</p>
        <p class="price">{{arr.salesPrice}}</p>
        <s class="num">{{arr.vipPrice}}</s>
        <img src="/static/images/黑卡@2x.png" alt>
      </div>
      <!-- <p class="times">{{arr.earnMoney}}</p> -->
    </div>
    <div class="title">
      <div class="names">{{arr.title}}</div>
      <p>
        <span><span v-if="arr.isFreeShipping=='1'">快递包邮</span></span>
        <span>仅剩{{arr.totalStock}}件</span>
      </p>
    </div>
    <ul class="list">
      <li class="lis" @tap="toShow">
        <span>选择</span>
        <div class="rights">
          <span><span style="margin-right:5px;" v-for="(item,index) in skuData" :key="index">{{item.aname}}</span></span>
          <span><span v-if="onSkuInfo">{{onSkuInfo.skuName}}</span><img src="/static/images/jt.png" alt></span>
        </div>
      </li>
      <li v-if="couponList" class="lis" @tap="showCouponFun">
        <span>领券</span>
        <div class="rights">
          <span></span>
          <span><span v-if="onCouponInfo">{{onCouponInfo.skuName}}</span><img src="/static/images/jt.png" alt></span>
        </div>
      </li>
      <li v-if="arr.description" class="lis">
        <span>说明</span>
        <div class="rights">
          <span class="to2color">
            {{arr.description}}
          </span>
          <!-- <img src="/static/images/jt.png" alt> -->
        </div>
      </li>
      <li v-if="arr.description" class="lis">
        <span>提示</span>
        <div class="rights">
          <span class="to2color">
            {{arr.description}}
          </span>
        </div>
      </li>
    </ul>
    <div class="pic">
      <img v-for="(item,index) in imgArr" :key="index" :src="item.imgUrl" mode="widthFix" alt>
    </div>
    <ModalFrame
      v-if="show"
      :goodInfo="goodInfo"
      :skuData="skuData"
      :arr="arr"
      :pid="pid"
      :numb="numb"
      v-on:getsku='getSkuFun'
      :xg="arr.totalStock"
      v-on:toParent="newThing"
      :indexs="indexs"
      :allSku="allSku"
    />
    <!-- 优惠券 -->
    <couponItem
      v-if="showCoupon"
      :list="couponList"
      @choose="chooseCoupon"
      @close="closeCoupon"
    >
    </couponItem>
    <div class="footer">
      <div class="lefts" @click="changes">
        <img :src="boo?'/static/images/hxin.png':'/static/images/xin.png'" alt>
        <p :class="boo?'':'colos'" class>收藏</p>
      </div>
      <!-- <Login/> -->
      <button style="border-radius:0px;" @click="goPay">立即购买</button>
    </div>
  </div>
</template>
<script>
import request from "@/utils/request";
import couponItem from "../../components/coupon";
import ModalFrame from "../../components/modalFrame";
import Login from "../../components/user/login";
import {prePare} from '@/api/index'

export default {
  data: {
    showCoupon:false,//是否显示优惠券
    couponList:'',
    onCouPonItem:'',
    onSkuInfo:'',//获取的子组件sku信息
    idx: 1,
    lenth: 1,
    boo: true,
    pid: "",
    arr: {}, //商品的信息
    asd: {}, //是否包邮
    skuData: [], //商品的sku
    show: false,
    basePid: "",
    userIdentity: "",
    imgArr: {},
    numb: 1, //模态框里商品的数量
    indexs: 0, //sku默认下标
    size: "默认", //存储的size
    num: 1, //存储的num
    skuKey: "", //单个商品的skukey
    skuPidNums: [], //生成支付需要的参数
    allSku: [], //所有的sku,
    goodInfo:''
  },
  components: {
    ModalFrame,
    Login,
    couponItem
  },
  onLoad(options) {
    var that = this;
    that.pid = options.id;
    //获取商品的基本信息
    wx.request({
      url: "http://test.api.jinaup.com/api/open/product/info/1.0.0",
      data: {
        pid: that.pid
      },
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      success(res) {
        that.goodInfo = res.data.result
        // warehouseVo   这个判断是不是海外的
        that.arr = res.data.result;
        that.pid = res.data.result.pid;
        that.basePid = res.data.result.basePid;
        that.userIdentity = res.data.result.userIdentity;
        that.getCouPon()
        // console.log("that.arr..", that.arr);
      }
    });
    // 获取sku
    wx.request({
      url: "http://test.api.jinaup.com/api/open/product/sku/attrs/1.0.0",
      data: {
        pid: that.pid
      },
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      success(res) {
        that.skuData = res.data.result;
        console.log("that.skuData..", that.skuData);
      }
    });
    //
    // 获取产品的详情图片{version}
    wx.request({
      url: "http://test.api.jinaup.com/api/open/product/detailPicture/1.0.0",
      data: {
        pid: that.pid,
        basePid: that.basePid,
        userIdentity: that.userIdentity
      },
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      success(res) {
        that.imgArr = res.data.result;
        // console.log("that.详情图片..", res);
      }
    });
    // 获取skukey
    // request
    //   .post("/api/open/product/info", {
    //     pid: that.pid
    //   })
    //   .then(res => {
    //     that.skuKey = res.data.result.supplierProductSkuVoList[0].skuKey;
    //     that.allSku = res.data
    //     console.log("秒杀", res.data);
    //   });
  },
  methods: {
    // 获取子组件sku信息
    getSkuFun(item){
      console.log('获取子组件sku信息',item)
      this.onSkuInfo = item
    },
    getVal(e) {
      this.idx = e.target.current + 1;
    },
    changes() {
      this.boo = !this.boo;
    },
    showCouponFun(){
      this.showCoupon = true
      console.log('点击优惠券组件',this.showCoupon)
    },
    closeCoupon(){
      this.showCoupon = false
    },
    chooseCoupon(item){
      this.showCoupon = false
      this.onCouPonItem = item
    },
    // 控制模态框的限时隐藏
    toShow() {
      this.show = true;
      // console.log(this.show);
    },
    // 获取商品优惠券
    getCouPon(){
      let that = this
      let trackId = wx.getStorageSync("trackId");
      wx.request({
        method: "POST",
        url: "http://test.api.jinaup.com/api/open/product/coupon/info/1", // 仅为示例，并非真实的接口地址
        data: {
          couponType : "2",
          couponTypeValue: that.goodInfo.pid
        },
        header: {
          "content-type": "application/x-www-form-urlencoded", // 默认值
          // 'content-type': 'application/json', // 默认值
          trackId: trackId
        },
        success(res) {
          console.log("优惠券成", res.data);
          if (res.data.res_code == 1) {
            that.couponList = res.data.result
          }else{
            that.couponList = ''

          }
        },
        error(res) {
          console.log("失败", res);
          that.couponList = ''

        }
      });
    },
    // 生成与支付订单
    async goPay() {
      if (!this.onSkuInfo) {
        wx.showToast({
          title: '请选择规格',
          icon: 'none',
          duration: 2000
        })
        return
      }
      this.skuPidNums = [];
      var pid = this.skuData[0].attributeValueRelationVoList[0].pid;
      this.skuPidNums.push({ pid: pid, buyNum: this.num, skuKey: this.onSkuInfo.skuKey });
      let trackId = wx.getStorageSync("trackId");
      console.log("trackId", trackId);
      console.log("skuPidNums", this.skuPidNums);
      let that = this;
      let result = await prePare({
        orderChannel: "4",
        skuPidNums: JSON.stringify(this.skuPidNums)
      });
      console.log('result...', result);
      if (result.data.res_code === 1){
         wx.setStorage({
            key: "orderMian",
            data: result.data.result
          });
          wx.navigateTo({
            url: "/pages/submission/main"
          });
      }
    },
    newThing: function(val, num) {
      this.show = val;
      this.numb = num;
      // console.log(val);
    }
  }
};
</script>
<style scoped>
page {
  width: 100%;
  height: 100%;
}
.wop-swiper {
  width: 100%;
  /* height: 250px; */
}
.wop-swiper .bigImg {
  width: 100%;
  height: 100%;
}
.wop-swiper .page {
  position: absolute;
  right: 10px;
  top: 220px;
  color: #fff;
  font-size: 12px;
  background: rgba(0, 0, 0, 1);
  border-radius: 8px;
  opacity: 0.5;
  padding: 2px 4px;
  box-sizing: border-box;
}
.tit {
  display: flex;
  justify-content: space-between;
  padding: 0 14px;
  box-sizing: border-box;
  height: 32px;
  /* line-height: 32px; */
  /* background: linear-gradient(
    217deg,
    rgba(248, 99, 103, 1) 0%,
    rgba(251, 37, 121, 1) 100%
  ); */
  color: #fc5d7b;
}
.tit .ones {
  display: flex;
}
.tit .ones p {
  font-size: 16px;
}
.tit .ones p:nth-child(1) {
  font-size: 15px;
  height: 32px;
  line-height: 32px;
}
.tit .ones .price {
  font-size: 22px;
  margin-right: 10px;
}
.tit .ones .num {
  height: 32px;
  line-height: 32px;
  font-size: 15px;
  color: #a97a33;
}
.tit .ones img {
  width: 20px;
  height: 10px;
  margin-top: 13px;
  margin-left: 5px;
}
.tit .times {
  float: right;
  font-size: 16px;
  height: 32px;
  line-height: 32px;
}
.title {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.title .names {
  font-size: 18px;
  color: #323a45;
}
.title p {
  display: flex;
  justify-content: space-between;
  line-height: 3;
  font-size: 12px;
  color: #999da2;
}
.list {
  width: 100%;
  padding: 0 2%;
  box-sizing: border-box;
}
.list .lis {
  display: flex;
  font-size: 13px;
  height: 40px;
  line-height: 40px;
}
.list .lis span {
  color: #676767;
}
.list .lis .rights {
  flex: 1;
  color: #323a45;
  display: flex;
  padding: 0 5px;
  box-sizing: border-box;
  justify-content: space-between;
}
.list .lis .rights img {
  width: 10px;
  height: 10px;
  margin-top: 10px;
}
.list .lis .to2color {
  color: #fc5d7b;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid #ccc;
  text-align: center;
  display: flex;
}
.footer .lefts {
  width: 30%;
}
.footer .lefts img {
  width: 14px;
  height: 12px;
}
.footer .lefts p {
  font-size: 12px;
}
.colos {
  color: #fc5d7b;
}
.pic {
  width: 100%;
  margin-bottom: 60px;
}
.pic img {
  width: 100%;
  display: block;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
}
.footer button {
  width: 70%;
  background: linear-gradient(
    217deg,
    rgba(248, 99, 103, 1) 0%,
    rgba(251, 37, 121, 1) 100%
  );
  font-size: 18px;
  color: #fff;
}
</style>
