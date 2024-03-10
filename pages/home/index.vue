<template>
  <HomeView />
</template>

<script setup lang="ts">
const home = useHome();
home.list_authored_books();
</script>
