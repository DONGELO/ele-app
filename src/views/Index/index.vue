<template>
  <div class="index">
      <router-view></router-view>
      <tab-bar :data="tabBarData" />
  </div>
</template>

<script>
import { reactive, } from '@vue/composition-api';
import TabBar from '../../components/tabBar.vue';
export default {
    name: 'Index',
    components: {
        TabBar
    },
    setup () {
        const tabBarData = reactive([
            { title: '首页', icon: 'home', path: '/home' },
            { title: '订单', icon: 'order', path: '/order' },
            { title: '我的', icon: 'me', path: '/me' }
        ])
        return {
            tabBarData
        }
    }
}
</script>

<style lang="scss" scoped>
    .index{
        width: 100%;
        height: calc(100% - 45px);
    }
</style>