<template>
  <div class="page">
    <div class="page--content">
      <editor-content class="page--textarea" :editor="tiptap_editor" />
    </div>
    <div class="page--buttons">
      <Ahref class="page--button" @click="delete_page" prefix="🞵">Delete</Ahref>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PageResult } from "~/types/results/page";
import { Editor, EditorContent } from "@tiptap/vue-3";
import { InstanceUpdater } from "~/utils/instance_updater";
import { EXTENSIONS } from "~/utils/editor/constants";

// Stores

const editor = useEditor();

// Props

const props = defineProps<{
  page: PageResult;
}>();

// Refs

const page_content = ref(props.page.content);

// Objects

const instance_updater = new InstanceUpdater(
  props.page.id,
  { content: page_content.value },
  editor.update_page,
);

const parameters = {
  editable: true,
  content: page_content.value ? JSON.parse(page_content.value) : "",
  extensions: EXTENSIONS,
  onUpdate: () => {
    instance_updater.handle_tiptap("content", tiptap_editor);
  },
};
const tiptap_editor = new Editor(parameters);

// Actions

function delete_page() {
  editor.delete_page(props.page.id);
}
</script>

<style lang="scss" scoped>
.page {
  width: var(--width-page);
  margin-bottom: var(--space-two);
}

.page--buttons {
  display: flex;
  justify-content: end;
}

.page--button {
  margin-left: var(--space-half);
}
</style>

<style lang="scss">
// do something with this
.ProseMirror:focus {
  outline: none;
}
</style>
