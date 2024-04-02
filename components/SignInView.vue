<template>
  <main>
    <h1>Sign In</h1>
    <input v-model="email" type="email" />
    <input v-model="password" type="password" />
    <button @click="sign_in">click!</button>
  </main>
</template>

<script setup lang="ts">
const authentication = useAuthentication();

const email = ref("");
const password = ref("");

async function sign_in() {
  const payload = {
    username: email.value,
    password: password.value,
  };
  await authentication.sign_in(payload);
}
</script>
