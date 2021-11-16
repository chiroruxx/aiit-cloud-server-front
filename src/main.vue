<template>
  <div>
    <p>
      {{ realtimeText }}
    </p>
  </div>
</template>

<script>
import axios from "axios";

const endpoint = 'https://group5.a2136km.com/origin/record.txt'

export default {
  data: () => ({
    realtimeText: ''
  }),

  mounted() {
    axios.get(endpoint)
        .then(response => (this.realtimeText = response.data))

    setInterval(() => {
      axios.get(endpoint)
          .then(response => (this.realtimeText = response.data))
    }, 3 * 1000)
  }
}
</script>
