import Vue from 'vue'
import MainComponent from './main.vue'

const app = new Vue({
    el: '#app',
    components: {
        MainComponent,
    },
    template: "<main-component/>",
})
