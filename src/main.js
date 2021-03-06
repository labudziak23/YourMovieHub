import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import vuetify from './plugins/vuetify'
import { store } from './store'


Vue.config.productionTip = false

new Vue({
  el: '#app',
  data: {color: '#000000'},
  store,
  router,
  vuetify,

  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDe-6wqg9jpmNcgaLBs-sNaQKR9I8m37XA',
      authDomain: 'youmoviehub.firebaseapp.com',
      databaseURL: 'https://youmoviehub.firebaseio.com',
      projectId: 'youmoviehub',
      storageBucket: 'youmoviehub.appspot.com'

    })

    this.$store.dispatch('loadCommentsForMovie')
    this.$store.dispatch('loadRatings')
  }
}).$mount('#app')
