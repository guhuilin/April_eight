<template>
  <div class="wrap">
    <div class="swiper">
      <img :src="arr.mainImgUrl" alt>
      <span class="page">{{idx}}/{{lenth}}</span>
    </div>
    <div class="tit">
      <div class="ones">
        <p>￥</p>
        <p class="price">{{arr.seckillPrice}}</p>
        <s class="num">{{arr.markePrice}}</s>
      </div>
      <p class="times">距结束 {{times}}</p>
    </div>
    <div class="title">
      <div class="names">赚{{arr.title}}</div>
      <p>
        <span>快递包邮</span>
        <span>仅剩{{arr.totalStore}}件</span>
      </p>
    </div>
    <ul class="list">
      <li class="lis">
        <span>选择</span>
        <div class="rights" @tap="toShow">
          <span>颜色 尺码</span>
          <img src="/static/images/jt.png" alt>
        </div>
      </li>
      <!-- <li class="lis">
        <span>规格</span>
        <div class="rights">
          <span>S M XL</span>
          <img src="/static/images/jt.png" alt>
        </div>
      </li>
      <li class="lis">
        <span>领券</span>
        <div class="rights">
          <span class="to2color">每满300减35券 满199减20券</span>
          <img src="/static/images/jt.png" alt>
        </div>
      </li>-->
    </ul>
    <div class="pic">
      <img v-for="(item,index) in imgArr" :key="index" :src="item.imgUrl" alt>
    </div>
    <ModalFrame
      v-if="show"
      :skuData="skuData"
      :arr="arr"
      :pid="pid"
      :numb="numb"
      :xg="arr.totalStore"
      v-on:toParent="newThing"
      :indexs="indexs"
    />
    <div class="footer">
      <div class="lefts" @click="changes">
        <img :src="boo?'/static/images/hxin.png':'/static/images/xin.png'" alt>
        <p :class="boo?'':'colos'" class>收藏</p>
      </div>
      <button @click="addPage">立即购买</button>
    </div>
  </div>
</template>
<script>
import setTime from "../../utils/index.js";
import request from "@/utils/request";
import ModalFrame from "../../components/modalFrame";
export default {
  data: {
    pid: "", //商品ID
    arr: "", //存储商品数据
    name: "", //获取商品
    idx: 1, //轮播图初始下标
    lenth: 1, //轮播图长度
    boo: true,
    show: false,
    numb: 1,
    indexs: 0,
    skuData: [],
    basePid: "",
    userIdentity: "",
    imgArr: [],
    skuPidNums: [],
    skuKey: "",
    times: ""
  },
  components: {
    ModalFrame
  },
  onLoad(options) {
    this.pid = options.id;
    this.name = options.name;
    console.log("this.pid", this.pid);
  },
  mounted() {
    var that = this;

    setInterval(() => {
      var date = new Date();
      var nowDate = date.getTime(); // 当前时间
      // console.log('nowDate', nowDate)
      var str = "2019/4/3 00:00:00"; //后一天
      var nextDate = new Date(str);
      var leftTime = nextDate - nowDate;
      // console.log('leftTime', leftTime)
      var d, h, m, s;
      if (leftTime >= 0) {
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        m = Math.floor((leftTime / 1000 / 60) % 60);
        s = Math.floor((leftTime / 1000) % 60);
      }
      // console.log(d, h, m, s)
      if (h < 10) {
        h = "0" + h;
      } else if (m < 10) {
        m = "0" + m;
      } else if (s < 10) {
        s = "0" + s;
      }
      that.times = h + ":" + m + ":" + s;
      // console.log(that.times)
    }, 1000);
  },
  onShow() {
    var that = this;
    var data = new Date();
    // console.log('data....',setTime.formarTime('123'))
    // 获取数据
    wx.request({
      url: "http://test.api.jinaup.com/api/open/product/seckill/query/1",
      data: {
        pageIndex: 1,
        dayType: 1
      },
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值
      },
      success(res) {
        res.data.result.spike.map((item, index) => {
          if (that.name == item.title) {
            that.arr = item;
            that.basePid = that.arr.jumpUrl.split("&")[1].split("=")[1];
            that.userIdentity = that.arr.jumpUrl.split("&")[2].split("=")[1];
          }
        });
      }
    });
    // 获取SKU数据
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
    // 获取图片列表
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
        // console.log("that.详情图片..", that.imgArr);
      }
    });
    //
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
        console.log("that.skuData.12312312312.", res.data.result);
      }
    });
  },
  methods: {
    changes() {
      this.boo = !this.boo;
    },
    newThing: function(val, num) {
      this.show = val;
      this.numb = num;
      // console.log(val);
    },
    // 控制模态框的限时隐藏
    toShow() {
      this.show = true;
    },
    // 生成与支付订单
    addPage() {
      this.skuPidNums = [];
      var pid = this.skuData[0].attributeValueRelationVoList[0].pid;
      this.skuPidNums.push({
        pid: pid,
        buyNum: this.numb,
        skuKey: this.skuKey
      });
      let trackId = wx.getStorageSync("trackId");
      // console.log("this.skuKey", this.skuKey);
      // console.log("trackId", trackId);
      // console.log("skuPidNums", this.skuPidNums);
      let that = this;
      wx.request({
        method: "POST",
        url: "http://test.api.jinaup.com/api/open/order/prepare/1", // 仅为示例，并非真实的接口地址
        data: {
          orderChannel: "4",
          skuPidNums: JSON.stringify(this.skuPidNums)
        },
        header: {
          "content-type": "application/x-www-form-urlencoded", // 默认值
          // 'content-type': 'application/json', // 默认值
          trackId: trackId
        },
        success(res) {
          console.log("成", res.data);
          if (res.data.res_code == 1) {
            console.log("res.data.result", res.data.result);
            // wx.setStorageSync('orderMian',123)
            // that.$store.orderMian = res.data.result
            wx.setStorage({
              key: "orderMian",
              data: res.data.result
            });
            wx.navigateTo({
              url: "/pages/submission/main"
            });
          }
        },
        error(res) {
          console.log("失败", res);
        }
      });
    }
  }
};
</script>
<style lang="scss" scope>
.wrap {
  width: 100%;
  height: 100%;
}

.swiper {
  width: 100%;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }

  .page {
    position: absolute;
    right: 10px;
    top: 180px;
    font-size: 12px;
    padding: 0 3px;
    box-sizing: border-box;
    color: #fff;
    background: rgba(0, 0, 0, 1);
    border-radius: 8px;
    opacity: 0.5;
  }
}

.tit {
  display: flex;
  justify-content: space-between;
  padding: 0 14px;
  box-sizing: border-box;
  height: 54px;
  line-height: 54px;
  background: linear-gradient(
    217deg,
    rgba(248, 99, 103, 1) 0%,
    rgba(251, 37, 121, 1) 100%
  );
  color: #fff;
}

.tit .ones {
  display: flex;

  p {
    font-size: 16px;
  }

  .price {
    font-size: 30px;
    margin-right: 10px;
  }

  .num {
    height: 54px;
    line-height: 54px;
  }
}

.tit .ones p:nth-child(1) {
  font-size: 15px;
  height: 54px;
  line-height: 54px;
}

.tit .times {
  float: right;
  font-size: 16px;
}

.title {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;

  .names {
    font-size: 18px;
    color: #323a45;
  }

  p {
    display: flex;
    justify-content: space-between;
    line-height: 3;
    font-size: 12px;
    color: #999da2;
  }
}

.list {
  width: 100%;
  padding: 0 2%;
  box-sizing: border-box;

  .lis {
    display: flex;
    font-size: 13px;
    height: 40px;
    line-height: 40px;

    span {
      color: #676767;
    }

    .rights {
      flex: 1;
      color: #323a45;
      display: flex;
      padding: 0 5px;
      box-sizing: border-box;
      justify-content: space-between;

      img {
        width: 10px;
        height: 10px;
        margin-top: 10px;
      }
    }

    .to2color {
      color: #fc5d7b;
    }
  }
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
  width: 100%;
  height: 50px;
  border-top: 1px solid #ccc;
  text-align: center;
  display: flex;
  background: #fff;

  .lefts {
    width: 30%;

    p {
      font-size: 12px;
    }

    img {
      width: 14px;
      height: 12px;
    }
  }

  button {
    width: 70%;
    background: linear-gradient(
      217deg,
      rgba(248, 99, 103, 1) 0%,
      rgba(251, 37, 121, 1) 100%
    );
    font-size: 18px;
    color: #fff;
  }

  .colos {
    color: #fc5d7b;
  }
}
</style>
