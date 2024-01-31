<script setup lang="ts">
import { ref } from 'vue'
import { Subscription } from '../subscription'
import type { ProfileInfo } from '../interfaces/ProfileInfo'
import HeaderTitle from '../components/HeaderTitle.vue'
import TextButton from '../components/TextButton.vue'
import { ButtonState } from '../interfaces/ButtonState'
import AlertComponent from '../components/AlertComponent.vue'
import { BuilderState } from '../interfaces/BuilderState'

const subscription = new Subscription()

const emit = defineEmits(['submit'])

const submit = async () => {
  if (token.value !== undefined && token.value !== '') {
    const response: ProfileInfo = await subscription.validate(token.value)
    if (!response.orgId && !response.userId) {
      error.value = 'Invalid auth token'
      return
    }
    sessionStorage.setItem('userId', response.userId)
    sessionStorage.setItem('orgId', response.orgId)
    emit('submit', token.value)
    return
  }
  error.value = 'The token field should not be empty'
}

const token = ref<string>()

const error = ref<string>()
</script>

<template>
  <div class="w-3/5 pr-10 border-r border-solid border-tiki-black/10">
    <header-title />
    <alert-component
      :type="BuilderState.ERROR"
      :text="'Uh oh! Your authetication failed. Please review your token and try again.'"
      v-if="error"
      @cancel="error = undefined"
    />
    <h1 class="mt-4 text-tiki-gray font-semibold text-xs">API KEY</h1>
    <label for="" class="text-tiki-gray font-normal mt-1 block text-xs">
      Copy and paste your API Key from
      <a
        class="text-green underline"
        href="https://mytiki.com/reference/intro/authentication"
        target="_blank"
        >Get Access</a
      >
      to start.
    </label>
    <input
      v-model="token"
      type="password"
      class="block border border-tiki-black/10 border-solid rounded-md flex gap-2 p-2.5 mt-4 w-full"
    />
    <text-button
      :state="!token ? ButtonState.DISABLED : ButtonState.ACTIVE"
      :text="'Continue'"
      @submit="submit"
    />
  </div>
  <div class="w-2/5 flex justify-center items-center">
    <img src="../assets/images/tiki-pineapple-block.png" alt="" class="w-40" />
  </div>
</template>

<style scoped></style>
