<template>
  <main>
    <div class="reader">
      <h1>{{ book.title }}</h1>

      <BookReaderPage
        v-for="page in book.pages"
        :page="page"
        :key="page.id"
      ></BookReaderPage>
    </div>
  </main>
</template>

<script setup lang="ts">
import { BookResult } from "~/types/results/book";

const props = defineProps<{
  book: BookResult;
}>();
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: var(--space-two);
}

main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
