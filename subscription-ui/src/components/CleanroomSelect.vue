<script setup lang="ts">
import { ref } from 'vue'
import { Subscription } from '../subscription'
import { type Cleanroom } from '../interfaces'

const subscription = new Subscription()

const token = sessionStorage.getItem('authToken')

const cleanrooms = ref<Cleanroom[]>()

subscription.getCleanrooms(token!).then((response) => {
  cleanrooms.value = response
})

const cleanroomSelected = ref()
</script>

<template>
  <select
    name="cleanroom"
    id="cleanroom"
    v-model="cleanroomSelected"
    @change="$emit('changeCleanroom', cleanroomSelected)"
    onchange="this.dataset.chosen = 'chosen'"
    class="text-tiki-gray/70"
  >
    <option value="undefined" disabled>My cleanroom</option>
    <option
      v-for="cleanroom in cleanrooms"
      :value="cleanroom.cleanroomId"
      :key="cleanroom.cleanroomId"
    >
      {{ cleanroom.name }}
    </option>
  </select>
</template>

<style scoped>
select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: url('@/assets/images/select-arrow.svg');
  background-repeat: no-repeat, repeat;
  background-position:
    right 0.7em top 50%,
    0 0;
  background-size:
    0.65em auto,
    100%;
}
#cleanroom[data-chosen='chosen'] {
  color: #505c59;
}
</style>
