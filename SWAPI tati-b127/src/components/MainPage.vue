<template>
  <main class="main">
    <div class="wrapper main__wrapper">
      <CardPerson :index="0"></CardPerson>
      <CardPerson :index="1"></CardPerson>
    </div>
    <button @click="showResult">{{ isShowResults ? 'Hide results' : 'Show results' }}</button>

    <ResultGame v-show="isShowResults"></ResultGame>
  </main>
</template>
<script>
import CardPerson from './CardPerson.vue'
import ResultGame from './ResultGame.vue'
import { useGameStore } from '@/stores/gameStore'
import { ref } from 'vue'

export default {
  components: {
    CardPerson,
    ResultGame
  },
  onBeforeMounted: () => {
    getAllPersons()
  },
  setup() {
    const game = useGameStore()
    const isShowResults = ref(false)

    const getAllPersons = async () => {
      await game.getAllPersons()
    }
    const showResult = () => {
      isShowResults.value = !isShowResults.value
    }

    return {
      getAllPersons,
      isShowResults,
      showResult
    }
  }
}
</script>
<style>
.main__wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 80px;
}
</style>
