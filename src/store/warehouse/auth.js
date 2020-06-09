import axios from 'axios';
// import router from '../../router'

const state = {
  token: localStorage.getItem('token') || '',
  user: {},
  status: ''
};

const getters = {
  isLoggedIn: state => !!state.token,
  authState: state => state.status,
  user: state => state.user
}

const actions = {
  async login({ commit }, user) {
    commit('AUTH_REQUEST')
    let res = await axios.post('http://localhost:5000/api/users/login', user)
    if (res.data.success) {
      const token = res.data.token
      const userInfo = res.data.user

      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = token

      commit('AUTH_SUCCESS', token, userInfo)
    }
    return res
  },

  // register
  async register({ commit }, user) {
    commit('REGISTER_REQUEST')
    let res = await axios.post('http://localhost:5000/api/users/register', user)
    if (res.data.success !== undefined) {
      commit('REGISTER_SUCCESS')
      // const token = res.data.token
      // const userInfo = res.data.user
    }
    return res
  },

  // get profile
  async getProfile({ commit }) {
    commit('PROFILE_REQUEST')
    let res = await axios.get('http://localhost:5000/api/users/profile')
    commit('PROFILE_LOADED', res.data.user)
    return res
  },

  // logout
  async logout({ commit }) {
    await localStorage.removeItem('token')
    commit('LOGOUT')
    delete axios.defaults.headers.common['Authorization']
    return
  }
}

const mutations = {
  AUTH_REQUEST(state) {
    state.status = 'loading'
  },
  AUTH_SUCCESS(state, token, user) {
    state.token = token
    state.user = user
    state.status = 'success'
  },
  REGISTER_REQUEST(state) {
    state.status = 'loading'
  },
  REGISTER_SUCCESS(state) {
    state.status = 'success'
  },
  PROFILE_REQUEST(state) {
    state.status = 'loading'
  },
  PROFILE_LOADED(state, user) {
    state.status = 'success'
    state.user = user
  },
  LOGOUT(state) {
    state.status = ''
    state.token = '',
    state.user = {}
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}