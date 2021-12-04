<template>
  <div>
      <div class="title">当前位置</div>
      <div class="des" @click="$emit('click')">
          <svg-icon data_iconName="current-location"></svg-icon>
          <span>{{address}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Location',
    props: {
        address: String
    },
    setup () {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
    .title{
        margin-top: 5px;
        font-size: 12px;
    }
    .des{
        padding: 10px 0;
        align-items: flex-end;
        .svg-icon{
            color: #0eb6f7;
            font-size: 12px;
        }
        span{
            color: #333;
            font-weight: bold;
            margin-left: 5px;
            display: inline-block;
            width: 90%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
</style>