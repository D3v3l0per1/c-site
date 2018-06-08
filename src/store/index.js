import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedGames: [
      {
        imageUrl: 'http://www.guoguiyan.com/data/out/160/68435293-random-wallpapers.png',
        id: 'eb45ibegie4b',
        title: 'The Test Post 1',
        date: new Date(),
        tag: 'Adventure or so',
        description: 'lorem ipsum dlolrosn lseb lubseaolirfdsfgsdfg kjusdv uasdvf u asd fouasvf iadsörgasldifgalidsufgioagoliaghf 834g3  '
      },
      {
        imageUrl: 'https://404store.com/2017/12/08/random-pic-14.jpg',
        id: 'izv43izfuvds',
        title: 'The Post 2',
        date: new Date(),
        tag: 'Lolsai iausdbf jaa dsj',
        description: 'lorem ipsum dlolrosn lseb lubseaolirf  ouafszgkuw434'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedGames (state, payload) {
      state.loadedGames = payload
    },
    createGame (state, payload) {
      state.loadedGames.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadGames ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('games').once('value')
      .then((data) => {
        const games = []
        const obj = data.val()
        for (let key in obj) {
          games.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            imageUrl: obj[key].imageUrl,
            date: obj[key].date,
            creatorId: obj[key].creatorId
          })
        }
        commit('setLoadedGames', games)
        commit('setLoading', false)
      })
      .catch(
        (error) => {
          console.log(error)
          commit('setLoading', true)
        }
      )
    },
    createGame ({commit, getters}, payload) {
      const game = {
        title: payload.title,
        tag: payload.tag,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      firebase.database().ref('games').push(game)
      .then((data) => {
        const key = data.key
        commit('createGame', {
          ...game,
          id: key
        })
      })
      .catch((error) => {
        console.log(error)
      })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            likes: []
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          // console.log(error.message)
        }
      )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            likes: []
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          // console.log(error.message)
        }
      )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, likes: []})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedGames (state) {
      return state.loadedGames.sort((gameA, gameB) => {
        return gameA.date > gameB.date
      })
    },
    featuredGames (state, getters) {
      return getters.loadedGames.slice(0, 5)
    },
    loadedGame (state) {
      return (gameId) => {
        return state.loadedGames.find((game) => {
          return game.id === gameId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
