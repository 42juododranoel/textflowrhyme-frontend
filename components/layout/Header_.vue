<template>
  <header>
    <nav>
      <LayoutLogo />
      <ul>
        <li v-if="is_authenticated">{{ email }}</li>
        <li v-if="is_unauthenticated">
          <Ahref target="/sign-in">Sign In</Ahref>
        </li>
        <li v-if="is_unauthenticated">
          <Ahref target="/sign-up">Sign Up</Ahref>
        </li>
        <li><Ahref target="/home">Home</Ahref></li>
        <li><Ahref target="/books">Books</Ahref></li>
        <li><Ahref target="/authors">Authors</Ahref></li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
const { status, data } = useAuth();

const is_authenticated = ref(status.value == "authenticated");
const is_unauthenticated = ref(status.value == "unauthenticated");
const email = ref(data && data.value ? data.value.email : "");
</script>

<style lang="scss" scoped>
header {
  padding-top: var(--space-half);
  padding-bottom: var(--space-two);
}

.header__hidden {
  visibility: hidden;
}
</style>
