<script lang="ts" setup>
import { type PropType } from 'vue'
import { type QueryInfoType } from '../interfaces'

defineProps({
  info: {
    type: Object as PropType<QueryInfoType>,
    required: true
  }
})
</script>

<template>
  <div>
    <div class="w-full flex flex-col text-xs">
      <div>
        <h1 class="text-tiki-gray font-semibold">INITIAL LOAD</h1>
        <div class="flex justify-between">
          <div class="font-normal text-tiki-gray">Number of Records</div>
          <div class="font-normal text-tiki-gray">{{ info.total }}</div>
        </div>
        <div class="flex justify-between">
          <div class="font-normal text-tiki-gray">Cost</div>
          <div class="font-normal text-tiki-gray">${{ info.annualCost }}</div>
        </div>
      </div>
      <hr class="text-tiki-black/10 my-4" />

      <div>
        <h1 class="text-tiki-gray font-semibold">MONTHLY UPDATES</h1>
        <div class="flex justify-between">
          <div class="font-normal text-tiki-gray">Number of Records</div>
          <div class="font-normal text-tiki-gray">{{ info.monthlyUpdate }}</div>
        </div>
        <div class="flex justify-between">
          <div class="font-normal text-tiki-gray">Cost (monthly)</div>
          <div class="font-normal text-tiki-gray">{{ info.costs }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
