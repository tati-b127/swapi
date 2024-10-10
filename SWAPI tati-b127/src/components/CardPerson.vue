<template>
  <div class="card">
    <div class="card__info" v-if="person">
      <h3 class="card__title">{{ person.name }}</h3>
      <p class="card__text card__text-mt"><span>Height</span> {{ person.height }}</p>
      <p class="card__text"><span>Mass</span> {{ person.mass }}</p>
      <div class="card__result-block">
        <div class="card__result" v-if="person.winner === 'winner'">Winner 🏆</div>
        <div class="card__result" v-if="person.winner === 'loser'">Loser 😢</div>
        <div class="card__result" v-if="person.winner === 'tie'">Tie 🤝</div>
      </div>
    </div>
    <div v-else>
      <div class="card__arrow"></div>
      <p class="card__result_start">PUSH TO START</p>
    </div>
    <button class="card__button" @click="play">Play</button>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '../stores/gameStore'
import { computed } from 'vue'

const props = defineProps({ index: Number })
const gameStore = useGameStore()

const play = async () => {
  await gameStore.getRandomPerson(props.index)
  gameStore.getWinner
  gameStore.recordResult()
}
const person = computed(() => {
  return gameStore.getPerson(props.index)
})
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 400px;
  border: 4px solid var(--main-color);
  border-radius: 20px;
  text-align: center;
  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding: 20px;
  }
  &__button {
    margin-top: auto;
  }
  &__title {
    font-size: 2em;
    font-weight: bold;
  }
  &__text {
    font-size: 1.5em;
    &-mt {
      margin-top: auto;
    }
    span {
      color: #ff8a05;
    }
  }
  &__result {
    font-size: 2em;
    font-weight: bold;
    &-block {
      margin-top: auto;
    }
  }
  &__result_start {
    font-size: 2em;
    color: var(--main-color);
    // position: absolute;
    // top: 50%;
  }
  &__arrow {
    position: relative;
    width: 60px;
    height: 60px;
    margin: 30px auto 60px auto;
    &:before,
    &:after {
      content: '';
      position: absolute;
      box-sizing: border-box;
      left: 0;
      width: 100%;
      height: 100%;
      border-left: 18px solid var(--main-color);
      border-bottom: 18px solid var(--main-color);
      animation: arrow-8 3s linear infinite;
    }
    &:after {
      animation: arrow-8 3s linear infinite -1.5s;
    }
  }
}
@keyframes arrow-8 {
  0% {
    opacity: 0;
    transform: translate(0, -53px) rotate(-45deg);
  }
  10%,
  90% {
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform: translate(0, 0) rotate(-45deg);
  }
  100% {
    opacity: 0;
    transform: translate(0, 53px) rotate(-45deg);
  }
}
</style>
