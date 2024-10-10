<template>
  <div>
    <header class="header">
      <h1 class="header__title">STAR WARS</h1>
      <p class="header__text">Mass Battle</p>
    </header>
    <main-page></main-page>
  </div>
</template>
<script setup lang="ts">
import MainPage from './components/MainPage.vue'
</script>
<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
  position: relative;
  &__title {
    font-size: 4em;
    font-weight: bold;
    text-align: center;
  }
  &__text {
    position: absolute;
    top: -7px;
    font-size: 2em;
    text-transform: uppercase;
    font-weight: bold;
    color: var(--main-color);
    letter-spacing: 6px;
    text-align: center;
  }
}
</style>
