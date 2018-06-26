import * as firebase from 'firebase'

export default {
  state: {
    loadedGames: [
      {
        imageUrl: 'http://www.guoguiyan.com/data/out/160/68435293-random-wallpapers.png',
        id: 'eb45ibegie4b',
        title: 'The Test Post 1',
        date: new Date(),
        genre: 'Adventure or so',
        description: 'lorem ipsum dlolrosn lseb lubseaolirfdsfgsdfg kjusdv uasdvf u asd fouasvf iadsörgasldifgalidsufgioagoliaghf 834g3  '
      },
      {
        imageUrl: 'https://404store.com/2017/12/08/random-pic-14.jpg',
        id: 'izv43izfuvds',
        title: 'The Post 2',
        date: new Date(),
        genre: 'Lolsai iausdbf jaa dsj',
        description: 'lorem ipsum dlolrosn lseb lubseaolirf  ouafszgkuw434'
      }
    ]
  },
  mutations: {
    setLoadedGames (state, payload) {
      state.loadedGames = payload
    },
    createGame (state, payload) {
      state.loadedGames.push(payload)
    },
    updateGame (state, payload) {
      const game = state.loadedGames.find(game => {
        return game.id === payload.id
      })
      if (payload.title) {
        game.title = payload.title
      }
      if (payload.description) {
        game.description = payload.description
      }
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
            genre: obj[key].genre,
            description: obj[key].description,
            imageUrl: obj[key].imageUrl,
            date: obj[key].date,
            creatorId: obj[key].creatorId
          })
          console.log(obj.key)
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
        genre: payload.genre,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      // let imageUrl
      // let key
      firebase.database().ref('games').push(game)
      .then((data) => {
        const key = data.key
        commit('createGame', {
          ...game,
          id: key
        })
        // return key
      })
      // .then(key => {
      //   const filename = payload.image.name
      //   const ext = filename.slice(filename.lastIndexOf('.'))
      //   return firebase.storage().ref('games/' + key + '.' + ext).put(payload.image)
      // })
      // .then(fileData => {
      //   imageUrl = fileData.metadata.downloadURLs[0]
      //   return firebase.database().ref('games').child(key).update({imageUrl: imageUrl})
      // })
      // .then(() => {
      //   commit('createGame', {
      //     ...game,
      //     imageUrl: imageUrl,
      //     id: key
      //   })
      // })
      .catch((error) => {
        console.log(error)
      })
    },
    updateGameData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      firebase.database().ref('games').child(payload.id).update(updateObj)
      .then(() => {
        commit('setLoading', false)
        commit('updateGame', payload)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
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
            follows: [],
            fbKeys: {}
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
    latestUncrackedGames (state, getters) {
      return getters.loadedGames.slice(0, 4)
    },
    latestCrackedGames (state, getters) {
      return getters.loadedGames.slice(0, 4)
    },
    latestUpComingGames (state, getters) {
      return getters.loadedGames.slice(0, 4)
    },
    loadedGame (state) {
      return (gameId) => {
        return state.loadedGames.find((game) => {
          return game.id === gameId
        })
      }
    }
  }
}
