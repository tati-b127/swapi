<template>
  <li class="results__item">
    <span class="results__name">{{ winner.name }}</span>
    <span class="results__value">{{ winner.mass }}</span>
    <span class="results__name">{{ loser.name }}</span>
    <span class="results__value">{{ loser.mass }}</span>
  </li>
</template>
<script setup lang="ts">
import type { Results } from '../types/results'
const props = defineProps<{
  result: Results
}>()
const winner = props.result.winner
const loser = props.result.loser
</script>
<style>
.results__name {
  font-size: 2em;
  font-weight: bold;
}
.results__value {
  font-size: 2em;
}
</style>
