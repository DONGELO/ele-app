<template>
  <div :class="{'open': isSort || isCreen}" @click.self="hideView">
      <!-- 导航 -->
      <div class="filter_wrap" v-if="filterData">
        <aside class="filter">
            <div class="filter_nav" 
            v-for="( item, index ) in filterData.navTab" :key="index" 
            :class="{ 'filter_bold' : currentFilter == index}"
            @click="filterSort(index)"
            >
                <span>{{item.name}}</span>
                <svg-icon v-if="item.icon" data_iconName="down-arrow"></svg-icon>
            </div>
        </aside>
    </div>
    <!-- 排序 -->
    <section class="filter_extend" v-if="isSort">
        <ul>
            <li v-for="(item, index) in filterData.sortBy" :key="index" @click="selectSort(item, index)">
                <span :class="{'selectName': currentSort == index}">{{item.name}}</span>
                <svg-icon v-show="currentSort == index" data_iconName="select"></svg-icon>
            </li>
        </ul>
    </section>
    <!-- 筛选 -->
    <section class="filter_extend" v-if="isCreen">
        <div class="filter_sort">
            <div v-for="(screen, index) in filterData.screenBy" :key="index" class="morefilter">
                <p class="title">{{screen.title}}</p>
                <ul>
                    <li v-for="(item, i) in screen.data" :key="i" :class="{ 'selected' : item.select }" 
                    @click="selectScreen(item, screen)">
                        <img v-if="item.icon" :src="item.icon" alt="">
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="moreFilter_btn">
            <span class="moreFilter_clear" :class="{ 'edit': edit }" @click="clearFilter">清空</span>
            <span class="moreFilter_ok" @click="filterOk">确定</span>
        </div>
    </section>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
export default {
    name: 'FilterView',
    props: {
        filterData: Object
    },
    data () {
        return {
            currentFilter: 0,
            isSort: false,
            currentSort: 0,
            isCreen: false
        }
    },
    computed: {
        edit() {
            let edit = false;
            this.filterData.screenBy.forEach(screen =>{
                screen.data.forEach(item => {
                    if(item.select){
                        edit = true;
                    }
                })
            })
            return edit;
        }
    },
    methods: {
        filterSort(index){
            this.currentFilter = index;
            switch  (index) {
                case 0:
                    this.isSort = true;
                    this.$emit('searchFixed', true);
                    break;
                case 1:
                    this.$emit('update',{ condation:
                    this.filterData.navTab[1].condition
                    })
                    this.hideView()
                    break;
                case 2:
                    this.$emit('update',{ condation:
                    this.filterData.navTab[2].condition
                    })
                    this.hideView()
                    break;
                case 3:
                    this.isCreen = true;
                    this.isSort = false;
                    this.$emit('searchFixed', true);
                    break;
                    default:
                        this.hideView()
                        break;
            }
        },
        hideView(){
            this.isSort = false;
            this.isCreen = false;
            this.$emit('searchFixed', false)
        },
        selectSort(item, index) {
            this.currentSort = index;
            this.filterData.navTab[0].name = this.filterData.sortBy[index].name;
            this.hideView();

            // 更新数据
            this.$emit('update', { condation: item.code });
        },
        selectScreen(item, screen){
            // 单选
            if(screen.id !== 'MPI'){
                screen.data.forEach(ele => {
                    ele.select = false
                });
            }
            item .select = !item.select
        },
        clearFilter(){ // 清空
            this.filterData.screenBy.forEach(screen => {
                screen.data.forEach(item => {
                    item.select = false;
                })
            })
        },
        filterOk(){ //确定
            let screenData = {
                MPI: '',
                offer: '',
                per: ''
            };
            let mpiStr = '';
            this.filterData.screenBy.forEach(screen => {
                screen.data.forEach( ( item, index ) => {
                    if(item.select){
                        // 两种情况：多选和多选
                        if(screen.id !== 'MPI'){
                            // 单选
                            screenData[screen.id] = item.code
                        }else {
                            // 多选
                            mpiStr += item.code + ',' ;
                            screenData[screen.id] = mpiStr
                        }
                    }
                })
            });
            //console.log(mpiStr)
            this.$emit('update', { condation: screenData });
            this.hideView()
        }
    },
}
</script>

<style lang="scss" scoped>
    .filter_wrap{
        background-color: #fff;
        position: sticky;
        top: 54px;
        z-index: 100;
        .filter{
            position: relative;
            border-bottom: 1px solid #ddd;
            line-height: 10.4vw;
            z-index: 101;
            height: 10.666666vw;
            display: flex;
            justify-content: space-around;
            .filter_nav{
                flex: 1;
                text-align: center;
                color: #666;
                font-size: 0.83333vw;
                .svg-icon{font-size: 8px;}
            }
        }
    }
    .filter_bold{
        font-weight: 600;
        color: #333;
    }
    .open{
        position: fixed;
        top: 0;
         left: 0;
         width: 100%;
         height: 100%;
         background-color: rgba(0,0,0,0.5);
         transition: all 0.3s ease-in-out;
         z-index: 3;
    }
    .filter_extend{
        background-color: #fff;
        color: #333;
        padding-top: 2.3333vw;
        position: absolute;
        width: 100%;
        z-index: 4;
        left: 0;
        top: 24.533333vw;
        li{
            position: relative;
            padding-left: 5.33333vw;
            line-height: 10.666667vw;
            overflow: hidden;
            align-items: flex-end;
            .svg-icon{
                float: right;
                color: #009eef;
                margin-right: 3.733333vw;
                line-height: 10.66667vw;
                padding-top: 6px;
            }
        }
    }
    .selectName{
        color: #009eef;
    }
    /* 筛选 */
    .filter_sort{
        background-color: #fff;
        padding: 0 2.666667vw;
        line-height: normal;
        .morefilter{
            margin: 2.666667vw;
            overflow: hidden;
            .title{
                margin-bottom: 2vw;
                color: #666;
                font-size: 0.5rem;
            }
            ul{
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                font-size: 0.8rem;
                li{
                    box-sizing: border-box;
                    width: 30%;
                    height: 9.33333vw;
                    line-height: 9.33333vw;
                    margin: 0.8vw 1%;
                    background-color: #fafafa;
                    img{
                        width: 3.46666667vw;
                        height: 3.46666667vw;
                        vertical-align: middle;
                        margin-right: 0.8vw;
                    }
                    span{
                        margin-left: 2%;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
    .moreFilter_btn{
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #fafafa;
        box-shadow: 0 -0.266667vw 0.53333vw 0 #ededde;
        line-height: 11.466666vw;
        box-sizing: border-box;
        span{
            font-size: 0.8266667rem;
            text-align: center;
            text-decoration: none;
            flex: 1;
        }
        .moreFilter_clear{
            color: #ddd;
            background-color: #fff;
        }
        .moreFilter_ok{
            color: #fff;
            background-color: #00d762;
            border: 0.1333333vw solid #00d762;
        }  
    }
    .selected{
        color: #3190e8 !important;
        background-color: #edf5ff !important;
    }
    .edit{
        color: #333 !important;
    }
</style>