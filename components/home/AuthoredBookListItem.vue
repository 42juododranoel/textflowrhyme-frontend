<template>
  <tr>
    <td
      contenteditable="true"
      @input="(event) => updater.handle_input('title', event)"
    >
      {{ book_title }}
    </td>
    <td><Ahref :target="`/books/${book.id}`">Preview</Ahref></td>
    <td><Ahref :target="`/home/editor?book=${book.id}`">Edit</Ahref></td>
    <td><Ahref @click="delete_book" prefix="🞵">Delete</Ahref></td>
    <td>{{ book_updated_at }}</td>
    <td>{{ book_created_at }}</td>
  </tr>
</template>

<script setup lang="ts">
import { BookResult } from "~/types/results/book";
import { InstanceUpdater } from "~/utils/instance_updater";
import { formatDistance } from "date-fns";

// Stores

const home = useHome();

// Props

const props = defineProps<{
  book: BookResult;
}>();

// Refs

const book_title = ref(props.book.title);
const book_created_at = ref(
  formatDistance(props.book.created_at, new Date(), { addSuffix: true }),
);
const book_updated_at = ref(
  formatDistance(props.book.updated_at, new Date(), { addSuffix: true }),
);

// Objects

const updater = new InstanceUpdater(
  props.book.id,
  { title: book_title.value },
  home.update_authored_book,
);

// Actions

function delete_book() {
  home.delete_authored_book(props.book.id);
}
</script>
