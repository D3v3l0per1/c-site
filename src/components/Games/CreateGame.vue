<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="primary--text">Insert a new Game</h1>
        <hr class="primary">
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateGame">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="title" label="Title" id="title" v-model="title" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="tag" label="Tags" id="tag" v-model="tag" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="imageUrl" label="Image URL" id="imageUrl" v-model="imageUrl" required></v-text-field>
            </v-flex>
          </v-layout>
          <!-- <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" @click="onPickFile">Upload Image</v-btn>
              <input type="file" style="display:none;" ref="fileInput" accept="image/*" @change="onFilePicked">
            </v-flex>
          </v-layout> -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" width="100%" alt="">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="description" label="Description" id="description" v-model="description" multi-line required></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" :disabled="!formIsValid" type="submit">Add Game</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      tag: '',
      imageUrl: '',
      description: '',
      date: new Date(),
      time: new Date()
      // image: null
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' && this.tag !== '' && this.imageUrl !== '' && this.description !== ''
    },
    submittableDateTime () {
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        let hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      return date
    }
  },
  methods: {
    onCreateGame () {
      if (!this.formIsValid) {
        return
      }
      // if (!this.image) {
      //   return
      // }
      const gameData = {
        title: this.title,
        tag: this.tag,
        imageUrl: this.imageUrl,
        // image: this.image,
        description: this.description,
        date: this.submittableDateTime
      }
      this.$store.dispatch('createGame', gameData)
      this.$router.push('/games')
    }
    // onPickFile () {
    //   this.$refs.fileInput.click()
    // },
    // onFilePicked (event) {
    //   const files = event.target.files
    //   let filename = files[0].name
    //   if (filename.lastIndexOf('.') <= 0) {
    //     return alert('Please add a valid file...')
    //   }
    //   const fileReader = new FileReader()
    //   fileReader.addEventListener('load', () => {
    //     this.imageUrl = fileReader.result
    //   })
    //   fileReader.readAsDataURL(files[0])
    //   this.image = files[0]
    // }
  }
}
</script>
