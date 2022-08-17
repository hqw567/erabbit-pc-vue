import { createStore } from 'vuex'

const moduleA = {
  state: {
    userName: 'moduleA'
  },
  getters: {
    newName(state) {
      return state.userName + '!'
    }
  },
  mutations: {
    updateName(state, v) {
      state.userName = v
    }
  },
  actions: {
    aNewName({ commit }, v) {
      setTimeout(() => {
        commit('updateName', v)
      }, 1000)
    }
  }
}

const moduleB = {
  namespaced: true,
  state: {
    userName: 'moduleB'
  },
  getters: {
    newName(state) {
      return state.userName + '!'
    }
  },
  mutations: {
    updateName(state, v) {
      state.userName = v
    }
  },
  actions: {
    bNewName({ commit }, v) {
      setTimeout(() => {
        commit('updateName', v)
      }, 1000)
    }
  }
}

export default createStore({
  modules: {
    moduleA,
    moduleB
  }
})

// export default createStore({
//   state: {
//     userName: 'he'
//   },
//   getters: {
//     getName(state) {
//       return state.userName + '!!'
//     }
//   },
//   mutations: {
//     updateName(state, name) {
//       state.userName = name
//     }
//   },
//   actions: {
//     delayUpdateName({ commit }, v) {
//       setTimeout(() => commit('updateName', v), 1000)
//     }
//   },
//   modules: {}
// })
