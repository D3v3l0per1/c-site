<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <v-card>
          <v-card-media :src="imageUrl" height="200px"></v-card-media>
          <v-card-text>
            <h2 class="primary--text">Profile Page</h2>
            <hr class="primary">
            <p>{{ user.id }}</p>
            <!-- <p>{{ user.username }}</p>
            <p>{{ user.firstname }}</p>
            <p>{{ user.lastname }}</p>
            <p>{{ user.birth }}</p> -->
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      imageUrl: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>
