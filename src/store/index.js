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
    forksCount: 1,
    loading: false
  },
  mutations: {
    setForks(state, data) {
      state.allForks = data
    },
    setForksCount(state, data) {
      state.forksCount = data
    },
    setLoading(state, data) {
      state.loading = data
    }
  },
  actions: {
    getForks({commit}, {text, page}) {
      console.log(page)
      commit('setLoading', true)
      http.get(`/search/repositories?q=${text}&page=${page}`)
        .then(res => {
          const data = res.data.items.map(el => ({
            id: el.id,
            repo: el.full_name,
            owner: el.owner.login,
            stars: el.stargazers_count,
            url: el.html_url ,
            favorite: JSON.parse(localStorage.getItem('favorites'))?.find(e => e.id === el.id) ? true : false
          }))
          commit('setForksCount', Math.ceil(res.data.total_count / 30))
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
