import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import cart from './modules/cart'
import category from './modules/category'
import user from './modules/user'

export default createStore({
  modules: {
    cart,
    category,
    user
  },
  plugins: [
    createPersistedState({
      key: 'erabbit',
      paths: ['user', 'cart']
    })
  ]
})
