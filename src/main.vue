<template>
  <div>
    <header class="header">
      <h1>Realtime Text</h1>
    </header>
    <div class="main">
      <form @submit="startTranscribe" class="form">
        <label>
          ZoomID:
          <input type="text" v-model="id">
        </label>
        <label>
          Zoomパスワード:
          <input type="text" v-model="password">
        </label>
        <input type="submit" value="書き起こし開始">
        <input type="button" value="書き起こし終了" @click="stopTranscribe">
      </form>
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
  </div>
</template>

<script>
import axios from "axios";

const endpoint = 'https://c0gm3sfkl4.execute-api.ap-northeast-1.amazonaws.com/apiv1'
// const endpoint = 'http://localhost:8080//response.json'

export default {
  data: () => ({
    textList: [],
    id: '',
    password: '',
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
    }, 1000)
  },
  computed: {
    startTranscribeUrl() {
      return `http://ec2-35-76-174-90.ap-northeast-1.compute.amazonaws.com:9999/transtart?confno=${this.id}&confpwd=${this.password}`
    },
    stopTranscribeUrl() {
      return 'http://ec2-35-76-174-90.ap-northeast-1.compute.amazonaws.com:9999/transtop'
    }
  },
  methods: {
    startTranscribe(e) {
      console.log(this.startTranscribeUrl)
      axios.get(this.startTranscribeUrl)
          .then(() => {
            console.log('start transcribe response is ok')
          })

      e.preventDefault()
    },
    stopTranscribe() {
      console.log(this.stopTranscribeUrl)
      axios.get(this.stopTranscribeUrl)
          .then(() => {
            console.log('stop transcribe response is ok')
          })
    },
  }
}
</script>

<style lang="scss">
.header {
  background-color: #eeb868;
  width: 100%;
  padding: 12px 4px;
}

.main {
  width: 80%;
  min-width: 640px;
  margin: 0 auto;
}

.form {
  margin: 2rem 0;
}

.container {
  display: grid;
  grid-template-columns: 50% auto;

  &__item {
    padding-left: 4px;
    padding-right: 4px;
  }
}

.text {
  white-space: pre-line;
}
</style>