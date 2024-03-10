import { BookId, BookTitle } from "~/types/models/book";
import { PageResult } from "~/types/results/page";

export type BookResult = {
  id: BookId;
  title: BookTitle;
  pages: PageResult[];
  created_at: Date;
  updated_at: Date;
};

export type BookInstanceResult = {
  instance: BookResult;
};

export type BookCollectionResult = {
  collection: BookResult[];
  count: number;
};
