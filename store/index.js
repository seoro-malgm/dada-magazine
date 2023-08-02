export const state = () => ({
  // counter: 0,
  user: null,
  userLogined: false,
  // 상태를 임시로 표시할 salt
  salt: {
    mypageUpdated: false,
  },
});

export const getters = {
  getUser(state) {
    return state.user;
  },
  getSalt(state) {
    return state.salt;
  },
};

export const mutations = {
  setState(state, [key, value]) {
    state[key] = value;
  },
  setSalt(state, [key, value]) {
    state["salt"][key] = value;
    console.log('state["salt"][key]:', key, state["salt"][key]);
  },
};

export const actions = {
  setState({ commit }, [key, value]) {
    commit("setState", [key, value]);
  },
  async setUser({ commit, state, dispatch }) {
    // 세션스토리지에 저장
    const { authWatcher, getUserInfo } = this.$firebase();
    const userEmail = await authWatcher();
    if (userEmail) {
      const currentUser = await getUserInfo(userEmail);
      if (currentUser) {
        commit("setState", ["user", currentUser]);
      } else {
        commit("setState", ["user", null]);
      }
    }
  },
};
