import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

let app

const initialize = () => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
    
  }
}
firebase.auth().onAuthStateChanged(user => {
  if(user) {
    store.commit('setCurrentUser', user)
  }
  else{
    store.commit('setCurrentUser', null)
  }
  initialize()
 })