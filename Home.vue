<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/healthbuddy_logo.jpg" style="width:350px">
    <HelloWorld/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
};
</script>
