<template>
  <div id="app" class="app">
    <ListBeer/>
    <Modal/>
  </div>
</template>

<script>
import ListBeer from "./components/ListBeer";
import Modal from "@/components/Modal";

export default {
  name: 'App',
  components: {
    Modal,
    ListBeer,
  }
}
</script>

<style lang="scss">
  @import "assets/styles/main";
</style>
