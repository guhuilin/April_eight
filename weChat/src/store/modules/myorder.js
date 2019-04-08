import {FindOrder} from '@/api/index'
const state = {
    active:0,
    list:[]
}

const mutations = {
    changeMyOrderList(state,payload){
        state.active = payload.active
        state.list = payload.list;
    }
}

const actions = {
    async getFindOrderData({commit},payload){
      let data = await FindOrder(payload)
      commit('changeMyOrderList',{active:payload.orderStatus,list:data.data.result||[]})
      return data;
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions
}
