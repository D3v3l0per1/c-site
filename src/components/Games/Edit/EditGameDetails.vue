<template>
  <v-dialog width="500px" persistent v-model="editDialog">
    <v-btn fab accent slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout wrap row>
          <v-flex xs12>
            <v-card-title><h1 class="primary--text">Edit Game Details</h1></v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout wrap row>
          <v-flex xs12>
            <v-card-text>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field name="title" label="Title" id="title" v-model="editedTitle" required></v-text-field>
                  <v-text-field name="description" label="Description" id="description" v-model="editedDescription" multi-line required></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat class="blue--text darken-1" @click="editDialog = false">Close</v-btn>
              <v-btn flat class="blue--text darken-1" @click="onSaveChanges">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['game'],
  data () {
    return {
      editDialog: false,
      editedTitle: this.game.title,
      editedDescription: this.game.description
    }
  },
  methods: {
    onSaveChanges () {
      if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
        return
      }
      this.editDialog = false
      this.$store.dispatch('updateGameData', {
        id: this.game.id,
        title: this.editedTitle,
        description: this.editedDescription
      })
    }
  }
}
</script>
