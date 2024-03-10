<template>
  <HomeEditorView v-if="editor.book" :book="editor.book" />
</template>

<script setup lang="ts">
const route = useRoute();
const editor = useEditor();

const book_id = Number(route.query.book);
editor.retrieve_current_book(Number(book_id));
</script>
