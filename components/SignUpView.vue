<template>
  <main>
    <h1>Sign Up</h1>
    <input v-model="email" type="email" />
    <input v-model="password" type="password" />
    <button @click="sign_up">click!</button>
  </main>
</template>

<script setup lang="ts">
const authentication = useAuthentication();

const email = ref("");
const password = ref("");

async function sign_up() {
  const payload = {
    email: email.value,
    password: password.value,
  };
  await authentication.sign_up(payload);
}
</script>
