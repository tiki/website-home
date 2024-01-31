<script setup lang="ts">
import { CleanroomSelect, QueryEditor, QuerySample, QueryInfo } from './'
import { type PropType } from 'vue'
import { type QueryInfoType } from '@/interfaces'

defineEmits(['updateCleanroom', 'submit', 'updateTableName'])

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: false
  },
  info: {
    type: Object as PropType<QueryInfoType>,
    required: false
  },
  sample: {
    type: Array as PropType<any[]>,
    required: false
  }
})

const componentHandler = (type: string) => {
  switch (type) {
    case 'cleanroomSelect':
      return CleanroomSelect
    case 'queryEditor':
      return QueryEditor
    case 'sampleData':
      return QuerySample
    case 'queryInfo':
      return QueryInfo
    default:
      return type
  }
}
</script>

<template>
  <div class="text-tiki-gray font-semibold flex justify-between w-full">
    <div class="text-xs">
      {{ title }}
    </div>
    <div v-if="type === 'sampleData'" class="text-xs">
      {{ info?.total }}
    </div>
  </div>
  <label for="" class="text-tiki-gray font-normal mt-1 block text-xs">
    {{ description }}
  </label>
  <component
    :is="componentHandler(type)"
    :class="
      type !== 'queryEditor'
        ? 'block border border-tiki-black/10 border-solid rounded-md flex gap-2 p-2.5 mt-4 w-full placeholder:text-tiki-gray/70 text-tiki-gray'
        : ''
    "
    :placeholder="placeholder"
    :sample="sample"
    :info="info"
    @changeCleanroom="(value: string) => $emit('updateCleanroom', value)"
    @input="
      (event: InputEvent) => $emit('updateTableName', (event.target as HTMLInputElement).value)
    "
    @update="(query: string) => $emit('submit', query)"
  >
    ></component
  >
</template>
