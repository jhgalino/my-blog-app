<template>
  <main class="container">
    <ClientOnly>
      <Login :first-time="firstTime"></Login>
    </ClientOnly>
  </main>

</template>

<script setup>
import Login from '~/components/login.vue';

let firstTime = false;

</script>

<style scoped>
</style>
