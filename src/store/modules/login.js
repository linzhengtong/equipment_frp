const state = {
  token: sessionStorage.getItem('token')
};

const mutations = {
  updateToken (state, token = '') {
    state.token = token;
    sessionStorage.setItem('token', token);
  }
};

export default {
  state,
  mutations
};
