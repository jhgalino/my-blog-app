<template>
  <main class="container">
    <ClientOnly>
      <login :first-time="firstTime"></login>
    </ClientOnly>
  </main>

</template>

<script setup>
import Login from '~/components/login.vue';

let firstTime = true;

</script>

<style scoped>
</style>
