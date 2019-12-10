<template>
  <div class="home">
    <home-component/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeComponent from "@/components/HomeComponent.vue";

export default {
  name: "home",
  components: {
    HomeComponent
  }
};
</script>
