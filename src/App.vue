<template>
  <v-app dark>

    <v-navigation-drawer v-model="sideNav" temporary fixed>
      <v-list>
        <v-list-tile v-for="item in NavMenuItems" :key="item.title">
          <v-list-tile-action>
            <v-icon>supervisor_account</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content @click="onLogout">Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dense>
      <v-toolbar-side-icon @click.native="sideNav = !sideNav" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">CrackBros</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="item in NavMenuItems" :key="item.title" :to="item.link">{{ item.title }}</v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    
    <main>
      <router-view></router-view>
    </main>

    <v-footer class="pa-3">
      <div>Crack Bros</div>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false
    }
  },
  computed: {
    NavMenuItems () {
      let NavMenuItems = [
        { icon: '', title: 'Games', link: '/games' },
        { icon: '', title: 'Software', link: '/software' },
        { icon: '', title: 'Movies', link: '/movies' },
        { icon: '', title: 'Sign In', link: '/signin' },
        { icon: '', title: 'Sign Up', link: '/signup' }
      ]
      if (this.userIsAuthenticated) {
        NavMenuItems = [
          { icon: '', title: 'Games', link: '/games' },
          { icon: '', title: 'Software', link: '/software' },
          { icon: '', title: 'Movies', link: '/movies' },
          { icon: '', title: 'Profile', link: '/profile' }
        ]
      }
      return NavMenuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  },
  name: 'App'
}
</script>
