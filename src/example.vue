<template>
  <div>
    <p>
      {{ realtimeText }}
    </p>
  </div>
</template>

<script>
import axios from "axios";

const endpoint = 'http://localhost:8080/test.txt'

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
