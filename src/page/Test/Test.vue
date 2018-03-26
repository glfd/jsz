<style scoped lang="less">
  @import "../../assets/color.less";
  .Test {
    width: 1200px;
    margin: 0 auto;
    height: 2000px;
    background-color: #fff;
    min-height: 100%;
    position: relative;
    .mode{
      margin-top: 15px;
    }
    .log{
      position: absolute;
      top: 150px;
      right: 50px;
      width: 500px;
      min-height: 200px;
      height: 230px;
      overflow: auto;
      border: 1px solid #ddd;
    }
    #myIframe{
      width: 100%;
      height: 500px;
    }
  }
</style>

<template lang="jade">
  .Test 111
    f-model(v-model="fModel", width="80%", @resize="modelResize")
      // p 测试
      iframe#myIframe(src="http://localhost:8081/#/bar3d")
    Button(@click="() => {this.fModel = !this.fModel}") 点击
    pre
      code(v-text="rawHtml")
    .mode
      Button(@click="socketLink") scoket连接
    .mode
      Input(v-model="sendMsg", style="width: 300px")
      Button(@click="sockenSend") scoket发送
    .mode
      Button(@click="sockenClose") scoket断开
    .mode
      Input(v-model="sendMsgHttp", style="width: 300px")
      Button(@click="httpSend") http发送
    pre.log
      code {{ log }}
</template>

<script>
  import FModel from './component/fModel'
  import util from '../../uitl/util'
  import ECharts from '../ECharts/ECharts'
  export default {
    name: 'Test',
    data () {
      return {
        spinShow: false,
        vuegConfig: {  //  进场动画
          forwardAnim: 'zoomIn',  //  options所有配置可以写在这个对象里，会覆盖全局的配置
          backAnim: 'zoomOut',
          disable: false              //  对于嵌套路由，默认为关闭动画，需要在组件的data.vuegConfig中配置disable为false启用
        },
        fModel: false,
        rawHtml: '',
        sendMsg: '',
        ws: null,
        sendMsgHttp: '',
        log: ''
      }
    },
    methods: {
      addLog (msg) {
        this.log += msg + `
        `
      },
      socketLink () {
        this.ws = new WebSocket('ws://192.168.1.188:8888/springbootdemo/websocket')
        let ws = this.ws
        ws.onopen = () => {
          this.addLog('连接成功')
          ws.send('Hello Server!')
        }
        ws.onmessage = event => {
          // 处理数据
          this.addLog(event.data)
        }
        ws.onclose = event => {
          this.addLog('socket连接断开')
        }
      },
      sockenSend () {
        switch (util.readyState(this.ws)) {
          case 0:
            this.addLog('socket正在连接')
            break
          case 1:
            this.ws.send(this.sendMsg)
            break
          case 2:
            this.addLog('socket正在关闭')
            break
          case 3:
            this.addLog('socket连接关闭')
            break
        }
      },
      sockenClose () {
        this.ws.close()
      },
      httpSend () {
        let url = 'http://192.168.1.188:8888/springbootdemo/user/pushVideoListToWeb'
        // let url = 'http://47.97.118.102:9999/JZIOT/user/login'
        let data = {
          str: this.sendMsgHttp
        }
        util.post(url, data, (data) => {
          console.log(data)
        }, (error) => {
          console.log(error)
        })
      },
      modelResize (val) {
        let iframe = document.getElementById('myIframe')
        iframe.width = val.width + 'px'
        iframe.height = val.height + 'px'
        console.log(iframe)
      }
    },
    components: {
      FModel,
      ECharts
    },
    mounted () {
      this.rawHtml = `
      <pre>
        <code>
          <div>test</div>
        </code>
      </pre>
      `
    }
  }
</script>
