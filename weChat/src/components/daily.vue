<template>
  <div class="swrap">
    <!-- 首页数据 -->
    <template v-for="item in list">
      <!-- 轮播图 1 -->
      <template v-if="item.type=='carouselImg'">
        <div class="swiper">
          <swiper class="swiperItem" indicator-dots="true" autoplay="true" interval="2000" duration="1000" circular="true">
            <block v-for="(item1,index1) in item.items" v-bind:key="index1">
              <swiper-item>
                <img :src="item1.imgUrl" class="slide-image" @click="gopage(item1)" alt>
              </swiper-item>
            </block>
          </swiper>
        </div>
      </template>
      <!-- 五个小icon 2 -->
      <template v-if="item.type=='specialColumn'">
        <div class="chart">
          <dl v-for="(item2,index2) in item.items" @click="gopage(item2)" v-bind:key="index2">
            <dt>
              <img :src="item2.imgUrl" alt>
            </dt>
            <dd>
              <span>{{item2.title}}</span>
            </dd>
          </dl>
        </div>
      </template>
      <!-- 轮播产品 3 -->
      <template v-if="item.type=='carouselProduct'">
        <div>
          <div class="good-thing">
            <img class="cimg" :src="item.pictUrl" @click="gopage(item)" alt>
            <swiper display-multiple-items="3">
              <block v-for="(item3,index3) in item.items" :key="index3">
                <swiper-item @click="gopage(item3)">
                  <img :src="item3.imgUrl" alt>
                  <p class="texts">{{item3.title}}</p>
                  <span class="price">￥{{item3.salesPrice}}</span>
                </swiper-item>
              </block>
            </swiper>
          </div>
        </div>
      </template>
      <!-- 单图 4 -->
      <template v-if="item.type=='adOne'">
        <div class="swipers">
          <img @click="gopage(item)" :src="item.pictUrl" alt>
        </div>
      </template>
      <!-- 3图 5 -->
      <template v-if="item.type=='adThree'">
        <div class="milk">
          <div class="bot">
            <div class="bot-left">
              <img :src="item.items[0].imgUrl" alt @click="gopage(item.items[0])">
            </div>
            <div class="bot-right">
              <img :src="item.items[1].imgUrl" @click="gopage(item.items[1])">
              <img :src="item.items[2].imgUrl" @click="gopage(item.items[2])">
            </div>
          </div>
        </div>
      </template>
      <!-- 4图 6 -->
      <template v-if="item.type=='adFour'">
        <div class="fourBox">
          <img class="" v-for="(item6,index6) in item.items" @click="gopage(item6)" :key="index6" :src="item6.imgUrl" alt="">
        </div>
      </template>
      <!-- 精品好物 7 -->
      <template v-if="item.type=='sixProduct'">
        <div class="today">
          <p>
            <span class="today1">精选好物</span>
            <span class="today2">等你来抢</span>
          </p>
          <img src="/static/images/Group 2@2x.png" class="more" alt>
        </div>
        <div class="box6">
          <div v-for="(item7,index7) in item.items" @click="gopage(item7)" class="box6item">
            <div class="imgbox"><img :src="item7.imgUrl"></div>
            <div class="titlebox">{{item7.title}}</div>
            <div class="moneybox">￥{{item7.salesPrice}}</div>
          </div>
        </div>
      </template>
      <!-- 秒杀 8 -->
      <template v-if="item.type=='spikeProduct'">
        <div class="today-list">
          <div class="today" @click.stop="goTospike">
            <p>
              <span class="today1">今日秒杀</span>
              <span class="today2">等你来抢</span>
            </p>
            <img src="/static/images/Group 2@2x.png" class="more" alt>
          </div>
          <div class="kh-list">
            <dl v-for="(item8,index8) in item.spike" v-bind:key="index8" @click="gopage(item8)">
              <dt>
                <img :src="item8.mainImgUrl" alt>
              </dt>
              <dd>
                <p class="over-h">{{item8.title}}</p>
                <div class="present">
                  <progress activeColor="#FC5D7B"  font-size="12px" color="#f3f7f7" :percent="item8.salesStore/item8.totalStore*100" show-info/>
                  <span v-if="item8.salesStore>=item8.totalStore">已售完</span>
                </div>
                <div class="price">
                  <p class="nprice">￥{{item8.seckillPrice}}</p>
                  <s class="oprice">￥{{item8.salesPrice}}</s>
                  <img src="/static/images/马上抢@2x.png" class="btn" alt>
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </template>
    </template>
    <!-- 为你精选 -->
    <div class="choose">
      <div class="today">
        <p>
          <span class="today1">为你精选</span>
          <span class="today2">等你来抢</span>
        </p>
      </div>
      <div class="milks">
        <div>
          <dl
            v-for="(item,index) in carouselProductData"
            v-bind:key="index"
            @click="gopage(item)"
          >
            <dt>
              <img :src="item.mainImgUrl" alt>
            </dt>
            <dd>
              <p>{{item.title}}</p>
              <div class="discount">
                <span v-if="item.isFreeShipping==1">包邮</span>
                <span v-if="item.isFreeTax==1">包税</span>
                <span v-if="item.isPresell==1">直邮</span>
              </div>
              <div class="milkProce">
                <span class="ft14">￥</span>
                <span class="ft22">{{item.salesPrice}}</span>
                <span class="fcg">￥{{item.vipPrice}}</span>
                <img src="/static/images/黑卡@2x.png" alt>
                <span style="padding:0px 3px;" class="ft10">赚￥{{item.earnMoney}}</span>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    indexInfo:'',
    carouselProductData: "" //最下面的优选数据
  },
  data(){
    return {
      list:[]
    }
  },
  onShow(){
    console.log('onShow')
  },
  created(){
    console.log('组件 created',this.indexInfo)
    if(this.indexInfo){
      this.list = []
      this.indexInfo.map((val,index)=>{
        if(val.jumpUrl&&val.jumpUrl.indexOf('topic')>0&&val.jumpUrl.indexOf('uiType=2')>0){
          // val.isShow = false
        } else {
          this.list.push(val)
        }
      })
    }
    console.log(this.list)
  },
  watch:{
    indexInfo(data){
      console.log('this.indexInfo改变',data)
      if(data){
        this.list = []
        this.indexInfo.map((val,index)=>{
          if(val.jumpUrl&&val.jumpUrl.indexOf('topic')>0&&val.jumpUrl.indexOf('uiType=2')>0){
            // val.isShow = false
          } else {
            this.list.push(val)
          }
        })
      }
    }
  },
  methods: {
    gopage(item){
      console.log('gopage跳页',item)
      let str1 = item.jumpUrl.substring(item.jumpUrl.indexOf('contentValue')+13)
      let contentValue = str1.substring(0,str1.indexOf('&'))
      let str2 = item.jumpUrl.substring(item.jumpUrl.indexOf('businessId')+11)
      let businessId = str2.substring(0,str2.indexOf('&'))
      let str3 = item.jumpUrl.substring(item.jumpUrl.indexOf('uiType')+7)
      let uiType = str3
      console.log(123,contentValue,businessId,uiType,456)
      switch(contentValue){
        case "product":
          console.log('商品')
          wx.navigateTo({
            url:"/pages/go2detail/main?id=" + businessId
          })
          break;
        case "spike":
          console.log('秒杀')
          wx.navigateTo({
            url:"/pages/spikeDetail/main?id=" + businessId
          })
          break;
        case "category":
          console.log('分类')
          wx.navigateTo({
            url:"/pages/classify/main?cid=" + businessId
          })
          break;
        case "topic":
          console.log('专题')
          wx.navigateTo({
            url:"/pages/special/main?sild=" + businessId + "&uiType=" + uiType
          })
          break;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.swrap {
  width: 100%;
  height: 100%;
}

.swiper {
  width: 100vw;
  padding: 0px 5px;
  height:100vw*0.395;
  margin-bottom: 10px;
  margin-top: 5px;
  box-sizing: border-box;
  /*img {
    width: 96%;
    height: 100%;
    margin: 0 2%;
    border-radius: 15px;
  }*/
}
.swiperItem{
  width: 100%;
  height:100vw*0.395;
  box-sizing: border-box;
}
.chart {
  display: flex;
  dl {
    width: 20%;
    box-sizing: border-box;
    text-align: center;
    margin: 0 0 10px 0;
    dt {
      width: 100%;
      img {
        width: 57px;
        height: 57px;
      }
    }
    dd {
      width: 100%;
      font-size: 12px;
      line-height: 2;
    }
  }
}

.swipers {
  width: 100%;
  height: 104px;
  img {
    width: 96%;
    height: 100%;
    margin: 0 2%;
    border-radius: 15px;
  }
}
.spike {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 10px;
  dl {
    width: 46%;
    height: 80px;
    display: flex;
    justify-content: space-around;
    background: #fff3f4;
    margin: 5px 2%;
    dd {
      img {
        width: 65px;
        height: 70px;
        margin-top: 5px;
      }
    }
    dt {
      h3 {
        font-size: 18px;
        color: #323a45;
        padding-top: 4px;
      }
      p {
        font-weight: 300;
        font-size: 13px;
        line-height: 2;
        color: #757575;
      }
      span {
        display: block;
        font-size: 12px;
        width: 40px;
        margin: 0 auto;
        border-radius: 5px;
        color: #fff;
        text-align: center;
        background: linear-gradient(
          180deg,
          rgba(255, 135, 140, 1) 0%,
          rgba(255, 99, 107, 1) 100%
        );
      }
    }
  }
}
.spike dl:nth-child(2) {
  background: #fffcf2;
}
.spike dl:nth-child(3) {
  background: #f8f3ff;
}
.spike dl:nth-child(4) {
  background: #f1f9fd;
}

.spike dl:nth-child(2) dt span {
  background: linear-gradient(
    180deg,
    rgba(255, 220, 122, 1) 0%,
    rgba(255, 198, 71, 1) 100%
  );
}
.spike dl:nth-child(3) dt span {
  background: linear-gradient(
    180deg,
    rgba(130, 200, 255, 1) 0%,
    rgba(75, 177, 255, 1) 100%
  );
}
.spike dl:nth-child(4) dt span {
  background: linear-gradient(
    180deg,
    rgba(255, 161, 204, 1) 0%,
    rgba(255, 107, 174, 1) 100%
  );
}
.today {
  display: flex;
  font-size: 13px;
  justify-content: space-between;
  padding: 0 10px;
  margin: 3px 0;
  line-height: 3;
  .today1 {
    font-size: 20px;
    padding-right: 10px;
  }
  .today2 {
    border-left: 2px solid #ccc;
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 16px;
  }
  .more {
    width: 36px;
    height: 16px;
    margin-top: 22px;
  }
}

.kh-list dl {
  display: flex;
  width: 100%;
  dt {
    width: 30%;
    img {
      width: 100%;
      height: 131px;
      padding: 20px 10px;
      box-sizing: border-box;
    }
  }
  dd {
    width: 70%;
    .over-h {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 300;
      font-size: 16px;
      line-height: 2;
      margin-top: 10px;
    }
    .present {
      display: flex;
      justify-content: space-between;
      font-weight: 300;
      font-size: 16px;
      line-height: 2;
      color: #999da2;
      progress {
        margin-top: 15px;
        width: 100px;
        height: 4px;
      }
      span {
        padding-right: 15px;
      }
    }
    .price {
      display: flex;
      font-size: 16px;
      justify-content: space-between;
      float: bottom;
      margin-top: 10px;
      .nprice {
        font-size: 22px;
        color: #fc5d7b;
      }
      .oprice {
        text-decoration: line-through;
        line-height: 2;
        margin-top: 7px;
        color: #aaa;
        font-size: 12px;
      }
      .btn {
        width: 80px;
        height: 33px;
        margin-top: 4px;
        margin-right: 10px;
      }
    }
  }
}

.good-thing {
  position: relative;
  .cimg {
    width: 100%;
    height: 300px;
    display: block;
    padding: 6px 10px;
    box-sizing: border-box;
    border-radius: 4px;
  }
  swiper {
    width: 90%;
    margin: -175px 5% 30px 5%;
    text-align: center;
    img {
      width: 100%;
      height: 105px;
      padding: 2px;
      box-sizing: border-box;
    }
    .texts {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      font-size: 13px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .price {
      font-size: 13px;
      color: #fc5d7b;
    }
  }
  // .six {
  //   width: 90%;
  //   margin: 0 5%;
  //   position: absolute;
  //   background: red;
  //   top: 140px;
  //   clear: both;
  //   display: flex;
  //   flex-wrap: wrap;
  //   dl {
  //     width: 30%;
  //     margin: 1.5%;
  //     dt img {
  //       width: 123px;
  //       height: 123px;
  //     }
  //     dd {
  //       .texts {
  //         display: -webkit-box;
  //         -webkit-box-orient: vertical;
  //         -webkit-line-clamp: 1;
  //         font-size: 13px;
  //         text-overflow: ellipsis;
  //         overflow: hidden;
  //       }
  //       .price {
  //         color: #ff527f;
  //         font-size: 14px;
  //       }
  //     }
  //   }
  // }
}

/* 奶粉 */
.milk {
  width: 100%;
  .bigImg {
    width: 96%;
    height: 154px;
    margin: 0 2%;
    border-radius: 15px;
  }
  .bot {
    display: flex;
    margin-top: 20px;
    padding: 0 2%;
    height: 188px;
    box-sizing: border-box;
    .bot-left {
      width: 40%;
      img {
        width: 100%;
        height: 100%;
        padding-right: 2px;
        box-sizing: border-box;
      }
    }
    .bot-right {
      width: 60%;
      img {
        width: 100%;
        height: 50%;
        display: block;
      }
    }
  }
}

.milk .bot .bot-right img:nth-child(1) {
  padding-bottom: 2px;
  box-sizing: border-box;
}
.milk .bot .bot-right img:nth-child(2) {
  padding-top: 2px;
  box-sizing: border-box;
}
/* 为你精选 */
.choose {
  width: 100%;
  .milks {
    width: 100%;
    dl {
      display: flex;
      padding-right: 10px;
      box-sizing: border-box;
      margin: 10px 0;
      dt img {
        width: 100px;
        height: 108px;
        margin: 0 10px 0 10px;
      }
      dd {
        p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          font-size: 14px;
          text-overflow: ellipsis;
          overflow: hidden;
          margin-bottom: 10px;
          line-height: 2;
        }
        .discount {
          margin-bottom: 5px;
          span {
            border: 1px solid #fc5d7b;
            color: #fc5d7b;
            font-size: 10px;
            padding: 1px 3px;
            box-sizing: border-box;
            margin: 0 5px;
          }
        }
        .milkProce {
          color: #fc5d7b;
          line-height: 2;
          img {
            width: 21px;
            height: 10px;
            margin: 0 3px;
          }
          .ft14 {
            font-size: 14px;
          }
          .ft22 {
            font-size: 22px;
          }
          .ft16 {
            font-size: 16px;
          }
          .fcg {
            margin-left: 5px;
            color: #a87831;
            font-size: 10px;
          }
          .ft10 {
            font-size: 10px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(252, 93, 123, 1);
            line-height: 12px;
            background: #ffe8ed;
            margin-left: 5px;
            padding: 2px 0;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}

.footer {
  width: 100%;
  img {
    width: 100%;
    height: 154px;
    padding: 6px 10px;
    box-sizing: border-box;
    border-radius: 4px;
  }
}
.box6item{
  display:inline-block;
  width: 30vw;
  margin-left:2.5vw;
}
.box6item .imgbox{
  width: 30vw;
  height: 30vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box6item .imgbox img{
  max-height: 100%;
  max-width: 100%;
}
.box6item .titlebox{
  font-size: 14px;
  color: #323A45;
  line-height: 20px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.box6item .moneybox{
  font-size: 14px;
  color: #FC5D7B;
}
.box6item:nth-child(3n){
  margin-right: 2.5vw;
}
.fourBox{
  display: flex;
  flex-wrap:wrap;
  margin-top: 10px;
}
.fourBox img{
  width: 50vw;
  height: 27.75vw;
  box-sizing: border-box;
  padding-left: 10px;
  margin-bottom: 10px;
}
.fourBox img:nth-child(2n){
  padding-right: 10px;
}
.slide-image{
  height: 100%;
  width: 100%;
  border-radius: 5px;
}
/* #A87831 */
</style>
