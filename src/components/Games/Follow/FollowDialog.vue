<template>
  <v-dialog persistent v-model="followDialog">
    <v-btn accent small slot="activator" class="mt-0 primary">
      {{ userIsFollowing ? 'Unfollow' : 'Follow' }}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout wrap row>
          <v-flex xs12>
            <v-card-title v-if="userIsFollowing"><h1 class="primary--text">Unfollow this Game</h1></v-card-title>
            <v-card-title v-else><h1 class="primary--text">Follow this Game</h1></v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout wrap row>
          <v-flex xs12>
            <v-card-text>You can always unfollow lol</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout wrap row>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="red--text darken-1" @click="followDialog = false">Chancel</v-btn>
              <v-btn flat class="green--text darken-1" @click="onFollow">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['gameId'],
    data () {
      return {
        followDialog: false
      }
    },
    computed: {
      userIsFollowing () {
        return this.$store.getters.user.follows.findIndex(gameId => {
          return gameId === this.gameId
        }) >= 0
      }
    },
    methods: {
      onFollow () {
        if (this.userIsFollowing) {
          this.$store.dispatch('unfollowUserFromGame', this.gameId)
        } else {
          this.$store.dispatch('UserfollowGame', this.gameId)
        }
      }
    }
  }
</script>
