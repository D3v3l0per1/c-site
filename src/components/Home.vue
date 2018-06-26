<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 md10 offset-md1>

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
              <v-carousel-item v-for="game in featuredGames" :src="game.imageUrl" :key="game.id" @click.native="onLoadGame(game.id)">
                <div class="title">
                  {{ game.title }}
                </div>
              </v-carousel-item>
            </v-carousel>
          </v-flex>
        </v-layout>

        <!-- Latest Cracked Games -->
        <v-layout row wrap class="mt-3">
          <v-flex xs12 sm6 class="pr-2">
            <v-layout row wrap>
              <v-flex xs12>
                <h1 class="headline">Latest Cracked Games</h1>
                <v-divider class="mb-2"></v-divider>
              </v-flex>
              <v-flex xs12 class="text-xs-center">
                <v-progress-circular indeterminate color="primary" size="50" v-if="loading"></v-progress-circular>
              </v-flex>
              <v-flex xs12 md6 class="pt-1 pr-1 pb-1 pl-1" v-for="game in latestCrackedGames" :key="game.id" v-if="!loading">
                <v-card>
                  <v-card-media :src="game.imageUrl" height="150px" style="cursor: pointer;" @click.native="onLoadGame(game.id)"></v-card-media>
                  <!-- <v-card-title>
                    <div>
                      <h3 class="red--text">{{ game.title }}</h3>
                      <div>{{ game.date | date }}</div>
                    </div>
                  </v-card-title> -->
                  <v-card-text>
                    <div>
                      <p class="mb-0 subheading red--text" style="font-weight: 600">{{ game.title }}</p>
                    </div>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>

          <!-- Latest Uncracked Games -->
          <v-flex xs12 sm6 class="pr-2">
            <v-layout row wrap>
              <v-flex xs12>
                <h1 class="headline">Latest Uncracked Games</h1>
                <v-divider class="mb-2"></v-divider>
              </v-flex>
              <v-flex xs12 class="text-xs-center">
                <v-progress-circular indeterminate color="primary" size="50" v-if="loading"></v-progress-circular>
              </v-flex>
              <v-flex xs12 md6 class="pt-1 pr-1 pb-1 pl-1" v-for="game in latestUncrackedGames" :key="game.id" v-if="!loading">
                <v-card>
                  <v-card-media :src="game.imageUrl" height="150px" style="cursor: pointer;" @click.native="onLoadGame(game.id)"></v-card-media>
                  <!-- <v-card-title>
                    <div>
                      <h3 class="red--text">{{ game.title }}</h3>
                      <div>{{ game.date | date }}</div>
                      
                    </div>
                  </v-card-title> -->
                  <v-card-text>
                    <div>
                      <p class="mb-0 subheading red--text" style="font-weight: 600">{{ game.title }}</p>
                    </div>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>

          <!-- Upcoming Games -->
          <v-flex xs12 class="mt-3">
            <v-layout row wrap>
              <v-flex xs12>
                <h1 class="headline">Upcoming Games</h1>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12>
                <v-layout row wrap>
                  <v-flex xs12 class="text-xs-center">
                    <v-progress-circular indeterminate color="primary" size="50" v-if="loading"></v-progress-circular>
                  </v-flex>
                  <v-flex xs12 sm3 class="pt-1 pr-1 pb-1 pl-1" v-for="game in latestUpComingGames" :key="game.id" v-if="!loading">
                    <v-card>
                      <v-card-media :src="game.imageUrl" height="150px"></v-card-media>
                      <v-card-text>
                        <div>
                          <p class="mb-0 subheading red--text" style="font-weight: 600">{{ game.title }}</p>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>

        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    featuredGames () {
      return this.$store.getters.featuredGames
    },
    latestCrackedGames () {
      return this.$store.getters.latestCrackedGames
    },
    latestUncrackedGames () {
      return this.$store.getters.latestUncrackedGames
    },
    latestUpComingGames () {
      return this.$store.getters.latestUpComingGames
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
