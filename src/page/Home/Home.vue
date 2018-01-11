<style scoped>
  .Home {
    background-color: #ffffff;
  }
</style>

<template>
  <div class="Home">

  </div>
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
    },
    components: {
    }
  }
</script>
