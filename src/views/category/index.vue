<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <transition name="fade-right" mode="out-in">
          <XtxBreadItem v-if="topCategory" :key="topCategory.id">{{
            topCategory.name
          }}</XtxBreadItem>
        </transition>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height: 500px" />

      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul v-if="topCategory">
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="item in subList" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <p class="tag">{{ item.desc }}</p>
          <XtxMore :to="`/category/sub/${item.id}`" />
        </div>
        <div class="body">
          <GoodsItem v-for="g in item.goods" :key="g.id" :goods="g" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import XtxCarousel from '@/components/library/xtx-carousel.vue'
import XtxBread from '@/components/library/xtx-bread.vue'
import XtxBreadItem from '@/components/library/xtx-bread-item.vue'
import GoodsItem from './components/goods-item'
import XtxMore from '@/components/library/xtx-more.vue'
import { findBanner } from '@/api/home'
import { findTopCategory } from '@/api/category'
import { useStore } from 'vuex'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'TopCategory',
  components: {
    XtxCarousel,
    XtxBread,
    XtxBreadItem,
    GoodsItem,
    XtxMore
  },
  setup() {
    const sliders = ref([])
    findBanner().then(({ result }) => {
      sliders.value = result
    })
    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => {
      // let cate
      return store.state.category.list.find((item) => {
        return item.id === route.params.id
      })
      // if (item) cate = item
      // console.log(cate)
      // return cate
    })

    // 推荐商品
    const subList = ref([])
    const getSubList = () => {
      findTopCategory(route.params.id).then((data) => {
        subList.value = data.result.children
      })
    }
    watch(
      () => route.params.id,
      (newVal) => {
        newVal && getSubList()
      },
      { immediate: true }
    )

    return {
      sliders,
      topCategory,
      subList
    }
  }
}
</script>
<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
  .fade-right-enter-to,
  .fade-right-leave-from {
    opacity: 1;
    transform: none;
  }
  .fade-right-enter-active,
  .fade-right-leave-active {
    transition: all 0.5s;
  }
  .fade-right-enter-from,
  .fade-right-leave-to {
    opacity: 0;
    transform: translate3d(20px, 0, 0);
  }
}
</style>
