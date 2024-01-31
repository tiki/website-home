<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as monaco from 'monaco-editor'
import 'monaco-sql-languages/out/esm/trinosql/trinosql.contribution'
import { ButtonState } from '@/interfaces'
import { TextButton } from './'

let editorMonaco: monaco.editor.IStandaloneCodeEditor

onMounted(() => {
  monaco.editor.defineTheme('myCustomTheme', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      'editor.foreground': '#505C59',
      'editorLineNumber.foreground': '#505C59',
      'editorActiveLineNumber.foreground': '#505C59',
      'editor.lineHighlightBorder': '#FFFFFF'
    }
  })

  monaco.editor.setTheme('myCustomTheme')

  editorMonaco = monaco.editor.create(editor.value, {
    value: `SELECT * FROM TABLE`,
    language: '',
    automaticLayout: true,
    minimap: {
      enabled: false
    },
    fontFamily: 'SF Mono',
    fontSize: 12,
    fontWeight: '300',
    scrollbar: {
      horizontal: 'hidden',
      vertical: 'hidden',
      verticalScrollbarSize: 0
    }
  })
})

const editor = ref()

const emits = defineEmits(['update'])

const submitQuery = async () => {
  let query = editorMonaco.getValue()

  if (query.endsWith(';')) query = query.slice(0, -1)
  emits('update', query)
}
</script>

<template>
  <div>
    <div
      class="flex flex-col block border border-tiki-black/10 border-solid rounded-md flex gap-2 p-2.5 mt-4 w-full placeholder:text-tiki-gray/70"
    >
      <div id="editor" ref="editor" class="h-[15rem] w-full"></div>
    </div>
    <text-button :state="ButtonState.ACTIVE" :text="'Get Estimate'" @submit="submitQuery" />
  </div>
</template>

<style scoped></style>
