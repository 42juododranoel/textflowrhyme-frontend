<template>
  <div class="container">
    <div class="editor">
      <!-- Analyze Buttons -->
      <div class="pt-5">
        <div class="btn-group" role="group" aria-label="Configure editing modes">
          <input type="checkbox" class="btn-check" name="btncheckbox" id="button-mode-length" autocomplete="off" :checked="is_length_checked" @click="switch_length">
          <label class="btn btn-outline-primary" for="button-mode-length"><i class="bi bi-body-text me-1"></i>Length</label>

          <input type="checkbox" class="btn-check" name="btncheckbox" id="button-mode-fatigue" autocomplete="off" :checked="is_fatigue_checked" @click="switch_fatigue">
          <label class="btn btn-outline-primary" for="button-mode-fatigue"><i class="bi bi-book me-1"></i>Fatigue</label>
        </div>
      </div>

      <div />

      <!-- Rewrite Buttons -->
      <div class="pt-5">
        <button type="button" class="btn btn-success me-2" :disabled="rewrite_togetherai_api_key ? false : true" @click="rewrite"><i class="bi bi-play me-1"></i>Rewrite</button>
        <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#text-rewrite-settings"><i class="bi bi-gear me-1"></i>Settings</button>

        <!-- Text Rewrite Settings Modal -->
        <div class="modal fade" id="text-rewrite-settings" tabindex="-1" aria-labelledby="text-rewrite-settings-label" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="text-rewrite-settings-label">Rewrite Settings</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <!-- Text Rewrite Settings Modal Body -->
              <div class="modal-body">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col">
                      <!-- Text Rewrite Settings Modal Body Form -->
                      <div class="mb-3">
                        <label for="togetherai-apikey" class="form-label">Together.ai API Key</label>
                        <input type="text" class="form-control" id="togetherai-apikey" aria-describedby="togetherai-apikey-help" v-model="rewrite_togetherai_api_key">
                        <div id="togetherai-apikey-help" class="form-text">Transmitted with HTTPS, not stored anywhere beyond your local device.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Editor Progress -->
      <div class="py-3">
        <div class="progress">
          <div 
            class="progress-bar progress-bar-striped progress-bar-animated" 
            role="progressbar" 
            :ariaValuenow="analyzing_progress" 
            :ariaValuemin="ANALYZING_READY" 
            :ariaValuemax="ANALYZING_FINISHED" 
            :style="{ width: analyzing_progress + '%' }"
          ></div>
        </div>
      </div>

      <div />

      <!-- Rewrite Progress -->
      <div class="py-3">
        <div class="progress">
          <div 
            class="progress-bar progress-bar-striped progress-bar-animated" 
            role="progressbar" 
            :ariaValuenow="rewriting_progress" 
            :ariaValuemin="REWRITING_READY" 
            :ariaValuemax="REWRITING_FINISHED" 
            :style="{ width: rewriting_progress + '%' }"
          ></div>
        </div>
      </div>

      <editor-content class="editor--textarea" :editor="editor" />

      <div />

      <div>
        <p class="editor--correction" contenteditable="true" :class="{'d-none': !correction}">{{ correction }}</p>
        <p class="editor--selection" :class="{'d-none': !selection.text }">{{ selection.text }}</p>
      </div>

      <div />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3"
import History from "@tiptap/extension-history"
import { ref } from "vue"
import { LengthMark, FatigueMark, EditorText, EditorParagraph, EditorDocument } from "~/utils/editor/nodes"
import { useTextSelection } from '@vueuse/core'

const ANALYZING_READY = 0
const ANALYZING_PREPARING_REQUEST = 25
const ANALYZING_SENDING_REQUEST = 50
const ANALYZING_PROCESSING_RESPONSE = 75
const ANALYZING_FINISHED = 100

const REWRITING_READY = 0
const REWRITING_PREPARING_REQUEST = 33
const REWRITING_SENDING_REQUEST = 66
const REWRITING_FINISHED = 100

const MINIMUM_ANALYZE_TIMEDELTA = 1000

const DEMO_LINE = "Was I sleeping, while the others suffered? Am I sleeping now? Tomorrow, when I wake, or think I do, what shall I say of today? That with Estragon my friend, at this place, until the fall of night, I waited for Godot?"
const DEMO_DOCUMENT = {
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": DEMO_LINE,
          "marks": []
        }
      ],
    },
  ]
}

const is_length_checked = ref(true)
const is_fatigue_checked = ref(false)

const analyzing_progress = ref(ANALYZING_READY)
const rewriting_progress = ref(REWRITING_READY)

const selection = ref(useTextSelection())
const correction = ref("")

const rewrite_togetherai_api_key = ref("")

let last_updated_at = new Date().getTime()


function switch_length() {
  is_length_checked.value = !is_length_checked.value
  analyze()
}


function switch_fatigue() {
  is_fatigue_checked.value = !is_fatigue_checked.value
  analyze()
}


function analyze() {
  if (analyzing_progress.value == ANALYZING_READY) {
    analyzing_progress.value = ANALYZING_PREPARING_REQUEST
    editor.value.setOptions({editable: false});

    const editor_nodes = editor.value.getJSON()
    const { from, to } = editor.value.state.selection
    
    const params = {}
    if (is_length_checked.value) {
      params.length = {lengths: null}
    }
    if (is_fatigue_checked.value) {
      params.fatigue = {fatigue_rate: 1}
    }

    $fetch("/api/v1.0.0/documents/analyze", {
      method: "POST",
      body: {
        params: params,
        document: editor_nodes,
      },
      onRequest({ request, options }) {
        analyzing_progress.value = ANALYZING_SENDING_REQUEST
      },
      onResponse({ request, response, options }) {
        analyzing_progress.value = ANALYZING_PROCESSING_RESPONSE
        editor.value.commands.setContent(response._data.document)
        editor.value.commands.setTextSelection({ from, to })    
        analyzing_progress.value = ANALYZING_FINISHED

        setTimeout(() => {
          last_updated_at = new Date().getTime()
          analyzing_progress.value = ANALYZING_READY
          editor.value.setOptions({editable: true})
        }, 250)
      },
    })
  }
}


function rewrite() {
  if (rewriting_progress.value == REWRITING_READY) {
    rewriting_progress.value = REWRITING_PREPARING_REQUEST

    const state = editor.value.view.state
    const selection = state.selection
    const {from, to} = selection
    const text = state.doc.textBetween(from, to, " ")

    $fetch("/api/v1.0.0/texts/rewrite", {
      method: "POST",
      body: {
        text: text, 
        params: { 
          togetherai_api_key: rewrite_togetherai_api_key.value 
        }
      },
      onRequest({ request, options }) {
        rewriting_progress.value = REWRITING_SENDING_REQUEST
      },
      onResponse({ request, response, options }) {
        correction.value = response._data.text
        rewriting_progress.value = REWRITING_FINISHED

        setTimeout(() => {
          rewriting_progress.value = REWRITING_READY
        }, 250)
      },
    })
  }  
}


function maybe_analyze_on_update() {
  const current_timedelta = new Date().getTime() - last_updated_at
  if (current_timedelta > MINIMUM_ANALYZE_TIMEDELTA) {
    analyze()
  }
}


const editor = useEditor({
  content: DEMO_DOCUMENT,
  extensions: [
    LengthMark,
    FatigueMark,
    EditorDocument,
    EditorParagraph,
    EditorText,
    History,
  ],
  onCreate: () => {
    analyze()
  },
  onUpdate: () => {
    last_updated_at = new Date().getTime()
    setTimeout(
      function () { 
        maybe_analyze_on_update() 
      },
      MINIMUM_ANALYZE_TIMEDELTA,
    )
  },
})
</script>

<style lang="scss">
.editor {
  display: grid;
  height: 100vh;

  grid-template-columns: 750px 50px auto;
  grid-template-rows: auto auto 70% 10%;
  grid-column-gap: 0px;
  grid-row-gap: 0px; 

  &--textarea {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding: 10px 15px;
    border: 1px solid var(--bs-secondary-bg);
    border-radius: 5px;
  }

  &--correction,
  &--selection {
    white-space: pre-wrap;
    max-height: 50%;
    overflow-y: scroll;
    padding: 10px 15px;
    border: 1px solid var(--bs-secondary-bg);
    border-radius: 5px;
  }

  &--correction {
    outline: none;
  }

  &--selection {
    background-color: var(--bs-secondary-bg);
  }

  &--paragraph {}

  // Lengths
  &--sentence__length-0 {
    background-color: hsla(100, 90%, 90%, 90%);
  }
  &--sentence__length-1 {
    background-color: hsla(210, 90%, 90%, 90%);
  }
  &--sentence__length-2 {
    background-color: hsla(280, 90%, 90%, 90%);
  }

  @for $index from 0 through 100 {
    &--fatigue__value#{$index} {
      background-color: rgba(64, 64, 64, $index * 0.0125);
    }
  }
}

.ProseMirror:focus {
  outline: none;
}

.progress-bar {
  transition: none;
}

.modal {
  --bs-modal-width: 700px;
}


</style>
