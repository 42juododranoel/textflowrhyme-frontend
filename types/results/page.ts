import { type PageId, type PageContent } from "~/types/models/page";

export type PageResult = {
  id: PageId;
  content: PageContent;
  created_at: Date;
  updated_at: Date;
};
