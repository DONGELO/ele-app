<template>
  <div>
      <section class="index_container">
          <div class="index_shopInfo">
              <!-- 左侧图片 -->
              <div class="logo_container">
                  <img :src="restaurant.image_path" alt="">
              </div>
              <!-- 右侧内容 -->
              <div class="index_main">
                  <!-- 第一行  品牌-->
                  <div class="index_shopName">
                      <i v-if="restaurant.is_premium">品牌</i>
                      <span>{{restaurant.name}}</span>
                  </div>
                  <!-- 第二行  星级-->
                  <div class="index_rateWrap">
                      <div>
                          <Rating :rating="restaurant.rating" />
                          <span class="rate">{{restaurant.rating}}</span>
                          <span>月售{{restaurant.recent_order_num}}单</span>
                      </div>
                      <div class="delivery" v-if="restaurant.delivery_mode">
                          <span class="icon_hollow">{{restaurant.delivery_mode.text}}</span>
                      </div>
                  </div>
                  <!-- 第三行  配送-->
                  <div class="index_moneylimit">
                      <div>
                          <span>￥{{restaurant.float_minimum_order_amout}}起送</span>
                          |
                          <span>配送费￥{{restaurant.float_delivery_fee}}</span>
                      </div>
                      <div class="index_distanceWrap">
                          <span>1km</span>
                          |
                          <span>{{restaurant.order_lead_time}}分钟</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  </div>
</template>

<script>
import Rating from './rating.vue'
export default {
    name: 'IndexShop',
    props: {
        restaurant: Object,
    },
    components: {
        Rating
    }
}
</script>

<style lang="scss" scoped>
    .index_container{
        background-color: #fff;
        color: #666;
        padding: 4vw 0;
        border-bottom: 0.133333vw solid #eee;
    }
    .index_shopInfo{
        display: flex;
        justify-content: flex-start;
        padding: 0 2.66666667vw;
        align-items: stretch;
    }
    .logo_container{
        width: 17.33333vw;
        height: 17.33333vw;
        img{
            display: block;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 0.1333333vw solid rgba(0, 0, 0, 0.08);
            border-radius: 0.53333vw;
        }
    }
    .index_main{
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        flex-direction: column;
        padding-left: 2.66666667vw;
        font-size: 0.2rem;
        flex-grow: 1;
    }
    .index_shopName{
        align-items: center;
        color: #333;
        font-weight: 700;
        font-size: 0.9rem;
        i{
            background-color: #ffe800;
            margin-right: 1.33333vw;
            padding: 0.266666vw 0.6666667vw;
            text-align: center;
            white-space: nowrap;
            font-size: 0.6rem;
        }
        span{
            overflow: hidden;
            text-orientation: ellipsis;
            white-space: nowrap;
        }
    }
    .index_rateWrap{
        display: flex;
        align-items: center;
        overflow: hidden;
        justify-content: space-between;
        .rate{
            margin-right: 1.066667vw;
        }
        .delivery{
            display: flex;
            align-items: center;
            font-size: 0.6rem;
            margin-left: 1.0666667vw;
            .icon_hollow{
                color: #fff;
                background-color: #2395ff;
                padding: 2px;
                box-sizing: border-box;
            }
        }
    }
    .index_moneylimit{
        width: 100%;
        display: flex;
        justify-content: space-between;
        .index_distanceWrap{
            color: #999;
        }
    }
</style>