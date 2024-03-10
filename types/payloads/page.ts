import { type PageContent } from "~/types/models/page";
import { type BookId } from "~/types/models/book";

export type PageUpdatePayload = {
  content: PageContent;
};

export type PageCreatePayload = {
  book_id: BookId;
  content: PageContent;
};
