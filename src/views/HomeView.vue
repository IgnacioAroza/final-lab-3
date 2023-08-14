<template>
  <div class="home">
    <NavBar/>
    <Coins/>
    <h1 class="title">Precios en diferentes Exchanges</h1>
    <ExchangesTables/>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
import ExchangesTables from "@/components/ExchangesTables.vue";
import Coins from "@/components/Coins.vue";

export default {
  name: "HomeView",
  components: {
    NavBar,
    ExchangesTables,
    Coins,
  },
};
</script>

<style scoped>
.title{
  margin: 2% 0 2% 0;
}
</style>
