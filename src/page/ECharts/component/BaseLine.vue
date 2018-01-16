<style scoped lang="less">
  @import "../../../assets/color.less";
  .BaseLine {
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
  <div class="BaseLine" @onresize="onResize">
    <div id="chart"></div>
  </div>
</template>

<script>
  export default {
    name: 'BaseLine',
    data () {
      return {
        myChart: null
      }
    },
    methods: {
      draw () {
        // 绘制图表
        this.myChart.setOption({
          title: {
            text: 'ECharts BaseLine'
          },
          tooltip: {},
          xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20]
          }]
        })
      },
      onResize () {
        console.log('打uiaogaibian ')
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
