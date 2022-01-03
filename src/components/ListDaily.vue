<template>
  <transition-group
      class="wrapper-main__content beer-list"
      tag="div"
      name="anim-beer-list"
  >
    <FoodDailyItem
        class="beer-list__item"
        key="add"
        :isAdder="true"
    />
    <!--<FoodItem
        class="beer-list__item"
        v-for="item in list"
        :key="item.id"
        :item="item"
        @save="updateItem"
        @remove="removeItem"
    />-->
  </transition-group>
</template>

<script>
import {mapActions, mapState} from "vuex";
import FoodDailyItem from "@/components/FoodDailyItem";

export default {
  name: "ListDaily",
  components: {FoodDailyItem},
  data: () => ({
    isPending: false,
  }),
  computed: {
    ...mapState('foodDailyItems', [
      'foodDailyItems',
    ]),
  },
  methods: {
    ...mapActions('foodDailyItems', [
      'fetchItems',
      'storeItem',
      'updateItem',
      'removeItem',
    ]),
    loadMore() {
      this.fetchData();
    },
    update(item) {
      const id = item.id;
      delete item.id;
      this.updateItem({id, payload: item});
    },
    async fetchData() {
      this.isPending = true;
      await this.fetchItems();
      this.isPending = false;
    },
  },
  mounted() {
    this.fetchData();
  },
}
</script>
