import { Paragraph } from "@tiptap/extension-paragraph";
import { Document } from "@tiptap/extension-document";
import { Text } from "@tiptap/extension-text";
import { mergeAttributes, Mark } from "@tiptap/core";

export const FatigueMark = Mark.create({
  name: "fatigue",
  renderHTML({ HTMLAttributes }) {
    return ["span", { class: `editor--fatigue__${HTMLAttributes.value}` }, 0];
  },
  addAttributes() {
    return {
      value: {
        default: 0,
      },
    };
  },
});

export const LengthMark = Mark.create({
  name: "length",
  renderHTML({ HTMLAttributes }) {
    return ["span", { class: `editor--length__${HTMLAttributes.value}` }, 0];
  },
  addAttributes() {
    return {
      value: {
        default: 0,
      },
    };
  },
});

export const PosMark = Mark.create({
  name: "pos",
  renderHTML({ HTMLAttributes }) {
    return ["span", { class: `editor--pos__${HTMLAttributes.value}` }, 0];
  },
  addAttributes() {
    return {
      value: {
        default: "",
      },
    };
  },
});

export const EditorText = Text.extend({
  marks: "fatigue length pos",
});

export const EditorParagraph = Paragraph.extend({
  content: "text*",
  renderHTML({ HTMLAttributes }) {
    return [
      "p",
      mergeAttributes(HTMLAttributes, { class: "editor--paragraph" }),
      0,
    ];
  },
});

export const EditorDocument = Document.extend({
  content: "paragraph+",
});
