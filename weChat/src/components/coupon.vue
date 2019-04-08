<template>
  <div class="cwrap">
    <div class="bot">
      <h3 class="tit">优惠券</h3>
      <p class="littile">可领优惠券</p>
      <ul class="list">
        <li>
          <div class="left">
            <p class="money">
              ￥
              <span>180</span>
            </p>
            <p class="tj">满￥1000使用</p>
          </div>
          <dl class="right">
            <dd>
              <p class="newPeo">新人礼包1000减180</p>
              <p class="dqTime">2018.12.31到期</p>
            </dd>
            <dt>
              <button>领取</button>
            </dt>
          </dl>
        </li>
        <li>
          <div class="left">
            <p class="money">
              ￥
              <span>180</span>
            </p>
            <p class="tj">满￥1000使用</p>
          </div>
          <dl class="right">
            <dd>
              <p class="newPeo">新人礼包1000减180</p>
              <p class="dqTime">2018.12.31到期</p>
            </dd>
            <dt>
              <button class="alread">已领取</button>
            </dt>
          </dl>
        </li>
      </ul>
      <div class="sx">
        <div class="overdue">
          <div class="left">
            <p class="money">
              ￥
              <span>180</span>
            </p>
            <p class="tj">满￥1000使用</p>
          </div>
          <dl class="right">
            <dd>
              <p class="newPeo">新人礼包1000减180</p>
              <p class="dqTime">2018.12.31到期</p>
            </dd>
            <dt>
              <span></span>
            </dt>
          </dl>
        </div>
        <p class="fail">购买的商品不符合优惠券的使用条件</p>
      </div>
      <button class="btn">完成</button>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style lang='scss' scoped>
.cwrap {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}

.bot {
  width: 100%;
  background: #fff;
  position: fixed;
  bottom: 0;

  .tit {
    font-size: 16px;
    text-align: center;
    line-height: 2;
    padding: 0 10px;
    box-sizing: border-box;
  }

  .littile {
    font-size: 14px;
    padding: 0 10px;
    box-sizing: border-box;
  }

  .list {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    color: rgba(252, 93, 123, 1);

    li {
      display: flex;
      width: 100%;
      font-size: 12px;
      background: rgba(255, 246, 248, 1);
      margin: 10px 0;
      border: 1px solid rgba(252, 93, 123, 1);
      border-radius: 10px;

      .left {
        font-size: 12px;
        width: 30%;
        text-align: center;
        border-right: 1px dashed rgba(252, 93, 123, 1);

        .money {
          font-size: 15px;

          span {
            font-size: 30px;
          }
        }

        .tj {
          line-height: 2;
        }
      }

      .right {
        width: 70%;
        display: flex;
        justify-content: space-around;
        font-size: 12px;
        padding-top: 14px;
        box-sizing: border-box;

        .newPeo {
          font-size: 14px;
        }

        .dqTime {
          line-height: 2;
        }

        button {
          margin-top: 7px;
          width: 62px;
          height: 28px;
          line-height: 26px;
          background: #fc5d7b;
          font-size: 12px;
          color: #fff;
          text-align: center;
        }

        .alread {
          background: rgba(255, 168, 184, 1);
        }
      }
    }
  }
}
.sx {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  .overdue {
    color: #999999;
    display: flex;
    width: 100%;
    font-size: 12px;
    background: #fafafa;
    border: 1px solid #ccc;
    // border-radius: 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .left {
      font-size: 12px;
      width: 30%;
      text-align: center;
      border-right: 1px dashed #ccc;

      .money {
        font-size: 15px;

        span {
          font-size: 30px;
        }
      }

      .tj {
        line-height: 2;
      }
    }

    .right {
      width: 70%;
      font-size: 12px;
      padding-top: 14px;
      box-sizing: border-box;
      padding-left: 15px;
      box-sizing: border-box;

      .newPeo {
        font-size: 14px;
      }

      .dqTime {
        line-height: 2;
      }

      button {
        margin-top: 7px;
        width: 62px;
        height: 28px;
        line-height: 26px;
        background: #fc5d7b;
        font-size: 12px;
        color: #fff;
        text-align: center;
      }

      .alread {
        background: rgba(255, 168, 184, 1);
      }
    }
  }
  .fail {
    width: 100%;
    font-size: 12px;
    line-height: 2;
    padding-left: 15px;
    color: #BBBEC1;
    box-sizing: border-box;
    background: #F1F1F1;
    border: 1px solid #ccc;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}
.btn {
  width: 100%;
  height: 55px;
  line-height: 55px;
  margin-top: 30px;
  background: linear-gradient(
    217deg,
    rgba(248, 99, 103, 1) 0%,
    rgba(251, 37, 121, 1) 100%
  );
  text-align: center;
  font-size: 18px;
  color: #fff;
}
</style>
