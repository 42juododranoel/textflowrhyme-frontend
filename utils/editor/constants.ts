import { History } from "@tiptap/extension-history";
import {
  LengthMark,
  FatigueMark,
  PosMark,
  EditorText,
  EditorParagraph,
  EditorDocument,
} from "~/utils/editor/nodes";

export const EXTENSIONS = [
  LengthMark,
  FatigueMark,
  PosMark,
  EditorDocument,
  EditorParagraph,
  EditorText,
  History,
];
