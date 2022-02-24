<template>
  <v-container fluid>
    <v-btn type="primary" @click="$router.push({name: 'Home'})">
      Go Home
    </v-btn>
    <template v-if="allForks.length">
      <v-row>
        <v-col cols="12">
          <p class="mt-8">
            {{$route.query.repository}}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col col="9">
          <v-data-table
              ref="table"
              :headers="headers"
              :items="allForks"
              item-key="name"
              class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn
                  icon
                  :color="item.favorite ? 'pink' : ''"
                  @click="save(item)"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="3">
          <template v-if="favorites.length">
            <v-slide-x-transition :group="true">
              <v-row
                  v-for="item in favorites"
                  :key="item.id"
              >
                <v-col>
                  <v-card>
                    <v-card-text>
                      <b>Owner:</b> {{item.owner}}<br/>
                      <b>Url:</b> <a :href="item.url" target="_blank">{{item.url}}</a>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-slide-x-transition>
          </template>
          <template v-else>
            <p>No favorites</p>
          </template>
        </v-col>
      </v-row>
      <v-row>
        <v-col col="12">
          <div class="text-center">
            <v-pagination
                v-model="page"
                :length="forksCount"
                :total-visible="5"
            ></v-pagination>
          </div>
        </v-col>
      </v-row>
    </template>
    <template v-else-if="loading">
      <div class="text-center">
        <v-progress-circular
            :size="100"
            color="primary"
            indeterminate
        ></v-progress-circular>
      </div>

    </template>
    <template v-else>
      <p class="text-center text-h1 mt-16">No Data</p>
    </template>
  </v-container>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'Forks',
  data() {
    return {
      page: +this.$route.query.page || 1,
      favorites: JSON.parse(localStorage.getItem('favorites')) || []
    }
  },
  watch: {
    "$route": {
      immediate: true,
      handler() {
        this.getForks({text: this.$route.query.repository, page: this.page})
      }
    },
    page(val) {
      this.$router.replace({query: {page: val, repository: this.$route.query.repository}})
    }

  },
  computed: {
    ...mapState(['allForks', 'loading', 'forksCount']),
    headers () {
      return [
        { text: 'Repository', value: 'repo', sortable: false},
        { text: 'Owner', value: 'owner'},
        { text: 'Stars', value: 'stars' },
        { text: 'Fork Url', value: 'url' },
        { text: 'Actions', value: 'actions', sortable: false}
      ]
    },
  },
  methods: {
    ...mapActions(['getForks']),
    save(item) {
      if (item.favorite) {
        item.favorite = false
        let data = JSON.parse(localStorage.getItem('favorites'))
        let newData = data.filter(el => el.id !== item.id)
        localStorage.setItem('favorites', JSON.stringify(newData))
      } else {
        item.favorite = true
        let data = JSON.parse(localStorage.getItem('favorites')) || []
        data.push(item)
        localStorage.setItem('favorites', JSON.stringify(data))
      }
      this.favorites = JSON.parse(localStorage.getItem('favorites')) || []
    }
  }
}
</script>