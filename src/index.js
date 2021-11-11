import Vue from 'vue'
import Example from './example.vue'

const app = new Vue({
    el: '#app',
    components: {
        Example,
    },
    template: "<example/>",
})
