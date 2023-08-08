<template>
  <div class="home">
    <NavBar/>
    <HelloWorld/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import NavBar from "@/components/NavBar.vue";
import Login from "@/components/Login.vue";
import Trade from "@/components/Trade.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    NavBar,
  },
};
</script>
