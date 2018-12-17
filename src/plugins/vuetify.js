import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#7299b1',
    success: '#96b19c',
    info: '#ffaa2c',
    error: '#f83e70'
  }
})
// overriden default colors

