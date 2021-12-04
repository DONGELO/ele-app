<template>
  <div class="city">
     <div>
         <Heard :isLeft="true" previous="选择收货地址" />
     </div>
     <div class="search_warp">
         <div class="serach">
             <svg-icon data_iconName="search"></svg-icon>
             <input type="text" v-model="cityVal" placeholder="输入城市名">
         </div>
         <button @click="$router.push({name: 'Address', params: { city: city}})">取消</button>
     </div>
     <div v-if="searchList.length === 0">
         <div class="location">
            <Location @click="selectCity({name: city})" :address="city " />
        </div>
        <Alphabel @selectCity="selectCity" ref="allcity" :cityInfo="cityInfo" :keys="keys" />
     </div>
     <div class="search_list" v-else>
         <ul>
             <li @click="selectCity(item)" v-for="( item, index ) in searchList" :key="index">{{item.name}}</li>
         </ul>
     </div>
  </div>
</template>

<script>
//引入axios插件
import axios from 'axios'
import Heard from '@/components/heard.vue'
import Location from '../Address/components/location.vue'
import Alphabel from './components/alphabet.vue'
export default {
    name: 'City',
    components: {
        Heard, Location, Alphabel
    },
    data () {
        return {
            cityVal: '',
            cityInfo: null,
            keys: [ ],
            allCities: [ ],
            searchList: [ ]
        }
    },
    computed: {
        city () {
            return (
                this.$store.getters.location.addressComponent.city || 
                this.$store.getters.location.addressComponent.province
            )
        }
    },
    created () {
        this.getCityInfo()
    },
    watch: {
        cityVal(){
            this.searchCity()
        }
    },
    methods: {
        getCityInfo () {
            axios.get('/api/posts/cities')
            .then(res => {
                //console.log(res.data)
                this.cityInfo = res.data
                //处理keys
                this.keys = Object.keys( res.data )
                //console.log(this.keys) 
                this.keys.pop();
                // keys 排序
                this.keys.sort()
                this.$nextTick( () =>{
                    this.$refs.allcity.initScroll()
                })
                //存储所有的城市，用来搜索过滤
                this.keys.forEach(key => {
                    this.cityInfo[key].forEach( city => {
                        this.allCities.push(city)
                    })
                });
            })
            .catch(err => {
                console.log(err)
            })
        },
        //跳转到页面路由，显示相应的地点
        selectCity(city) {
            //console.log(city)
            this.$router.push({name: 'Address', params: { city: city.name }})
        },
        searchCity(){
            if(!this.cityVal) {
                // 如果搜索框为空，数组置空
                this.searchList = []
            } else {
                // 根据输入框输入的数字检索城市，并存储到searchList数组中
                this.searchList = this.allCities.filter(item => {
                    return item.name.indexOf(this.cityVal) != -1
                })
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    .city{
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        padding-top: 45px;
    }
    .search_warp{
        position: fixed;
        height: 32px;
        width: 100%;
        background-color: white;
        box-sizing: border-box;
        padding: 3px 16px;
        display: flex;
        justify-content: space-between;
        .serach{
            background-color: #f6f6f6;
            border-radius: 3px;
            line-height: 32px;
            width: 80%;
            box-sizing: border-box;
            padding: 3px 16px;
            display: flex;
            text-align: center;
            .svg-icon{
                font-size: 10px;
            }
            input{
                background: #f6f6f6;
                outline: none;
                border: none;
                margin-left: 3px;
                width: 80%;
                height: 16px;
            }
        }
        button{
            outline: none;
            border: none;
            color: #009eef;
        }
    }
    .location{
        background: white;
        padding: 8px 16px;
        height: 65px;
        margin-top: 32px;
        box-sizing: border-box;
    }
    .search_list{
        background-color: white;
        padding: 5px 16px;
        li{
            padding: 10px;
            border-bottom: 1px solid #eee;
        }
    }
</style>