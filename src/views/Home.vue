<template>
  <v-container>
    <h1>Welcome Our Search Page</h1>
    <v-form @submit.prevent="search" class="mt-10">
      <v-row>
        <v-col cols="10">
          <v-text-field
              label="owner/repository name"
              v-model.lazy="text"
              @input="error = false"
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn type="primary">
            Search
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-scale-transition>
      <div v-if="error">
        <p class="text-center red--text text-h1 mt-16">Incorrect Input</p>
        <p class="text-center mt-8 text-h4">Input must be <code>octocat/hello-world</code> like this!</p>
      </div>
    </v-scale-transition>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        text: '',
        error: false
      }
    },
    methods: {
      search() {
        if (this.text.includes('/')) {
          this.$router.push({
            name: 'Forks',
            query: {
              page: 1,
              owner: this.text.split('/')[0],
              repository: this.text.split('/')[1]
            }
          })
          this.error = false
        } else {
         this.error = true
        }
      }
    }
  }
</script>
