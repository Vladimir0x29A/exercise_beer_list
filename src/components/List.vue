<template>
  <transition-group
      class="wrapper-main__content beer-list"
      tag="div"
      name="anim-beer-list"
  >
    <FoodItem
        class="beer-list__item"
        key="add"
        :isAdder="true"
        @save="storeItem"
    />
    <FoodItem
        class="beer-list__item"
        v-for="item in foodItems"
        :key="item.id"
        :item="item"
        @save="update"
        @remove="removeItem"
    />
  </transition-group>
</template>

<script>
import {mapActions, mapState} from "vuex";
import FoodItem from "@/components/FoodItem";

export default {
  name: "List",
  components: {FoodItem},
  data: () => ({
    // pageNumber: 0,
    // pageLimit: 25,
    isPending: false,
  }),
  computed: {
    ...mapState('foodItems', [
      'foodItems',
    ]),
  },
  methods: {
    ...mapActions('foodItems', [
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
