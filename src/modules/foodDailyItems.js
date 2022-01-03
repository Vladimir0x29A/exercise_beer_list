import axios from "@/axiosSetup";

const prefix = 'daily/';

export default {
  namespaced: true,
  state: {
    foodDailyItems: [],
  },
  getters: {},
  mutations: {
    updateItems(state, payload) {
      state.foodItems = payload;
      // state.foodItems = state.foodItems.concat(payload);
    },
    addItem(state, payload) {
      state.foodItems.unshift(payload);
    },
    updateItem(state, payload) {
      const index = state.foodItems.findIndex(item => item.id === payload.id);
      Object.assign(state.foodItems[index], payload);
    },
    removeItem(state, id) {
      const index = state.foodItems.findIndex(item => item.id === id);
      state.foodItems.splice(index, 1);
    },
  },
  actions: {
    fetchItems({commit}) {
      return new Promise(async resolve => {
        const {data} = await axios.get(`${prefix}index`);
        commit('updateItems', data);
        resolve(data);
      });
    },
    storeItem({commit}, payload) {
      return new Promise(async resolve => {
        const {data} = await axios.post(`${prefix}store`, payload);
        commit('addItem', data);
        resolve(data);
      });
    },
    updateItem({commit}, {id, payload}) {
      return new Promise(async resolve => {
        const {data} = await axios.put(`${prefix}update/${id}`, payload);
        commit('updateItem', data);
        resolve(data);
      });
    },
    removeItem({commit}, id) {
      return new Promise(async resolve => {
        await axios.delete(`${prefix}delete/${id}`);
        commit('removeItem', id);
        resolve();
      });
    },
  },
};