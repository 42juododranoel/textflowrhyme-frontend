<template>
  <main>
    <HomeAuthoredBookList
      :books="home.authored_books"
      :count="home.authored_book_count"
    />
  </main>
</template>

<script setup lang="ts">
const home = useHome();
</script>

<style lang="scss" scoped></style>
