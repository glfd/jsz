<style scoped lang="less">
  @import "../../../assets/color.less";
  .SimpleBar3D {
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
  <div class="SimpleBar3D">
    <div id="chart"></div>
  </div>
</template>

<script>
  export default {
    name: 'SimpleBar3D',
    data () {
      return {
        myChart: null
      }
    },
    methods: {
      draw () {
        let hours = ['']
        let days = [1, 2, 3, 4, 5, 6, 7]

        let data = [[0, 0, 5], [0, 1, 1], [0, 2, 1], [0, 3, 2], [0, 4, 8], [0, 5, 6], [0, 6, 2]]

        let option = {
          tooltip: {},
          visualMap: {
            max: 20,
            inRange: {
              color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090']
            }
          },
          xAxis3D: {
            type: 'category',
            data: days
          },
          yAxis3D: {
            type: 'category',
            data: hours
          },
          zAxis3D: {
            type: 'value',
            name: '',
            axisTick: {
              show: false
            }
          },
          grid3D: {
            boxWidth: 200,
            boxDepth: 80,
            light: {
              main: {
                intensity: 1.2
              },
              ambient: {
                intensity: 0.3
              }
            }
          },
          series: [{
            type: 'bar3D',
            barSize: 15,
            data: data.map(function (item) {
              return {
                value: [item[1], item[0], item[2]]
              }
            }),
            shading: 'color',
            label: {
              show: false,
              textStyle: {
                fontSize: 16,
                borderWidth: 1
              }
            },
            itemStyle: {
              opacity: 1
            },
            emphasis: {
              label: {
                textStyle: {
                  fontSize: 20,
                  color: '#900'
                }
              },
              itemStyle: {
                color: '#900'
              }
            }
          }]
        }

        // 绘制图表
        this.myChart.setOption(option)
       /* let daysindex = 7
        setInterval(() => {
          daysindex++
          days.push(daysindex)
          data.push([0, daysindex, parseInt(Math.random() * 10)])
          this.myChart.setOption({
            xAxis3D: {
              data: days
            },
            yAxis3D: {
              data: hours
            },
            series: [{
              data: data.map(function (item) {
                return {
                  value: [item[1], item[0], item[2]]
                }
              })
            }]
          })
        }, 1000) */
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
