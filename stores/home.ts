import { defineStore } from "pinia";
import { BookId } from "~/types/models/book";
import { BookCreatePayload, BookUpdatePayload } from "~/types/payloads/book";
import { BookResult } from "~/types/results/book";

export const useHome = defineStore("home", {
  state: () => ({
    authored_books: [] as BookResult[],
    authored_book_count: 0 as number,
  }),

  actions: {
    async reload_authored_books() {
      await this.list_authored_books();
    },
    async list_authored_books() {
      const api = useApi();
      const response = await api.list_books();
      this.authored_books = response.collection;
      this.authored_book_count = response.count;
    },
    async delete_authored_book(book_id: BookId) {
      const api = useApi();
      await api.delete_book(book_id);
      this.reload_authored_books();
    },
    async create_authored_book(payload: BookCreatePayload) {
      const api = useApi();
      await api.create_book(payload);
      this.reload_authored_books();
    },
    async update_authored_book(book_id: BookId, payload: BookUpdatePayload) {
      const api = useApi();
      await api.update_book(book_id, payload);
      this.reload_authored_books();
    },
  },
});
