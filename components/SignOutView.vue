<template>
  <main>
    <h1>Sign Out</h1>
    <span v-if="is_unauthenticated">You were signed out.</span>
  </main>
</template>

<script setup lang="ts">
const { status } = useAuth();
const is_unauthenticated = ref(status.value == "unauthenticated");

const authentication = useAuthentication();
authentication.sign_out();
</script>
