<template>
  <div id="app">
    <Layout style="height: 100%;">
      <Header>Header</Header>
      <Content style="position: relative;">
        <div class="main">
          <router-view/>
        </div>
      </Content>
      <!--<Footer style="box-shadow: 0px -1px 4px #eee;">Footer</Footer>-->
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      spinShow: false,
      vuegConfig: {  //  进场动画
        forwardAnim: 'zoomIn',  //  options所有配置可以写在这个对象里，会覆盖全局的配置
        backAnim: 'zoomOut',
        disable: false              //  对于嵌套路由，默认为关闭动画，需要在组件的data.vuegConfig中配置disable为false启用
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "./assets/color.less";
  #app {
    color: #2c3e50;
    width: 100%;
    height: 100%;
    .main{
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: auto;
    }
  }
</style>
