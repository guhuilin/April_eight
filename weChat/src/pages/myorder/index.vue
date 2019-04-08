<template>
  <div class="wrap">
    <div class="head">
      <span :class="active===index?'active':''" @click="changeactive(index)" v-for="(item,index) in navList" :key="index">{{item}}</span>
    </div>

    <!-- 若无网络显示 -->
    <div class="offline" v-if="showOffline">
      <img src="/static/images/offline.png" alt="" />
      <p>网络竟然崩溃了，请刷新重试~</p>
      <button>刷新</button>
    </div>
    <!-- 若没有数据显示 -->
    <div class="elseshow" v-else-if="!storelist.length">
      <div class="dont_imgs">
        <img src='/static/images/wudingdan.png' />
        <div>暂时没有订单噢~</div>
      </div>
    </div>
    <!-- 有订单数据 -->
    <div class="main" v-else>
      <div class="shop" @click="goOrderdetails(item)" v-for="(item, index) in storeList" :key="index">
        <div class="state">
          <span style="font-size:28rpx;color:#323A45">{{item.createTime}}</span>
          <span style="font-size:32rpx;color:#323A45;font-weight:500;">{{item.processStatus}}</span>
        </div>
        <dl class="shop-box" v-for="(value, key) in item.products" :key="key" @click.stop="go2Detail(value.pid)">
          <dd>
            <img :src="value.mainImgUrl" alt="">
          </dd>
          <dt>
            <h3>{{value.productTitle}}</h3>
            <span class="size" style="color:#999DA2;font-size:24rpx;">规格：{{value.skuName}}</span>
            <li class="shop-bot">
              <span class="price" style="color:#323A45;font-size:24rpx;">￥{{value.salesPrice}}</span>
              <span class="num" style="color:#323A45;font-size:24rpx;">×{{value.productNumber}}</span>
            </li>
          </dt>
        </dl>

        <!-- 结算 -->
        <dl class="balance shop-box">
          <p>共{{item.products.length}}件商品 合计：￥
            <em>{{item.totalAmount}}</em>
          </p>
          <div class="box-btn" v-if="item.processStatus==='待付款'">
            <button style="margin-right:15rpx;background:#fff;" @click.stop="cancelOrder(item.orderId)">取消订单</button>
            <button class="go-payment" @click.stop="goPayment(item)">去付款{{item.totalAmount}}</button>
          </div>
          <div class="box-btn" v-if="item.processStatus==='待收货'">
            <button style="margin-right:15rpx;background:#fff;" @click.stop="goLogistics(item)">查看物流</button>
            <button @click.stop="ensure(item)">确认收获</button>
          </div>
          </dl>
      </div>
    </div>

    <!-- 支付弹窗 -->
    <confirm v-if='false' />
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from "vuex";
  import confirm from "@/components/confirm";
  import {formatTime} from '@/utils/index.js';
  import {cancelOrder, ensureOrder} from '@/api/index'

  export default {
    data() {
      return {
        navList: ["全部", "待付款", "待发货", "待收货"],
        showMain: true,
        showOffline: false,
        showNoData: false,
        pageIndex: 1
      };
    },
    computed: {
      ...mapState({
        active: state => state.myorder.active,
        storelist: state => state.myorder.list
      }),
      hasMore(){
        return this.pageIndex*20 === this.storelist.length;
      },
      storeList(){
        this.storelist.forEach(item=>{
          item.createTime = formatTime(item.createTime);
          item.processStatus = item.processStatus==1?item.processStatus==2?item.processStatus==3?item.processStatus==4?'待评价':'待收货':'待发货':'待付款':'全部';
        })
        return this.storelist;
      }
    },
    methods: {
      ...mapActions({
        getFindOrderData: "myorder/getFindOrderData"
      }),
      ...mapMutations({
        changeMyOrder: "myorder/changeMyOrder"
      }),
      // 封装fetchData
      fetchData(orderStatus=this.active){
        this.getFindOrderData({ pageIndex: this.pageIndex, orderStatus })
      },
      //tab切换
      changeactive(index) {
        this.pageIndex = 1;
        this.fetchData(index);
      },
      // 物流查询
      goLogistics(item){
        let {logisticsCode, logisticsCompany, consigneePhone, logisticsCompanyCode} = item;
        wx.navigateTo({ url: `/pages/logistics/main?com=${logisticsCompanyCode}&num=${logisticsCode}&phone=${consigneePhone}&company=${logisticsCompany}` });
      },
      // 跳商品详情
      go2Detail(id){
        wx.navigateTo({ url: '/pages/go2detail/main?id='+id });
      },
      // 跳订单详情
      goOrderdetails(item) {
        let {orderId, orderType} = item;
        wx.navigateTo({
          url: `/pages/orderdetails/main?orderId=${orderId}&orderType=${orderType}`
        });
      },
      // 去付款
      goPayment(item){
        // wx.setStorage({
        //   key: "orderMian",
        //   data: item
        // });
        // wx.navigateTo({
        //   url: "/pages/submission/main"
        // });
         wx.navigateTo({
          url: '/pages/goPay/main?orderId='+item.orderId
        });
      },
      // 确认收货
      ensure(){
        wx.showModal({
          title: '温馨提示',
          content: '是否确认收获',
          success: async (result) => {
            if (result.confirm) {
              let result = await ensureOrder({subOrderId: orderNumber})
              if (result.res_code == 1){
                wx.navigateTo({ url: '/pages/myorder/successfulTrade/main' });
              }
            }
          }
        });
      },
      // 取消订单
      cancelOrder(orderNumber) {
        wx.showModal({
          title: '温馨提示',
          content: '是否取消订单？',
          success: async (result) => {
            if (result.confirm) {
              let result = await cancelOrder({orderNumber})
              if (result.res_code == 1){
                wx.showToast({
                  title: '取消订单成功', //提示的内容,
                  icon: 'none', //图标
                });
                this.fetchData();
              }
            }
          }
        });
      },
      toSettlement() {
        console.log('跳转')
        wx.navigateTo({ url: '/pages/myorder/settlement/main' })
      }
    },
    components: {
      confirm
    },
    onLoad() {
      //判断网路状态
      wx.getNetworkType({
        success: res => {
          // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
          var networkType = res.networkType
          if (networkType == 'none') {
            this.showOffline = true;
            this.showMain = false;
          }
        }
      })
    },
    onShow(){
      this.fetchData();
    },
    onReachBottom(){
      if (this.hasMore){
        this.pageIndex++;
        this.fetchData();
      }
    }
  }
</script>
<style scoped>
  .wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #f3f7f7;
  }

  .dont_imgs {
    width: 100%;
    height: 100%;
    margin-top: 100rpx;
    margin: 0 auto;
    text-align: center;
    font-size: 32rpx;
    color: #999;
  }

  .dont_imgs img {
    width: 276rpx;
    height: 276rpx;
    border-radius: 50%;
    margin-top: 300rpx;
  }

  .elseshow {
    width: 100%;
    height: 100%;
    background: #f3f7f7;
  }

  .head {
    width: 100%;
    height: 80rpx;
    background: #fff;
    line-height: 80rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40rpx;
    box-sizing: border-box;
    font-size: 30rpx;
    position: fixed;
    top: 0;
    left: 0;
  }

  .head span {
    width: 16%;
    height: 90%;
    color: #484848;
    text-align: center;
    border-bottom: 6rpx solid #fff;
  }

  .active {
    border-bottom: 6rpx solid #33D6C5 !important;
  }

  .main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 18rpx;
    box-sizing: border-box;
    margin-top: 80rpx;
  }

  .shop {
    width: 100%;
    background: #fff;
    margin-top: 24rpx;
    border-radius: 12rpx;
  }

  .state {
    width: 100%;
    height: 74rpx;
    line-height: 74rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 24rpx;
  }

  .shop-box {
    width: 100%;
    height: 208rpx;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 12rpx 24rpx;
    border-bottom: 1px solid #eee;
  }

  .shop-box dd {
    width: 25%;
    height: 100%;
    background: #eee;
  }

  .shop-box dd img {
    width: 100%;
    height: 100%;
  }

  .shop-box dt {
    width: 70%;
    height: 100%;
    font-size: 28rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .shop-bot {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .balance {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
  }

  .balance p {
    display: flex;
    font-size: 26rpx;
    color: #484848;
  }

  .box-btn {
    height: 60rpx;
    display: flex;
  }

  .box-btn button {
    font-size: 28rpx;
    line-height: 60rpx;
    padding: 0 5px;
  }

  .go-payment {
    background: #FC5D7B;
    color: #fff;
  }

  .offline {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 80rpx;
  }

  .offline img {
    width: 276rpx;
    height: 218rpx;
    margin-top: 344rpx;
  }

  .offline p {
    margin-top: 76rpx;
    font-size: 32rpx;
    color: #999DA2;
  }

  .offline button {
    width: 220rpx;
    height: 64rpx;
    margin-top: 52rpx;
    color: #33D6C5;
    border: 2rpx solid #33D6C5;
    line-height: 64rpx;
    font-size: 32rpx;
  }
</style>
