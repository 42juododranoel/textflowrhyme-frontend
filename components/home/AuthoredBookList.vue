<template>
  <section>
    <header>
      <h2>Authored Books</h2>
      <div>This is where your books live.</div>
    </header>

    <table>
      <thead>
        <tr>
          <th>Book Title</th>
          <th></th>
          <th></th>
          <th></th>
          <th>Last Updated</th>
          <th>Was Created At</th>
        </tr>
      </thead>
      <HomeAuthoredBookListItem
        v-for="book in books"
        :key="book.id"
        :book="book"
      >
      </HomeAuthoredBookListItem>

      <tr>
        <td><Ahref @click="create_book" prefix="🞵">Create</Ahref></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <br />
  </section>
</template>

<script setup lang="ts">
import { BookResult } from "~/types/results/book";

// Stores

const home = useHome();

// Props

const props = defineProps<{
  books: BookResult[];
  count: number;
}>();

// Actions

function create_book() {
  const payload = {
    title: "…",
  };
  home.create_authored_book(payload);
}
</script>

<style lang="scss" scoped>
table {
  margin-bottom: var(--space-one-half);
}
</style>
