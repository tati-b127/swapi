<template>
  <div class="results">
    <ul class="results__list">
      <li class="results__item results__item-header">
        <span>Winner</span>
        <span>Mass</span>
        <span>Loser</span>
        <span>Mass</span>
      </li>
      <ResultItem v-for="result in results" :key="result" :result="result"></ResultItem>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ResultItem from './ResultItem.vue'
import { useGameStore } from '../stores/gameStore'
import { storeToRefs } from 'pinia'

const game = useGameStore()
const { results } = storeToRefs(game)
</script>
<style lang="scss">
.results {
  border: 4px solid var(--main-color);
  border-radius: 16px;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  margin-top: 60px;
  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  &__item {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    border-bottom: 1px solid var(--main-color);
    padding: 10px;
    &-header {
      background: var(--main-color);
      color: #fff;
      font-size: 2em;
      font-weight: bold;
    }
  }
}
</style>
