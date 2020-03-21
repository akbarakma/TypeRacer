import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const baseUrl = 'http://localhost:3000';
export default new Vuex.Store({
  state: {
    quote: '',
  },
  mutations: {
    getQuote(state, data) {
      state.quote = data;
    },
  },
  actions: {
    getQuote(context) {
      axios({
        method: 'GET',
        url: `${baseUrl}/quotes`,
      })
        .then(({ data }) => {
          context.commit('getQuote', data);
        }).catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {
  },
});
