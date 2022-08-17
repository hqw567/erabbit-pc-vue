<template>
  <div>
    <!-- <h1>{{ $store.state.userName }}</h1>
    <h1>{{ $store.getters['getName'] }}</h1>
    <button @click="updateName">修改</button>
    <button @click="delayUpdateName">延迟修改</button> -->
    <p>{{ $store.state.moduleA.userName }}</p>
    <p>{{ $store.getters.newName }}</p>
    <button @click="updateA">点击修改A</button>
    <button @click="aNewName">点击延迟修改A</button>
    <hr />
    <p>{{ $store.state.moduleB.userName }}</p>
    <p>{{ $store.getters['moduleB/newName'] }}</p>
    <button @click="updateB">点击修改B</button>
    <button @click="bNewName">点击延迟修改A</button>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'App',
  setup() {
    const store = useStore()
    const updateA = () => {
      store.commit('updateName', '修改A')
    }
    const aNewName = () => {
      store.dispatch('aNewName', '我延迟修改了！')
    }
    const updateB = () => {
      store.commit('moduleB/updateName', 'B')
    }
    const bNewName = () => {
      store.dispatch('moduleB/bNewName', '我延迟修改了b！')
    }
    return { updateA, aNewName, updateB, bNewName }
    // const updateName = () => {
    //   store.commit('updateName', '我修改了代码！嘿嘿')
    // }
    // const delayUpdateName = () => {
    //   store.dispatch('delayUpdateName', '就是要修改你咋滴！')
    // }
    // console.log(store.state.userName)
    // console.log(store.getters.getName)
    // return { updateName, delayUpdateName }
  }
}
</script>
