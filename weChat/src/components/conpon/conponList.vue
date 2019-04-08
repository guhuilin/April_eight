<!-- 优惠券列表 -->
<template>
  <div class="List">
    <ul class="conponList_title" v-for="(item,index) in list" :key="index">
      <li class="title_list">
        <div class="left_info">
          <div class="top">
            <p class="price">￥</p>
            <p class="price1">{{item.reduction}}</p>
          </div>
          <p class="manzu">满 ￥{{item.full}}使用</p>
        </div>
        <div class="right">
          <p class="new">{{item.title}}</p>
          <div class="bottom">
            <p class="time">{{item.endTime}}到期</p>
            <b class="add" @click="goIndex">立即使用</b>
          </div>
        </div>
      </li>

      <div class="info">
        <p class="p">{{item.description}}</p>
      </div>
    </ul>
    {{isShow}}
    <div class="null" v-if="list.length<=0">
      <div class="infos">
        <image class="zanwu" src="/static/images/暂无.png" />
        <p class="kong">暂时没有可用优惠券哦～</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow:true
    }
  },
  props: ["list","isShow"],
  methods: {
    goIndex(){
      wx.switchTab({ url: '/pages/index/main' });
    }
  }
};
</script>

<style scoped>
.List {
  flex: 1;
  background: rgba(243, 247, 247, 1);
  display: block;
  padding-top: 25px;
}
.title_list {
  width: 95%;
  height: 92px;
  display: block;
  background: linear-gradient(
    236deg,
    rgba(253, 158, 163, 1) 0%,
    rgba(254, 122, 173, 1) 100%
  );
  border: 0.5px solid rgba(252, 93, 123, 1);
  display: flex;
  margin: 0 auto;
  border-radius: 5px;
}
.info {
  width: 95%;
  height: 30px;
  background: rgba(255, 255, 255, 1);
  display: block;
  margin: 0 auto;
  border-radius: 8px;
}
.left_info {
  width: 127px;
  height: 92px;
  border-right: 1px dashed #fff;
}
.top {
  width: 127px;
  display: flex;
  padding-left: 25px;
}
.price1 {
  width: 58px;
  height: 50px;
  font-size: 36px;
  font-family: PingFangSC-Semibold;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 50px;
}
.price {
  width: 15px;
  height: 21px;
  font-size: 15px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  padding-top: 22px;
}
.manzu {
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 17px;
  padding-left: 25px;
}
.right {
  flex: 1;
}
.new {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 20px;
  padding-top: 19px;
  padding-left: 12px;
}
.time {
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 17px;
  padding-top: 11px;
  padding-left: 12px;
}
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  padding-right: 8px;
}
.add {
  width: 70px;
  height: 28px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(252, 93, 123, 1);
  display: flex;
  justify-content: center;
  line-height: 28px;
}
.p {
  line-height: 30px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 157, 162, 1);
  padding-left: 15px;
}
.conponList_title {
  margin-bottom: 20px;
}
.null {
  flex: 1;
  display: flex;
  padding-top: 169px;
  justify-content: center;
  background: rgba(243, 247, 247, 1);
}
.kong {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 157, 162, 1);
  margin-top: 37px;
}
.zanwu {
  width: 119px;
  height: 104px;
  display: block;
  margin: 0 auto;
}
</style>
