import { PageContent } from "~/types/models/page";
import { BookId } from "~/types/models/book";

export type PageUpdatePayload = {
  content: PageContent;
};

export type PageCreatePayload = {
  book_id: BookId;
  content: PageContent;
};
