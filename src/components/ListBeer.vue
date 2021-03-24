<template>
  <div class="wrapper-main">
    <transition-group class="wrapper-main__content beer-list"
                      tag="div"
                      name="anim-beer-list"
                      @after-enter="afterEnter">

      <div class="beer-list__item beer-item"
           v-for="beerItem in beerList"
           :key="beerItem.id">

        <div class="beer-item__container">
          <div class="beer-item__id beer-item__stream-el">{{ beerItem.id }}</div>

          <img class="beer-item__image beer-item__stream-el"
               v-if="beerItem.image_url"
               :src="beerItem.image_url"
               :alt="`Beer ${beerItem.id}`">

          <div class="beer-item__info beer-item__stream-el">
            <div class="beer-item__name">{{ beerItem.name }}</div>
            <div class="beer-item__description">{{ beerItem.description }}</div>
          </div>

          <div class="beer-item__manage beer-item-manage beer-item__stream-el">
            <button class="beer-item-manage__item button"
                    @click="editBeerItem(beerItem)">

              <span class="button__span">Edit</span>
            </button>

            <button class="beer-item-manage__item button button--red"
                    @click="removeBeerItem(beerItem)">

              <span class="button__span">Delete</span>
            </button>
          </div>
        </div>
      </div>

      <div class="beer-list__item beer-list-buttons"
           key="Show next"
           v-if="isLoadMoreButtonShown">

        <button class="button" @click="loadMore">
          <span class="button__span">{{ moreButtonText }}</span>
        </button>
      </div>

    </transition-group>
  </div>
</template>

<script>
import {eventBus} from "@/utils";

export default {
  name: "ListBeer",
  data: () => ({
    apiUri: 'https://api.punkapi.com/v2/beers',
    pageNumber: 0,
    pageLimit: 25,
    beerList: [],
    isPending: false,
    isLoadMoreButtonShown: false,
  }),
  computed: {
    moreButtonText() {
      return this.isPending ? 'Loading' : 'Show next';
    },
  },
  methods: {
    editBeerItem(beerItem) {
      eventBus.$emit('showModal', beerItem);
    },
    removeBeerItem(beerItem) {
      const foundIndex = this.beerList.findIndex(item => item.id === beerItem.id);
      this.beerList.splice(foundIndex, 1);
    },
    loadMore() {
      this.fetchBeer();
    },
    afterEnter() {
      this.isLoadMoreButtonShown = true;
    },
    async fetchBeer() {
      this.isPending = true;

      const {data} = await this.axios.get(this.apiUri, {
        params: {
          page: ++this.pageNumber,
          limit: this.pageLimit,
        },
      });

      if (!data.length) this.isLoadMoreButtonShown = false;
      this.beerList = this.beerList.concat(data);
      this.isPending = false;
    },
  },
  mounted() {
    this.fetchBeer();

    eventBus.$on('saveBeerItem', beerItem => {
      const foundItem = this.beerList.find(item => item.id === beerItem.id);

      foundItem.name = beerItem.name;
      foundItem.description = beerItem.description;
    });
  },
}
</script>
