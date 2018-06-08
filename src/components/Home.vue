<template>
  <v-container>
    
    <!-- Home Buttons -->
    <v-layout row wrap class="mb-3">
      <v-flex xs12 sm4 class="text-xs-center text-sm-right">
        <v-btn large router to="/games" class="primary">Explore Games</v-btn>
      </v-flex>
      <v-flex xs12 sm4 class="text-xs-center">
        <v-btn large router to="/software" class="primary">Explore Software</v-btn>
      </v-flex>
      <v-flex xs12 sm4 class="text-xs-center text-sm-left">
        <v-btn large router to="/movies" class="primary">Explore Movies</v-btn>
      </v-flex>
    </v-layout>

    <!-- Slider -->
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="primary" size="50" v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!loading">
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item v-for="game in games" :src="game.imageUrl" :key="game.id" @click.native="onLoadGame(game.id)">
            <div class="title">
              {{ game.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    games () {
      return this.$store.getters.featuredGames
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onLoadGame (id) {
      this.$router.push('/games/' + id)
    }
  }
}
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>
