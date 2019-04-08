import { identify, bindPhone } from '@/api'
const state = {
    phoneData: {
        userphone: '',
        phoneCode: ''
    }
}
const mutations = {
    updateState(state, payload) {
        for (let key in payload) {
            state.phoneData[key] = payload[key]
        }
    }
}

const actions = {
    //获取验证码
    async etIdentify({ commit }, payload) {
        return new Promise(async(resolve, reject) => {

            //version,phoneNumber
            let data = await identify(payload.userphone);
            commit('updateState', { userphone: data.phoneNumber });
            resolve(data);
        })
    },

    //绑定手机号
    async bindPhone({ commit }, payload) {
      let result = await bindPhone({
        phoneNumber: payload.userphone,
        verificationCode : payload.phoneCode,
        wxOauthJson: JSON.stringify(payload.wxOauthJson)
      });
      return result;
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
