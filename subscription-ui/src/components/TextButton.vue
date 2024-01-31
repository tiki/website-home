<script setup lang="ts">
import { ButtonState } from '@/interfaces'
import type { PropType } from 'vue'

defineEmits(['submit'])

defineProps({
  state: {
    type: Number as PropType<ButtonState>,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="w-full flex justify-end mt-4">
    <button
      class="mt-6 w-40 px-2 py-3 text-lg rounded-lg font-semibold"
      :class="
        state === ButtonState.DISABLED
          ? 'bg-green/50 text-white'
          : state === ButtonState.OUTLINED
            ? 'text-green bg-transparent border border-solid border-tiki-black/10'
            : 'bg-green text-white '
      "
      @click="$emit('submit')"
      :disabled="state === ButtonState.DISABLED"
    >
      {{ text }}
    </button>
  </div>
</template>
