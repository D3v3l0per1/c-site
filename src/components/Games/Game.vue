<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1 md8 offset-md2>
        <v-card>
          <v-card-title>
            <h1 class="primary--text">{{ game.title }}</h1>
          </v-card-title>
          <v-card-media :src="game.imageUrl" height="400px"></v-card-media>
          <v-card-text>
            <div>
              <p>{{ game.date | date }} - {{ game.tag }}</p> <!-- Some Tags/Genre -->
              <!-- <p>{{ game.description }}</p> -->
            </div>
          </v-card-text>
          <v-tabs fixed-tabs slider-color="red">
            <v-tab>Info</v-tab>
            <v-tab-item>
              <v-container>
                <p>London, 1918. You are newly-turned Vampyr Dr. Jonathan Reid. As a doctor, you must find a cure to save the city’s flu-ravaged citizens. As a Vampyr, you are cursed to feed on those you vowed to heal.
                <br><br>
                Will you embrace the monster within? Survive and fight against Vampyr hunters, undead skals, and other supernatural creatures. Use your unholy powers to manipulate and delve into the lives of those around you, to decide who will be your next victim. Struggle to live with your decisions… your actions will save or doom London.
                <br><br>
                BE THE VAMPYR – Fight and manipulate with supernatural abilities
                <br><br>
                FEED TO SURVIVE – Be the savior and the stalker
                <br><br>
                SHAPE LONDON – A web of interconnected citizens reacts to your decisions</p>
                <img src="https://i.imgur.com/f5WJc2n.jpg" alt="">
                <p>
                  Title: Vampyr <br>
                  Genre: Violent, Action, RPG <br>
                  Developer: “DONTNOD Entertainment” <br>
                  Publisher: “Focus Home Interactive” <br>
                  Release Date: 4 Jun, 2018 <br> <br>

                  Release Name : Vampyr-CODEX <br>
                  Size : 14 GB
                </p>
              </v-container>
            </v-tab-item>
            <v-tab>Download</v-tab>
            <v-tab-item>
              <v-container>
                <h3>Torrent</h3>
                <a href="#">Vampyr-CODEX.iso</a>
                <h3>MEGA.NZ</h3>
                <a href="#">Vampyr-CODEX.iso</a>
                <h3>MegaUp</h3>
                <a href="#">Vampyr-CODEX.iso</a>
                <h3>Mediafire</h3>
                <a href="#">Vampyr-CODEX.iso</a>
                <h3>Lol</h3>
                <a href="#">Vampyr-CODEX.iso</a>
              </v-container>
            </v-tab-item>
            <v-tab>System Requirements</v-tab>
            <v-tab-item>
              <v-container>
                <p>
                  Minimum: <br> <br>

                  Requires a 64-bit processor and operating system <br>
                  OS: Windows 7/8/10 (64 bits) <br>
                  Processor: Intel Core i3-2130 (3.4 GHz)/AMD FX-4100 (3.6 GHz) <br>
                  Memory: 8 GB RAM <br>
                  Graphics: 2 GB, GeForce GTX 1050 (Legacy GPU: GeForce GTX 660) / Radeon R7 370 <br>
                  Storage: 20 GB available space <br><br>
                  Recommended: <br> <br>

                  Requires a 64-bit processor and operating system <br>
                  OS: Windows 7/8/10 (64 bits) <br>
                  Processor: Intel Core i7-3930K (3.2 GHz)/AMD Ryzen 5 1600 (3.2 GHz) <br>
                  Memory: 16 GB RAM <br>
                  Graphics: 4 GB, GeForce GeForce GTX 970 / GTX 1060 / Radeon R9 390 <br>
                  Storage: 20 GB available space <br>
                </p>
              </v-container>
            </v-tab-item>
            <v-tab>Screenshots</v-tab>
            <v-tab-item>
              <v-container>
                <img src="https://i.imgur.com/LWkWzwR.jpg" alt="">
                <img src="https://i.imgur.com/O1QJm9M.jpg" alt="">
              </v-container>
            </v-tab-item>
            <v-tab>Trailer</v-tab>
            <v-tab-item>
              <v-container>
                <iframe width="100%" height="500px" src="https://www.youtube.com/embed/_0L8LbardIM" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
              </v-container>
            </v-tab-item>
            <v-tab>NFO</v-tab>
          </v-tabs>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    game () {
      return this.$store.getters.loadedGame(this.id)
    }
  }
}
</script>
