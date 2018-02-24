
import Cookies from 'js-cookie';

const server = {
  state: {
    serverList: ['noserver'],
    baseUrl: Cookies.get('server_base_url') === 'prod' ? 'prod' : 'dev',
    profile: ''
    // livenewsChannels: Cookies.get('livenewsChannels') || '[]'
  },
  mutations: {
    UPDATE_SERVER_LIST: (state, list) => {
      // Vue.set(state, 'serverList', list)
      state.serverList = list
    },
    SET_SERVER_BASE_URL: (state, url) => {
      state.baseUrl = url
      Cookies.set('server_base_url', url);
    },
    SET_PROFILE: (state, profile) => {
      state.profile = profile
    }
  },
  actions: {
    UpdateServerList: ({ commit }, serverList) => {
      commit('UPDATE_SERVER_LIST', serverList)
    },
    SetBaseUrl: ({ commit }, url) => {
      commit('SET_SERVER_BASE_URL', url)
    },
    SetProfile: ({ commit }, profile) => {
      commit('SET_PROFILE', profile)
    }
  }
};

export default server;
