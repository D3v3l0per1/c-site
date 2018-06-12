<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent='onsignUp'>
                <v-layout row wrap>
                  <v-flex xs12 class="mb-4">
                    <h1 class="primary--text headline">Sign Up </h1>
                    <hr class="primary">
                  </v-flex>
                  <v-flex xs12>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-text-field name='username' label='Username' id='username' v-model='username' type='input' autocomplete="off" required></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field name='email' label='Email' id='email' v-model='email' type='email' required></v-text-field>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field name='confirmEmail' label='Confirm Email' id='confirmEmail' v-model='confirmEmail' autocomplete="off" type='email' :rules="[compareEmails]"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name='password' label='Password' id='password' v-model='password' type='password' autocomplete="off" required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name='confirmPassword' label='Confirm Password' id='confirmPassword' v-model='confirmPassword' type='password' autocomplete="off" :rules='[comparePasswords]'></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type='submit' :loading="loading" :disabled="loading">
                      Sign Up
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
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
      username: '',
      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords doesn\'t match' : ''
    },
    compareEmails () {
      return this.email !== this.confirmEmail ? 'Emails doesn\'t match' : ''
    },
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onsignUp () {
      this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
    },
    onDismissed () {
      // console.log('Dismissed Alert')
      this.$store.dispatch('clearError')
    }
  }
}
</script>
