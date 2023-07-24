export const state = () => ({
  // counter: 0,
  user: null,
  userLogined: false,
});

export const getters = {
  getUser(state) {
    return state.user;
  },
};

export const mutations = {
  setState(state, [key, value]) {
    state[key] = value;
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
        // if (!currentUser.emailVerified) {
        //   this.$router.push({
        //     name: "auth-verifiedForm",
        //   });
        // }
      } else {
        commit("setState", ["user", null]);
      }
    }
  },
};
