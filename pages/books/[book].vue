<template>
  <BookReaderView v-if="reader.book" :book="reader.book" />
</template>

<script setup lang="ts">
const route = useRoute();
const reader = useReader();

const book_id = Number(route.params.book);
reader.retrieve_book(Number(book_id));
</script>
