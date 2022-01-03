import axios from "@/axiosSetup";

export default {
  namespaced: true,
  state: {
    settings: {},
  },
  getters: {},
  mutations: {
    updateSettings(state, payload) {
      state.settings = payload;
    },
  },
  actions: {
    fetchSettings({commit}) {
      return new Promise(async resolve => {
        const {data} = await axios.get('settings');
        commit('updateSettings', data);
        resolve(data);
      });
    },
  },
};
