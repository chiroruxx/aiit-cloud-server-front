<template>
  <div>
    <p>
      {{ realtimeText }}
    </p>
  </div>
</template>

<script>
import axios from "axios";

const endpoint = 'http://aiit-group5-2021.s3-website-ap-northeast-1.amazonaws.com/origin/record.txt'

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
