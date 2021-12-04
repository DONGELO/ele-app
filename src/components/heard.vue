<template>
  <div class="heard">
      <!-- 左侧返回-->
      <div class="heard-button is-left" v-if="isLeft">
          <svg-icon data_iconName="return-arrow"></svg-icon>
          <button @click="$router.go(-1)">{{previous}}</button>
      </div>
      <!-- 中间标题 -->
      <h4 class="heard-title">{{title}}</h4>
      <!-- 右侧 -->
  </div>
</template>

<script>
export default {
    name: 'Heard',
    props: {
        title: String,
        previous: String,
        isLeft: {
            type: Boolean,
            default: false
        }
    },
    setup () {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
    .heard{
        align-items: center;
        //background-image: linear-gradient(to right, #2ac7fe, #02adf2);
        background-color: #fff;
        box-sizing: border-box;
        color: white;
        display: flex;
        font-size: 16px;
        height: 45px;
        line-height: 1;
        padding: 0 10px;
        text-align: center;
        white-space: nowrap;
        position: fixed;
        width: 100%;
        top: 0;
        z-index: 99;
    }
    .heard-button{
        button{
            background-color: transparent;
            border: 0;
            box-shadow: none;
            //color: inherit;
            color: #000;
            display: inline-block;
            padding: 0;
            font-size: inherit;
            outline: none;
            font-weight: 300;
        }
        .svg-icon{
            font-size: 9px;
            color: #000;
        }
    }
    .heard-title{
        flex: 1;
    }
    .is-left{
        text-align: left;
    }
</style>