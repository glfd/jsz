<style scoped lang="less">
  @import "../../assets/color.less";
  .Home {
    width: 1200px;
    margin: 0 auto;
    height: 2000px;
    background-color: #fff;
    min-height: 100%;
  }
</style>

<template lang="jade">
  .Home
    Button(type="text", @click="jump('Test')") TestPage
    Button(type="text", @click="jump('ECharts')") EChartsPage
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        spinShow: false,
        vuegConfig: {  //  进场动画
          forwardAnim: 'zoomIn',  //  options所有配置可以写在这个对象里，会覆盖全局的配置
          backAnim: 'zoomOut',
          disable: false              //  对于嵌套路由，默认为关闭动画，需要在组件的data.vuegConfig中配置disable为false启用
        }
      }
    },
    methods: {
      jump (name) {
        this.$router.push(name)
      }
    },
    components: {
    }
  }
</script>
