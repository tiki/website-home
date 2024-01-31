<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { EstimatePage, PurchasePage, AuthPage } from './pages'
import { EstimateState } from './interfaces/EstimateState'
import { type QueryInfoType } from './interfaces/QueryInfo'

const state = ref<EstimateState>()

const handleToken = (submittedToken: string) => {
  sessionStorage.setItem('authToken', submittedToken)
  state.value = EstimateState.ESTIMATE
}
onMounted(() => {
  sessionStorage.getItem('authToken')
    ? (state.value = EstimateState.ESTIMATE)
    : (state.value = EstimateState.AUTH)
})

const estimateInfo = ref<QueryInfoType>()

const handleEstimate = (estimate_info: QueryInfoType) => {
  if (!sessionStorage.getItem('authToken')) return (state.value = EstimateState.AUTH)

  state.value = EstimateState.SUBSCRIPTION
  estimateInfo.value = estimate_info
}
</script>

<template>
  <div class="flex justify-between text-left h-screen">
    <auth-page v-if="state === EstimateState.AUTH" @submit="handleToken" />
    <estimate-page v-if="state === EstimateState.ESTIMATE" @estimate="handleEstimate" />
    <purchase-page
      v-if="state === EstimateState.SUBSCRIPTION"
      :estimate-info="estimateInfo!"
      @subscribe="state = EstimateState.ESTIMATE"
      @back="state = EstimateState.ESTIMATE"
    />
  </div>
</template>

<style scoped></style>
