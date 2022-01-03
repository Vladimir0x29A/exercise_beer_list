<template>
  <div id="app" class="app">
    <!--<ListBeer/>-->

    <div class="wrapper-main">
      <div class="main-columns">
        <div class="main-columns__column">
          <ListDaily/>
        </div>

        <div class="main-columns__column">
          <List/>
        </div>
      </div>
    </div>

    <Modal/>
  </div>
</template>

<script>
// import ListBeer from "@/components/ListBeer";
import List from "@/components/List";
import Modal from "@/components/Modal";
import ListDaily from "@/components/ListDaily";

export default {
  name: 'App',
  components: {
    ListDaily,
    Modal,
    // ListBeer,
    List,
  }
}
</script>

<style lang="scss">
  @import "assets/styles/main";
</style>
