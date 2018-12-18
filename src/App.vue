<template>

  <v-app v-if="!currentUser" class="grey lighten-4"> 
    <v-content class="mx-4 mb-4">
      <v-toolbar flat app>
        <v-toolbar-title class="text-uppercase grey--text">
            <span class="font-weight-light">Pro</span>
            <span>Task</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat v-for="(menu, index) in menus" :key="index" router :to="menu.route">{{menu.name}}</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <router-view></router-view>
    </v-content>

  </v-app>

  <v-app v-else class="grey lighten-4"> 
    <Navbar />
    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
  </v-app>

  
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: { Navbar }, 
  data () {
      return {
        title: 'protask',
        isLogin: false,
        menus: [
          { name: 'Login', route: '/'},
          { name: 'Sign Up', route: '/sign-up'}
        ]
      }
    },
    computed: {
        currentUser() {
            return this.$store.state.currentUser
        }
    }

}
</script>
