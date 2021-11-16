<template>
  <div>
    <header class="header">
      <h1>Realtime Text</h1>
    </header>
    <div class="container">
      <div class="container__item">
        <p class="text">
          {{ realtimeOriginText }}
        </p>
      </div>
      <div class="container__item">
        <p class="text">
          {{ realtimeTranslatedText }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const originEndpoint = 'https://group5.a2136km.com/origin/record.txt'
const translatedEndpoint = 'https://group5.a2136km.com/translated/record.txt'
// const originEndpoint = 'http://localhost:8080/origin/test.txt'
// const translatedEndpoint = 'http://localhost:8080/translated/test.txt'

export default {
  data: () => ({
    realtimeOriginText: '',
    realtimeTranslatedText: '',
  }),

  mounted() {
    axios.get(originEndpoint)
        .then(response => (this.realtimeOriginText = response.data))
    axios.get(translatedEndpoint)
        .then(response => (this.realtimeTranslatedText = response.data))

    setInterval(() => {
      axios.get(originEndpoint)
          .then(response => (this.realtimeOriginText = response.data))
      axios.get(translatedEndpoint)
          .then(response => (this.realtimeTranslatedText = response.data))
    }, 3 * 1000)
  }
}
</script>

<style lang="scss">
.header {
  background-color: #eeb868;
  width: 100%;
  padding: 12px 4px;
}

.container {
  display: flex;
  justify-content: space-between;
  width: 80%;
  min-width: 640px;
  margin: 0 auto;

  &__item {
    flex-basis: 50%;
    padding-left: 4px;
    padding-right: 4px;
  }
}

.text {
  white-space: pre-line;
}
</style>