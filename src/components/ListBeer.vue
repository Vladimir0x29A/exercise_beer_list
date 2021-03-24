<template>
  <div class="wrapper-main">
    <div class="wrapper-main__content beer-list">

      <div class="beer-list__item beer-item" v-for="beerItem in beerList">
        <div class="beer-item__container">
          <div class="beer-item__id beer-item__stream-el">{{ beerItem.id }}</div>

          <img class="beer-item__image beer-item__stream-el"
               :src="beerItem.image_url"
               :alt="`Beer ${beerItem.id}`">

          <div class="beer-item__info beer-item__stream-el">
            <div class="beer-item__name">{{ beerItem.name }}</div>
            <div class="beer-item__description">{{ beerItem.description }}</div>
          </div>

          <div class="beer-item__manage beer-item-manage beer-item__stream-el">
            <button class="beer-item-manage__item button">
              <span class="button__span">Edit</span>
            </button>

            <button class="beer-item-manage__item button button--red">
              <span class="button__span">Delete</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "ListBeer",
  data: () => ({
    apiUri: 'https://api.punkapi.com/v2/beers',
    pageNumber: 0,
    pageLimit: 25,
    beerList: [],
    isPending: false,
  }),
  methods: {
    async fetchBeer() {
      this.isPending = true;

      const {data} = await this.axios.get(this.apiUri, {
        params: {
          page: ++this.pageNumber,
          limit: this.pageLimit,
        },
      });

      this.beerList = data;
      this.isPending = false;
    },
  },
  mounted() {
    this.fetchBeer();
  },
}
</script>