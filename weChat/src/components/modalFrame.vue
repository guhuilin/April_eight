<template>
  <div class="mwrap">
    <div class="cen">
      <p class="colSize">
        <span>
          <span style="margin-left:5px;" v-for="item in skuData">{{item.aname}}</span>
        </span>
        <span @click="toShow">X</span>
      </p>
      <dl>
        <dt style="margin-right:5px;">
          <img :src="goodInfo.mainImgUrl" alt>
        </dt>
        <dd>
          <template v-if="onSku">
            <p v-if="isMiaoSha">￥{{onSku.seckillPrice}}</p>
            <p v-else>￥{{onSku.salesPrice}}</p>
            <p>库存：{{onSku.store}}</p>
          </template>
          <template v-else>
            <p>￥{{goodInfo.salesPrice}}</p>
            <p>库存：{{goodInfo.store}}</p>
          </template>
        </dd>
      </dl>
      <div class="colors" v-for="(item,index) in skuData" :key="index">
        <p class="aname">{{item.aname}}</p>
        <ul>
          <li
            v-for="(itm,idx) in item.attributeValueRelationVoList"
            :key="idx"
            @click="btn(idx,item,index)"
            :class="{bg:idx==indexArr[index]?true:false}"
          >{{itm.vname}}</li>
        </ul>
      </div>
      <div class="numbox">
        <span class="sl">数量</span>
        <div class="num">
          <span @click="changeNum1">-</span>
          <span>{{onSku.onNum}}</span>
          <span @click="changeNum2">+</span>
        </div>
      </div>
      <button class="btn" @click="toShow">确定</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pid: "",
      arr: {},
      boo: false,
      show: false,
      indexArr: [],
      onSku:'',//选中的sku信息
      isMiaoSha:false
    };
  },
  props: {
    goodInfo:'',
    skuData: "", //sku
    arr: "", //商品详情
  },
  onLoad() {
    var that = this;
    console.log("goodInfo", that.goodInfo);
    console.log(that.skuData)
    that.skuData.map((item, index) => {
      that.indexArr.push(0);
    });
    that.getOnSkuInfo()
  },
  methods: {
    btn(val, item, index) {
      let that = this
      // console.log("val/////.item.//////index", val, item, index);
      // item.attributeValueRelationVoList.map((v, i) => {
      // });
      this.indexArr.splice(index, 1, val);
      that.getOnSkuInfo()
    },
    // 获取选中的sku信息
    getOnSkuInfo(){
      let that = this
      let vids = []
      // let newSkuArr = that.skuData.reverse()
      this.indexArr.map((item,index)=>{
        vids.push(that.skuData[index].attributeValueRelationVoList[item].vid)
      })
      console.log('this.vids',vids)
      console.log('this.indexArr',this.indexArr)
      console.log('that.skuData',that.skuData)
      wx.request({
        method: "POST",
        url: "http://test.api.jinaup.com/api/open/product/sku/query/1", // 仅为示例，并非真实的接口地址
        data: {
          pid: this.goodInfo.pid,
          vids: JSON.stringify(vids)
        },
        header: {
          "content-type": "application/x-www-form-urlencoded", // 默认值
          // 'content-type': 'application/json', // 默认值
        },
        success(res) {
          console.log("成", res.data);
          if (res.data.res_code == 1) {
            res.data.result.onNum = 1
            that.onSku = res.data.result
            if(res.data.result.endTime){
              let nowtime = new Date().getTime()
              if(nowtime<res.data.result.endTime){
                console.log('秒杀中')
                that.isMiaoSha = true
              }else{
                that.isMiaoSha = false

              }
            }
            console.log('that.onSku',that.onSku)
            that.$emit('getsku',res.data.result,that.indexArr)
          }
        },
        error(res) {
          console.log("失败", res);
        }
      });
    },
    // 商品数量---
    changeNum1() {
      console.log(1111)
      if (this.onSku.onNum <= 0) {
        return;
      }
      this.onSku.onNum--;
      // wx.setStorageSync('numb', this.numb)

    },
    // 商品数量+++
    changeNum2() {
      console.log(222)
      if (this.onSku.onNum >= this.onSku.store) {
        return;
      }
      this.onSku.onNum++;
      // wx.setStorageSync('numb', this.numb)
    },
    toShow: function() {
      this.$emit("toParent", false, this.numb);
    }
  }
};
</script>
<style lang='scss' scoped>
.mwrap {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  .cen {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;

    .colSize {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      padding: 0 2%;
      box-sizing: border-box;
      span:nth-child(1) {
        font-size: 15px;
      }
    }
    dl {
      display: flex;
      padding: 0 2%;
      box-sizing: border-box;
      dt img {
        width: 80px;
        height: 80px;
      }
      dd {
        p:nth-child(1) {
          font-size: 15px;
          color: #323a45;
          line-height: 2;
        }
        p:nth-child(2) {
          font-size: 15px;
          color: #999da2;
          line-height: 2;
        }
      }
    }
    .colors {
      padding: 0 2%;
      box-sizing: border-box;
      margin-top: 15px;
      .aname {
        color: #999da2;
        font-size: 15px;
        line-height: 2;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          border: 1px solid #ccc;
          padding: 3px 8px;
          box-sizing: border-box;
          margin: 5px 10px;
          font-size: 12px;
          border-radius: 5px;
        }
        .bg {
          background: #33d6c5;
          color: #fff;
          border: 1px solid #33d6c5;
        }
      }
    }
    .numbox {
      padding: 0 2%;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      .sl {
        font-size: 15px;
        color: #999da2;
        line-height: 2;
      }
      .num {
        display: flex;
        span {
          display: block;
          line-height: 2;
          font-size: 14px;
          text-align: center;
          padding: 0px 10px;
          box-sizing: border-box;
          border: 1px solid #ccc;
        }
      }
    }
    .btn {
      width: 100%;
      height: 55px;
      line-height: 55px;
      text-align: center;
      color: #fff;
      background: linear-gradient(
        217deg,
        rgba(248, 99, 103, 1) 0%,
        rgba(251, 37, 121, 1) 100%
      );
    }
  }
}
</style>
