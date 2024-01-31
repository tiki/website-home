<script setup lang="ts">
import { type QueryInfoType, ButtonState, type SubscriptionType, BuilderState } from '../interfaces'
import { HeaderTitle, InputComponent, TextButton, AlertComponent } from '../components'
import { type PropType, ref } from 'vue'
import { Subscription } from '../subscription'

const props = defineProps({
  estimateInfo: {
    type: Object as PropType<QueryInfoType>,
    required: true
  }
})

const emits = defineEmits(['subscribe', 'back'])

const subscription = new Subscription()

const token = sessionStorage.getItem('authToken')

const subscribe = async () => {
  const response: SubscriptionType = await subscription.subscribe(
    props.estimateInfo!.subscriptionId,
    token!
  )
  if (!response || response.status !== 'subscribed')
    return (error.value = 'It was not possible to subscribe!')

  emits('subscribe')
}

const error = ref<string>()
</script>

<template>
  <div class="w-3/5 pr-10 border-r border-solid border-tiki-black/10 gap-1.5 flex flex-col">
    <header-title />
    <alert-component
      :type="BuilderState.ERROR"
      :text="'Uh oh! Your subscription failed, you will not be billed. Please try again or contact support.'"
      v-if="error"
      @cancel="error = undefined"
    />
    <input-component
      :title="'RESULTS'"
      :description="'Showing the first 10 matching results.'"
      :type="'sampleData'"
      :sample="estimateInfo.sample"
      :info="estimateInfo"
    />
    <text-button :state="ButtonState.OUTLINED" :text="'New Estimate'" @submit="$emit('back')" />
  </div>
  <div class="w-2/5 flex flex-col pl-8">
    <input-component
      :title="'ESTIMATE'"
      :description="'Actual costs may vary; more data is always being added. '"
      :type="'queryInfo'"
      :info="estimateInfo"
    />
    <text-button :state="ButtonState.ACTIVE" :text="'Subscribe'" @submit="subscribe" />
  </div>
</template>
