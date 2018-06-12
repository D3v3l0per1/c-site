import Vue from 'vue'
import Vuex from 'vuex'

import game from './games'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    games: game,
    user: user,
    shared: shared
  }
})
