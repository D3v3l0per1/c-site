// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import { store } from './store'
import DateFilter from './filters/date'
import 'vuetify/dist/vuetify.min.css'
import AlertCmp from './components/Shared/Alert'
import EditGameCmp from './components/Games/Edit/EditGameDetails'
import FollowGame from './components/Games/Follow/FollowDialog'

Vue.use(Vuetify, {
  theme: {
    primary: '#C62828',
    secondary: '#E53935',
    accent: '#0097A7',
    error: '#f44336',
    warning: '#ffeb3b',
    info: '#2196f3',
    success: '#4caf50'
  }
})

Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-game-details', EditGameCmp)
Vue.component('app-follow-game', FollowGame)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDpdkwTahiLZQJ38uWQXx4RrHZ7Zy89qDg',
      authDomain: 'crackbros-95873.firebaseapp.com',
      databaseURL: 'https://crackbros-95873.firebaseio.com',
      projectId: 'crackbros-95873',
      storageBucket: 'gs://crackbros-95873.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadGames')
  }
})
