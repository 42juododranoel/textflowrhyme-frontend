<template>
  <main>
    <h1>Sign Out</h1>
    <span v-if="is_unauthenticated">You were signed out.</span>
  </main>
</template>

<script setup lang="ts">
const is_unauthenticated = ref(true);

const authentication = useAuthentication();
authentication.sign_out();
</script>
