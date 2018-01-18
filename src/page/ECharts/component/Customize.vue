<style scoped lang="less">
  @import "../../../assets/color.less";
  .Customize {
    width: 100%;
    height: auto;
    background-color: @background;
    #chart {
      width: 80%;
      height: 600px;
      position: relative;
    }
  }
</style>

<template>
  <div class="Customize">
    <div id="chart"></div>
  </div>
</template>

<script>
  export default {
    name: 'Customize',
    data () {
      return {
        myChart: null
      }
    },
    methods: {
      draw () {
      }
    },
    components: {
    },
    mounted () {
      this.myChart = this.$echarts.init(document.getElementById('chart'))
      this.draw()
    }
  }
</script>
