<script setup lang="ts">
import type { PropType } from 'vue'
import { BuilderState } from '@/interfaces'

defineEmits(['cancel'])

defineProps({
  type: {
    type: Number as PropType<BuilderState>,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div
    class="w-full flex justify-between p-3 rounded-md"
    :class="
      type === BuilderState.LOADING
        ? 'bg-tiki-yellow/20 border border-solid border-tiki-black/10'
        : 'bg-tiki-red/20 border border-solid border-tiki-black/10'
    "
  >
    <div
      class="flex gap-2 justify-center items-center text-tiki-gray font-normal"
      :class="type === BuilderState.ERROR ? 'text-tiki-red' : ''"
    >
      <img
        src="@/assets/images/loading-icon.svg"
        alt=""
        class="w-6"
        v-if="type === BuilderState.LOADING"
      />
      <img src="@/assets/images/alert-icon.svg" alt="" class="w-6" v-else />
      {{ text }}
    </div>
    <button
      class="flex justify-center items-center gap-2 text-tiki-gray font-normal"
      @click="$emit('cancel')"
    >
      <span v-if="type === BuilderState.LOADING">Cancel</span>
      <img src="@/assets/images/cancel-icon.svg" class="w-6" v-if="type === BuilderState.LOADING" />
      <img src="@/assets/images/red-crossmark.svg" class="w-6" v-else />
    </button>
  </div>
</template>
