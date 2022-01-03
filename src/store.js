import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import foodItems      from "@/modules/foodItems";
import foodDailyItems from "@/modules/foodDailyItems";
import settings       from "@/modules/settings";

export default new Vuex.Store({
  modules: {
    foodItems,
    foodDailyItems,
    settings,
  },
});
