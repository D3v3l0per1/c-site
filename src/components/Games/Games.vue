<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 class="text-xs-center text-sm-left">
        <h1 class="primary--text">All Games</h1>
      </v-flex>
      <v-flex xs12 sm2 class="text-xs-center text-sm-right mb-2" v-if="userIsAuthenticated">
        <v-btn class="red" to="/games/new">Add Game</v-btn>
      </v-flex>
      <v-flex xs12>
        <hr class="primary">
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="text-xs-center mt-4">
        <v-progress-circular indeterminate color="primary" size="50" v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!loading">
      <v-flex xs12 sm4 lg3 class="pt-2 pr-2 pb-2 pl-2" v-for="game in games" :key="game.id">
        <v-card>
          <v-card-media :src="game.imageUrl" height="200px"></v-card-media>
          <v-card-title>
            <div>
              <h2>{{ game.title }}</h2>
              <p>{{ game.date | date }}</p>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat class="red--text" :to="'games/' + game.id">
              View
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    games () {
      return this.$store.getters.loadedGames
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
