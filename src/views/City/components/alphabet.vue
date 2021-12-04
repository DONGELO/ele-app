<template>
  <div class="alphabet" ref="alphabetScroll" v-if="cityInfo">
      <div class="scroll_warp">
         <!--  热门城市 -->
          <div class="hot_warp" ref="cityList">
              <div class="title">热门城市</div>
              <ul class="hot_city">
                  <li @click="$emit('selectCity', item)" v-for="( item, index) in cityInfo.hotCities" :key="index">{{item.name}}</li>
              </ul>
          </div>
          <!--  所有城市 -->
          <div class="city_warp">
              <!--  循坏字母排序的key -->
              <div class="city_content" ref="cityList" v-for="( item, index ) in keys" :key="index">
                  <div class="title">{{item}}</div>
                  <ul>
                      <li @click="$emit('selectCity', city)" v-for="( city, index) in cityInfo[item]" :key="index">
                          {{city.name}}
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <!-- sdjkas -->
      <div class="alphabet_keys">
          <ul>
              <li class="down-arrow2" @click="selectKey(0)"><svg-icon data_iconName="down-arrow2"></svg-icon></li>
              <li @click="selectKey(index+1)" v-for="(item, index) in keys" :key="index">{{item}}</li>
          </ul>
      </div>
  </div>
</template>

<script>
import { ref, } from '@vue/composition-api'
import BScroll from 'better-scroll'
export default {
    name: 'Alphabet',
    props: {
        cityInfo: Object,
        keys: Array
    },
    setup (props, { root }) {
        /* ref  */
        const scroll = ref( null )
        /* methods 方法 */
        const initScroll = () =>{
            root.scroll = new BScroll( root.$refs.alphabetScroll, {
               click: true
           })
        }
        const selectKey = (index) => {
            //console.log(index)
            //console.log(root.$refs.alphabetScroll.cityList)
            //const cityList = root.$refs.alphabetScroll.getElementsByClassName('cityList')
            //let el = cityList[index];
            //root.scroll.scrollElement(el, 250)
            console.log(root.$refs.cityList)
        }
        return {
            scroll,
            initScroll, selectKey
        }
    }
}
</script>

<style lang="scss" scoped>
    .alphabet{
        margin-top: 10px;
        box-sizing: border-box;
        padding: 0 16px;
        background-color: white;
        height: calc(100% - 65px);
        overflow: hidden;
        .scroll_warp{
            background-color: white;
            overflow: auto;
            .hot_city{
                padding: 0 16px;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                li{
                    width: 30%;
                    background-color: #f1f1f1;
                    margin: 0 10px 10px 0;
                    text-align: center;
                    padding: 10px;
                    box-sizing: border-box;
                }
            }
            .city_content{
                li{
                    padding: 10px;
                    border-bottom: 1px solid #eee;
                }
                .title{
                    color: #aaa;
                    padding: 15px 0;
                }
            }
        }
    }
    .alphabet_keys{
        position: fixed;
        right: 0;
        top: 28%;
        color: #aaa;
        font-size: 12px;
        line-height: 1.4;
        text-align: center;
        padding: 0 5px;
        .down-arrow2{
            .svg-icon{
                font-size: 8px;
            }
        }
    }
</style>