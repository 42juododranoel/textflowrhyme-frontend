<template>
  <main>
    <h1
      contenteditable="true"
      @input="(event) => instance_updater.handle_input('title', event)"
    >
      {{ book_title }}
    </h1>

    <HomeEditorPage v-for="page in book.pages" :page="page" :key="page.id" />
    <span>
      <Ahref @click="create_page" prefix="🞵">Create</Ahref>
    </span>
  </main>
</template>

<script setup lang="ts">
import { BookResult } from "~/types/results/book";
import { InstanceUpdater } from "~/utils/instance_updater";

// Stores

const editor = useEditor();

// Props

const props = defineProps<{
  book: BookResult;
}>();

// Refs

const book_title = ref(props.book.title);

// Objects

const instance_updater = new InstanceUpdater(
  props.book.id,
  { title: book_title.value },
  editor.update_current_book,
);

// Actions

function create_page() {
  const payload = {
    content: "",
    book_id: props.book.id,
  };
  editor.create_page(payload);
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: var(--space-two);
}
</style>
