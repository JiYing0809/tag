import Vue from 'vue';
import Vuex from 'vuex';
import app from 'libs/store/modules/app';
import server from 'libs/store/modules/server'
import user from 'libs/store/modules/user'
// import permission from './modules/permission';
import getters from './getters';



Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    server,
    user
    // permission
  },
  getters,
  strict: process.env.NODE_ENV !== 'production'
});

export default store
