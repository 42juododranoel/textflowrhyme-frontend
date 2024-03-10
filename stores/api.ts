import { defineStore } from "pinia";

import { type BookId } from "~/types/models/book";

import { type PageId } from "~/types/models/page";
import {
  type PageCreatePayload,
  type PageUpdatePayload,
} from "~/types/payloads/page";
import {
  type BookCreatePayload,
  type BookUpdatePayload,
} from "~/types/payloads/book";
import {
  type BookCollectionResult,
  type BookInstanceResult,
} from "~/types/results/book";

export const useApi = defineStore("api", {
  actions: {
    // Books
    async delete_book(book_id: BookId) {
      return await $fetch(`/api/v1.0.0/books/${book_id}`, { method: "DELETE" });
    },
    async create_book(payload: BookCreatePayload) {
      return await $fetch("/api/v1.0.0/books", {
        method: "POST",
        body: payload,
      });
    },
    async update_book(book_id: BookId, payload: BookUpdatePayload) {
      return await $fetch(`/api/v1.0.0/books/${book_id}`, {
        method: "PATCH",
        body: payload,
      });
    },
    async list_books() {
      return await $fetch<BookCollectionResult>("/api/v1.0.0/books");
    },
    async retrieve_book(book_id: BookId) {
      return await $fetch<BookInstanceResult>(`/api/v1.0.0/books/${book_id}`);
    },
    // Pages
    async delete_page(page_id: PageId) {
      return await $fetch(`/api/v1.0.0/pages/${page_id}`, { method: "DELETE" });
    },
    async create_page(payload: PageCreatePayload) {
      return await $fetch("/api/v1.0.0/pages", {
        method: "POST",
        body: payload,
      });
    },
    async update_page(page_id: PageId, payload: PageUpdatePayload) {
      return await $fetch(`/api/v1.0.0/pages/${page_id}`, {
        method: "PATCH",
        body: payload,
      });
    },
  },
});
