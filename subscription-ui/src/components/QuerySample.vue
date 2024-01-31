<script setup lang="ts">
import { type PropType } from 'vue'

defineProps({
  sample: {
    type: Array as PropType<any[]>,
    required: false
  }
})
</script>

<template>
  <div class="overflow-scroll w-4/4 rounded-lg p-0">
    <table class="border-separate border-spacing-3" v-if="sample">
      <thead>
        <tr>
          <th
            class="text-tiki-gray font-semibold"
            v-for="(value, key) in sample[0].split(',')"
            :key="key"
          >
            {{ value }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in sample.slice(1)" :key="index">
          <td
            class="box-content text-tiki-gray font-normal"
            v-for="(item, index) in row.split(',')"
            :key="index"
          >
            {{ item }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
td {
  max-width: 6rem;
  min-width: 6rem;
  overflow: scroll;
  white-space: nowrap;
}
</style>
