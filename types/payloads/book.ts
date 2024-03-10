import { type BookTitle } from "~/types/models/book";

export type BookCreatePayload = {
  title: BookTitle;
};

export type BookUpdatePayload = {
  title: BookTitle;
};
