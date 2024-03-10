<template>
  <div class="page">
    <div class="page--content">
      <editor-content class="page--textarea" :editor="tiptap_editor" />
      <hr class="page--bottom-edge" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PageResult } from "~/types/results/page";
import { EditorContent } from "@tiptap/vue-3";
import { Editor } from "@tiptap/vue-3";
import { EXTENSIONS } from "~/utils/editor/constants";

const props = defineProps<{
  page: PageResult;
}>();

const editor_content = props.page.content;
const parameters = {
  editable: false,
  content: editor_content ? JSON.parse(editor_content) : "",
  extensions: EXTENSIONS,
};
const tiptap_editor = new Editor(parameters);
</script>

<style lang="scss" scoped>
.page {
  width: var(--width-page);
  margin-bottom: var(--space-two);
}

.page--bottom-edge {
  margin-top: var(--space-three);
}

.page--textarea {
  font-family: var(--font-family-serif);
}
</style>
