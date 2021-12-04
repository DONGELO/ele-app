<template>
  <div class="address">
      <Heard :isLeft="true" title="选择收货地址" previous="返回" />
      <div class="city_search">
          <div class="search">
              <span class="city" @click="$router.push('/city')">
                {{city}}
                <svg-icon data_iconName="down-arrow"></svg-icon>
            </span>
            <svg-icon data_iconName="search"></svg-icon>
            <input type="text" v-model="searchVal" placeholder="小区/写字楼/学校等">
          </div>
          <Location @click="selectAddress" :address="address" />
      </div>
      <div class="area">
          <ul class="area_list" v-for="( item, index) in areaList" :key="index">
              <li @click="selectAddress(item)">
                  <h4>{{item.name}}</h4>
                  <p>{{item.district}}-{{item.address}}</p>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
//import { computed, ref, watch, } from '@vue/composition-api'
import Heard from '@/components/heard.vue'
import Location from './components/location.vue'
export default {
    name: 'Address',
    components: {
        Heard, Location
    },
    data () {
        return {
            city: '',
            searchVal: '',
            areaList: []
        }
    },
    computed: {
        address(){
            return this.$store.getters.location.formattedAddress;
        }
    },
    watch: {
        searchVal(){
            this.rearchPlace()
        }
    },
    methods: {
        rearchPlace(){
            const self = this;
            //console.log(this.searchVal)
            AMap.plugin('AMap.Autocomplete', function(){
                // 实例化Autocomplete
                var autoOptions = {
                    //city 限定城市，默认全国
                    city: self.city
                }
                var autoComplete= new AMap.Autocomplete(autoOptions);
                autoComplete.search(self.searchVal, function(status, result) {
                    // 搜索成功时，result即是对应的匹配数据
                    //console.log(result)
                    self.areaList = result.tips;
                })
            })
        },
        selectAddress(item){
            //设置地址
            if(item){
                this.$store.dispatch(
                    'setAddress',
                    item.district + item.address + item.name
                );
            } else {
                this.$store.dispatch('setAddress', this.address)
            }
            // 跳转
            this.$router.push('/home')
        }
    },
    beforeRouteEnter(to, from, next) {
       //console.log(to)
       next(vm =>{
           vm.city = to.params.city;
       })
    },
}
</script>

<style lang="scss" scoped>
    .address{
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        padding-top: 45px;
    }
    .city_search{
        background-color: white;
        padding: 0 10px;
        .svg-icon{
            font-size: 8px;
        }
    }
    .search {
        background-color: #f6f6f6;
        height: 32px;
        border-radius: 4px;
        box-sizing: border-box;
        line-height: 32px;
    }
    .search .city{
        padding: 0 10px;
    }
    .city .svg-icon{
        margin-right: 10px;
    }
    .search input{
        margin-left: 5px;
        height: 26px;
        background-color: #f6f6f6;
        outline: none;
        border: none;
    }
    .area{
        margin-top: 16px;
        background-color: #fff;
        li{
            border-bottom: 1px solid #eee;
            padding: 2px 16px;
            color: #aaa;
            h4{
                font-weight: bold;
                color: #333;
                margin-bottom: 5px;
            }
        }
    }
</style>