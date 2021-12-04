<template>
  <div class="tabbar">
      <router-link class="tab-item" v-for="(item, index) in data" :key="index" :to="item.path" active-class="is-selected">
          <div class="tab-item-icon">
              <svg-icon :data_iconName="item.icon"  />
          </div>
          <div class="tab-item-label">{{item.title}}</div>
      </router-link>
  </div>
</template>

<script>
export default {
    name: 'TabBar',
    components: { },
    props: {
        data: Array
    }
}
</script>

<style>
    .tabbar{
        height: 45px;
        box-sizing: border-box;
        width: 100%;
        position: fixed;
        bottom: 0;
        background-image: linear-gradient(
            180deg,#d9d9d9, #d9d9d9 50%, transparent 0
        );
        background-size: 100% 1px;
        background-repeat: no-repeat;
        background-color: #fafafa;
        display: flex;
        text-align: center;
    }
    .tab-item{
        display: block;
        padding: 3px 0;
        flex: 1;
    }
    .tab-item-icon{
        width: 20px;
        height: 20px;
        margin: 0 auto 5px;
    }
    .tab-item-icon .svg-icon{ font-size: 12px; }
    .tab-item-label{
        color: inherit;
        font-size: 10px;
        line-height: 10px;
    }
    a{
        text-decoration: none;
        color: #999;
    }
    .is-selected{color: #0eb6f7;}
</style>