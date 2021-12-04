<template>
  <div class="home">
      <div class="heard">
        <div class="address_map" @click="$router.push({ name: 'Address', 
        params: { city: city }})">
          <svg-icon data_iconName="position"></svg-icon>
          <span>{{address}}</span>
          <svg-icon class="get_into" data_iconName="get-into"></svg-icon>
        </div>
      </div>
      <!-- 搜索商家 -->
      <div class="search_wrap" :class="{'fixedview': showFilter}">
        <div class="shop_search">
          <svg-icon class="svg_search" data_iconName="search"></svg-icon>
          搜索商家 商家名称
        </div>
      </div>
      <div class="container">
        <!-- 轮播图 -->
        <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="( img, index ) in swipeImgs" :key="index">
            <img :src="img" alt="">
            </van-swipe-item>
        </van-swipe>
        <!-- 分类 -->
        <van-swipe class="entries" :autoplay="0" indicator-color="white">
            <van-swipe-item v-for="( entry, i ) in entries" :key="i">
              <div class="foodentry" v-for="( item, index) in entry" :key="index">
                <div class="img_wrap">
                  <img :src="item.image" alt="">
                </div>
                <span>{{item.name}}</span>
              </div>
            </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 推荐商家 -->
      <div class="shopList_title">推荐商家</div>
      <!-- 推荐商家导航 -->
      <FilterView :filterData="filterData" @searchFixed="showFilterView" @update="update" />
  </div>
</template>

<script>
import FilterView from '../../components/fiterView.vue'
import { computed } from '@vue/composition-api'
export default {
  name: 'Home',
  components: {
    FilterView
  },
  data () {
    return {
      swipeImgs: [],
      entries: [],
      filterData: null,
      showFilter: false
    }
  },
  computed: {
    address() {
      return this.$store.getters.address
    },
    city () {
      return this.$store.getters.location.addressComponent.city || 
      this.$store.getters.location.addressComponent.province
      //console.log(root.$store.getters.location)
    }
  },
  created( ){
    this.getData()
  },
  methods: {
    getData(){
      this.$axios('/api/profile/shopping')
        .then(res => {
        //console.log(res.data)
        this.swipeImgs = res.data.swipeImgs
        this.entries = res.data.entries
      })
      this.$axios('api/profile/filter')
        .then(res => {
          console.log(res.data)
          this.filterData = res.data
        })
    },
    showFilterView(isShow){
      this.showFilter = isShow;
    },
    update(condation){
      console.log(condation)
    }
  },
  /* setup (props, { root } ) {
    const address = computed( () =>{
      return root.$store.getters.address
    })
    const city = computed( ( ) => {
      return root.$store.getters.location.addressComponent.city || 
      root.$store.getters.location.addressComponent.province
      //console.log(root.$store.getters.location)
    })
    const getData = () => {
      root.$axios('/api/profile/shopping')
      .then(res => {
        console.log(res.data)
      })
    }
    return {
      address, city
    }
  } */
}
</script>

<style lang="scss" scoped>
  .home{
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
  }
  .heard,
  .search_wrap{
    background-image: linear-gradient(to right, #2ac7fe, #02adf2);
    padding: 10px;
    .address_map{
      color: white;
      font-weight: bold;
      display: flex;
      span{
        display: inline-block;
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .svg-icon{ font-size: 12px;}
    .get_into{color: white;font-size: 8px;padding-top: 3px;}
    .shop_search{
      background-color: white;
      padding: 6px 0; 
      border-radius: 4px;
      color: #aaa;
      display: flex;
      align-items: flex-end;
      .svg_search{
        padding: 0 6px;
      }
    }
  }
  .search_wrap{
    position: sticky;
    top: 0;
    z-index: 999;
    box-sizing: border-box;
  }
   /* 轮播图 */
  .swipe {
    height: 100px;
    img{
      width: 100%;
      height: 100px;
    }
  }
  /* 分类 */
  .entries{
    background-color: #fff;
    height: 47.2vw;
    text-align: center;
    overflow: hidden;
    .foodentry{
      width: 20%;
      float: left;
      position: relative;
      margin-top: 2.933333vw;
      span{
        display: block;
        color: #666;
        font-size: 0.32rem;
      }
      .img_wrap{
        position: relative;
        display: inline-block;
        width: 12vw;
        height: 12vw;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  /* 推荐商家 */
  .shopList_title{
    display: flex;
    align-items: flex;
    justify-content: center;
    height: 9.6vw;
    line-height: 9.6vw;
    font-size: 16px;
    color: #333;
    background-color: #fff;
  }
  .shopList_title:after,
  .shopList_title:before{
    display: block;
    content: "--";
    width: 5.333333vw;
    height: 0.2666667vw;
    color: #999;
  }
  .shopList_title:after{
    margin-left: 3.466666vw;
  }
  .shopList_title:before{
    margin-left: 3.466666vw;
  }
  .fixedview{
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 999;
  }
</style>