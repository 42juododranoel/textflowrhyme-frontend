import { defineStore } from "pinia";
import { BookId } from "~/types/models/book";
import { BookResult } from "~/types/results/book";

export const useReader = defineStore("reader", {
  state: () => ({
    book: null as BookResult | null,
  }),

  actions: {
    async retrieve_book(book_id: BookId) {
      const api = useApi();
      const response = await api.retrieve_book(book_id);
      this.book = response.instance;
    },
  },
});
