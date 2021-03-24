<template>
  <div id="app" class="app">
    <ListBeer/>
  </div>
</template>

<script>
import ListBeer from "./components/ListBeer";

export default {
  name: 'App',
  components: {
    ListBeer,
  }
}
</script>

<style lang="scss">
  @import "assets/styles/main";
</style>
