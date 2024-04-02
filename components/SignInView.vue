<template>
  <main>
    <h1>Sign In</h1>
    <input v-model="email" type="email" />
    <input v-model="password" type="password" />
    <button>click!</button>
  </main>
</template>

<script setup lang="ts">
const email = ref("");
const password = ref("");
</script>
