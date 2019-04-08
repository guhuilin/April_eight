import {getDatail} from "@/api/index"

const state={
    detailData:[],
    createTimes:[],
    payTimes:[],
    allMoney:""

}

const mutations={
    updata(state,payload){
        state.detailData=payload.data
    },
    getLocalTime(state,payload){
        let createTime=payload.data.createTime
        let payTime=payload.data.payTime
        //支付金额
        let sumMoney=payload.data.totalAmount*payload.data.products.length
        +payload.data.totalDeliveryMoney+payload.data.totalTaxationAmount-payload.data.totalDiscountAmount
        state.allMoney=sumMoney

        state.payTimes=getTime(payTime)
        state.createTimes=getTime(createTime)
    }
}

const actions={
    async getDatail({commit},payload){
        let result=await getDatail(payload);
        console.log(result.data.result,"result")
        commit("updata",{data:result.data.result})
        commit("getLocalTime",{data:result.data.result})
        return result
    }
}

function getTime(x){
    var d = new Date(x);
    var Y = d.getFullYear();
    var M = d.getMonth()+1;
    if (M<=9) {
      M = '0'+M;
    }else{
      M = M;
    }
    var day = d.getDate();
    if (day<=9) {
      day = '0'+day
    }else{
      day = day;
    }
    var hour = d.getHours();
    if (hour<10) {
      hour = '0' + hour;
    }else{
      hour = hour ;
    }
    var min = d.getMinutes();
    if (min<10) {
      min = '0' + min;
    } else {
      min = min;
    }
    let timeArr=[Y+'-'+M+'-'+day, hour+':'+min]
    return timeArr
  }
export default {
    namespaced:true,
    state,
    actions,
    mutations
}
