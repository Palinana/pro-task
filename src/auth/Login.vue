<template>

    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
                
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" v-model="email" name="email" required :error-messages="emailErrors" label="E-mail" type="text"  @input="$v.email.$touch()"
      @blur="$v.email.$touch()"></v-text-field>
                  <v-text-field id="password" v-model="password" prepend-icon="lock" name="password" label="Password" type="password" required :error-messages="passwordErrors" @input="$v.password.$touch()"
      @blur="$v.password.$touch()"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

</template>

<script>
    import firebase from 'firebase'
    import store from '@/store'
    import { validationMixin } from 'vuelidate'
    import { required, maxLength, email } from 'vuelidate/lib/validators'

    export default {
        mixins: [validationMixin],
        validations: {
            email: { required, email },
            password: { required, maxLength: maxLength(20) }, 
        },
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {

            login() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                  .then((user) => {
                    store.commit('setCurrentUser', user);
                    this.$router.push('/dashboard')
                  })
                  .catch(() => {
                        this.$router.push('/')
                  })
            }
        },
        computed: {
            emailErrors () {
              const errors = []
              if (!this.$v.email.$dirty) return errors
              !this.$v.email.email && errors.push('Must be valid e-mail')
              !this.$v.email.required && errors.push('E-mail is required')
              return errors
            },
            passwordErrors () {
              const errors = []
              if (!this.$v.password.$dirty) return errors
              !this.$v.password.maxLength && errors.push('Password must be at most 20 characters long')
              !this.$v.password.required && errors.push('Password is required.')
              return errors
            }
        }
    }
</script>
