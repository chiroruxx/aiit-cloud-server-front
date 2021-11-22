<template>
  <div>
    <header class="header">
      <h1>Realtime Text</h1>
    </header>
    <div class="container">
      <template v-for="text in textList">
        <div class="container__item">
          <p class="text">
            {{ text.origin }}
          </p>
        </div>
        <div class="container__item">
          <p class="text">
            {{ text.translated }}
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const endpoint = 'https://c0gm3sfkl4.execute-api.ap-northeast-1.amazonaws.com/apiv1'
// const endpoint = 'http://localhost:8080//response.json'

export default {
  data: () => ({
    textList: [],
  }),

  mounted() {
    axios.get(endpoint)
        .then(response => {
          this.textList = (response.data?.body || [])
              .sort((one, another) => one.date - another.date)
              .map(item => ({
                origin: item.origin,
                translated: item.translated
              }))
        })

    setInterval(() => {
      axios.get(endpoint)
          .then(response => {
            this.textList = (response.data?.body || [])
                .sort((one, another) => one.date - another.date)
                .map(item => ({
                  origin: item.origin,
                  translated: item.translated
                }))
          })
    }, 1 * 1000)
  },
}
</script>

<style lang="scss">
.header {
  background-color: #eeb868;
  width: 100%;
  padding: 12px 4px;
}

.container {
  display: grid;
  grid-template-columns: 50% auto;
  width: 80%;
  min-width: 640px;
  margin: 0 auto;

  &__item {
    padding-left: 4px;
    padding-right: 4px;
  }
}

.text {
  white-space: pre-line;
}
</style>