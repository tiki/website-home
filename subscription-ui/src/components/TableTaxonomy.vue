<script setup lang="ts">
import { demographics, transactions, receipts } from '../interfaces'

const tables = ['demographics', 'receipts', 'transactions']

const emit = defineEmits(['insert', 'update'])
const checkTable = (table: string) => {
  switch (table) {
    case 'demographics':
      return demographics
    case 'receipts':
      return receipts
    case 'transactions':
      return transactions
  }
}

const updateTable = (event: any) => {
  if (event.newState === 'open') emit('update', `tiki.${event.srcElement.id}`)
}
</script>

<template>
  <div class="w-full">
    <h1 class="text-xs text-tiki-gray font-medium mb-4">TABLES</h1>
    <details v-for="table in tables" class="w-full" :id="table" :key="table" @toggle="updateTable">
      <summary
        class="flex flex-row-reverse py-1 cursor-pointer text-tiki-gray font-normal capitalize my-1 w-full text-xs"
      >
        {{ table }}
        <span></span>
      </summary>
      <ul>
        <li
          class="mt-2 w-full flex justify-between text-tiki-gray font-normal cursor-pointer px-5"
          v-for="data of checkTable(table)"
          :key="data.data"
          @dblclick="$emit('insert', data.data)"
        >
          <span class="break-all">
            {{ data.data }}
          </span>
          <span class="text-tiki-gray font-normal ml-5">{{ data.type }}</span>
        </li>
      </ul>
    </details>
  </div>
</template>

<style scoped>
summary {
  cursor: pointer;
  justify-content: start;
}

details[open] summary span::before {
  content: url('@/assets/images/green-select-arrow.svg');
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

details[open] > summary {
  background-color: rgba(0, 178, 114, 0.09);
  color: #00b272;
  border-radius: 0.25rem;
}

details summary span::before {
  content: url('@/assets/images/closed-arrow.svg');
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.05rem;
}

details summary::-webkit-details-marker,
details summary::marker {
  display: none;
}
</style>
