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
import { type BookInstanceResult } from "~/types/results/book";
import {
  type RegisterPayload,
  type LoginPayload,
} from "~/types/payloads/authentication";
import { type LoginResult } from "~/types/results/authentication";

export const useApi = defineStore("api", {
  actions: {
    // Base
    async request(method, path, body = undefined) {
      const token = "42";
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      return await $fetch(path, { method, headers, body });
    },
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
      return await this.request("GET", "/api/v1.0.0/books");
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
    // Authentication
    async register(payload: RegisterPayload) {
      return await $fetch(`/api/v1.0.0/authentication/register`, {
        method: "POST",
        body: payload,
      });
    },
    async login(payload: LoginPayload) {
      const form_data = new FormData();
      form_data.append("username", payload.username);
      form_data.append("password", payload.password);

      return await $fetch<LoginResult>(`/api/v1.0.0/authentication/jwt/login`, {
        method: "POST",
        body: form_data,
      });
    },
    async logout() {
      return await $fetch(`/api/v1.0.0/authentication/jwt/logout`, {
        method: "POST",
      });
    },
  },
});
