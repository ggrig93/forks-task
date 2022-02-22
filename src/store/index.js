import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const http = axios.create({
  baseURL: 'https://api.github.com',
  headers: {'Accept': 'application/vnd.github.v3+json'}
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allForks: [],
    loading: false
  },
  mutations: {
    setForks(state, data) {
      state.allForks = data
    },
    setLoading(state, data) {
      state.loading = data
    }
  },
  actions: {
    getForks({commit}, {text, page}) {
      commit('setLoading', true)
      http.get(`/repos/${text}/forks?page=${page}`)
        .then(res => {
          const data = res.data.map(el => ({
            id: el.id,
            repo: el.full_name,
            owner: el.owner.login,
            stars: el.stargazers_count,
            url: el.html_url ,
            favorite: JSON.parse(localStorage.getItem('favorites'))?.find(e => e.id === el.id) ? true : false
          }))
          commit('setForks', data)
        })
        .catch(e => {
          commit('setForks', [])
          console.log(e)
        })
          .then(() => commit('setLoading', false))
    }
  }
})
