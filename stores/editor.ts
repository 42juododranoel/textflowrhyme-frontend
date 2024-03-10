import { defineStore } from "pinia";
import { BookId } from "~/types/models/book";
import { PageId } from "~/types/models/page";
import { BookUpdatePayload } from "~/types/payloads/book";
import { PageCreatePayload, PageUpdatePayload } from "~/types/payloads/page";
import { BookResult } from "~/types/results/book";

export const useEditor = defineStore("editor", {
  state: () => ({
    book: null as BookResult | null,
  }),

  actions: {
    // Current Book
    async retrieve_current_book(book_id: BookId) {
      const api = useApi();
      const response = await api.retrieve_book(book_id);
      this.book = response.instance;
    },
    async reload_current_book() {
      if (this.book) {
        await this.retrieve_current_book(this.book.id);
      }
    },
    async update_current_book(book_id: BookId, payload: BookUpdatePayload) {
      const api = useApi();
      await api.update_book(book_id, payload);
      this.reload_current_book();
    },
    // Page
    async create_page(payload: PageCreatePayload) {
      const api = useApi();
      await api.create_page(payload);
      this.reload_current_book();
    },
    async update_page(page_id: PageId, payload: PageUpdatePayload) {
      const api = useApi();
      await api.update_page(page_id, payload);
      this.reload_current_book();
    },
    async delete_page(page_id: PageId) {
      const api = useApi();
      await api.delete_page(page_id);
      this.reload_current_book();
    },
  },
});
