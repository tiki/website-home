<script setup lang="ts">
import { ref } from 'vue'
import { TableTaxonomy, InputComponent, HeaderTitle, AlertComponent } from '../components'
import { BuilderState } from '../interfaces'
import { Subscription } from '../subscription'

const emits = defineEmits(['estimate'])

const cleanroomId = ref<string>()

const tableName = ref<string>()

const isLoading = ref<boolean>(false)

const hasError = ref<boolean>(false)

const subscription = new Subscription()

const token = sessionStorage.getItem('authToken')

const submit = async (query: string) => {
  hasError.value = false
  isLoading.value = true

  let estimateResponse
  subscription
    .estimate(tableName.value!, query, cleanroomId.value!, token!)
    .then((response) => {
      estimateResponse = response

      const costs = (estimateResponse!.count[0].total! * 0.001).toFixed(2).toLocaleString()

      const annualCost = (estimateResponse!.count[0].total! * 0.001 * 12)
        .toFixed(2)
        .toLocaleString()

      const monthlyUpdate = (estimateResponse!.count[0].total! / 12).toFixed(2).toLocaleString()

      const total = estimateResponse!.count[0].total?.toLocaleString()

      const sample = estimateResponse!.sample[0].records

      const infoJson = {
        subscriptionId: estimateResponse!.subscriptionId,
        costs: `$${costs}/month`,
        annualCost: annualCost,
        monthlyUpdate: monthlyUpdate,
        total: total,
        sample: sample
      }

      emits('estimate', infoJson)
      isLoading.value = false
    })
    .catch(() => {
      hasError.value = true
      isLoading.value = false
      return
    })
}

const cancelRequest = () => {
  subscription.cancel()
  isLoading.value = false
  hasError.value = false
}
</script>

<template>
  <div class="w-3/5 pr-10 border-r border-solid border-tiki-black/10 gap-1.5 flex flex-col">
    <header-title />
    <alert-component
      :type="
        isLoading && !hasError
          ? BuilderState.LOADING
          : hasError && !isLoading
            ? BuilderState.ERROR
            : BuilderState.INITIAL
      "
      :text="
        isLoading && !hasError
          ? 'Calculating... this may take a minute. We have a lot of data.'
          : 'Uh oh! Your estimate failed, check your query and table name.'
      "
      v-if="isLoading || hasError"
      @cancel="cancelRequest"
    />
    <div class="flex relative w-full">
      <div class="w-full">
        <div class="mb-8">
          <input-component
            :title="'CLEANROOM'"
            :description="'The unique ID for the cleanroom where your data is stored.'"
            :type="'cleanroomSelect'"
            @update-cleanroom="(value) => (cleanroomId = value)"
          />
        </div>
        <div class="mb-8">
          <input-component
            :title="'TABLE NAME'"
            :description="'The name of the table to be created. Follow SQL conventions: lowercase and underscore.'"
            :type="'input'"
            :placeholder="'my_first_table'"
            @update-table-name="(value) => (tableName = value)"
          />
        </div>
        <input-component
          :title="'CREATE FILTER'"
          :description="'Define a SQL filter to extract the required data from our system into your table.'"
          :type="'queryEditor'"
          @submit="submit"
        />
      </div>
      <div class="absolute w-full h-full bg-white/50" v-if="isLoading"></div>
    </div>
  </div>
  <div class="w-2/5 flex px-8">
    <table-taxonomy />
  </div>
</template>
