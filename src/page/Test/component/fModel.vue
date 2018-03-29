<style scoped lang="less">
  @import "../../../assets/color.less";
  .fmodel {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    /*right: 0;
    bottom: 0;*/
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 998;
    .f-model-mask{
      background-color: rgba(55,55,55,.6);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 998;
    }
    .f-model-main{
      position: absolute;
      height: auto;
      left: 50%;
      top: 40%;
      z-index: 999;
      background-color: #fff;
      border: 0;
      border-radius: 6px;
      background-clip: padding-box;
      display: flex;
      flex-direction: column;
      .f-model-title{
        width: 100%;
        cursor:move;
        user-select:none;
        border-bottom: 1px solid #e9eaec;
        padding: 0px 16px;
        line-height: 42px;
        height: 42px;
      }
      .f-model-btn{
        position: absolute;
        right: 13px;
        top: 13px;
        font-size: 18px;
        line-height: initial;
        i{
          cursor: pointer;
          margin-left: 15px;
          &:hover{
            color: #2d8cf0;
          }
        }
      }
      .f-model-content{
        flex-grow: 1;
      }
      .f-model-bottom{
        border-top: 1px solid #e9eaec;
        padding: 5px 18px;
        text-align: right;
      }
    }
  }
</style>

<template lang="jade">
  .fmodel(@mousemove="move", @mouseup="moveEnd", v-if='value')
    div.f-model-mask
    div(:id="modelId", class="f-model-main", :style="{left: left + 'px', top: top + 'px', margin: margin, width: width, height: height, transform: transform}")
      h2.f-model-title(@mousedown="moveStart") {{ title }}
      span.f-model-btn
        Icon(type="minus-round")
        Icon(type="arrow-expand", v-if="!lock", @click.native="sizeSwitch")
        Icon(type="arrow-shrink", v-else-if="lock", @click.native="sizeSwitch")
        Icon(type="close-round", style="font-size: 14px",  @click.native="close")
      div.f-model-content
        slot
      div.f-model-bottom
        Button(@click="close", type="text", size="small") 关闭
        Button(@click="confirm", type="primary", size="small", style="margin-left: 20px;padding: 0 15px") 确定
</template>

<script>
  export default {
    name: 'fmodel',
    data () {
      return {
        spinShow: false,
        vuegConfig: {  //  进场动画
          forwardAnim: 'zoomIn',  //  options所有配置可以写在这个对象里，会覆盖全局的配置
          backAnim: 'zoomOut',
          disable: false              //  对于嵌套路由，默认为关闭动画，需要在组件的data.vuegConfig中配置disable为false启用
        },
        left: '50%',
        top: '40%',
        margin: 'auto',
        clientX: 0,
        clientY: 0,
        moveLeft: 0, // 左移的距离
        moveTop: 0, // 上移的距离
        ismove: false,
        lock: false,
        transform: 'translate(-50%, -50%)',
        zhuangtai: []
      }
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      modelId: {
        type: String,
        default: 'fModel'
      },
      title: {
        type: String,
        default: '111'
      },
      width: {
        type: String,
        default: '400px'
      },
      height: {
        type: String,
        default: 'auto'
      }
    },
    watch: {
      'value': {
        handler: function (val, oldVal) {
          if (val) {
            this.$emit('input', true)
            console.log(val)
            document.getElementById(this.modelId)
          } else {
            this.$emit('input', false)
          }
        },
        deep: true
      }
    },
    methods: {
      move (event) {
        if (this.ismove) {
          let move = document.getElementById(this.modelId)
          move.style.left = this.left + event.clientX - this.moveLeft + 'px'
          move.style.top = this.top + event.clientY - this.moveTop + 'px'
        }
      },
      moveEnd (event) {
        this.ismove = false
      },
      moveStart (event) {
        if (this.lock) {
          return
        }
        this.left = document.getElementById(this.modelId).offsetLeft
        this.top = document.getElementById(this.modelId).offsetTop
        this.moveLeft = event.clientX
        this.moveTop = event.clientY
        this.ismove = true
      },
      close () {
        let mymodel = document.getElementById(this.modelId)
        mymodel.style.width = '400px'
        mymodel.style.height = 'auto'
        mymodel.style.left = '50%'
        mymodel.style.top = '40%'
        this.left = '50%'
        this.top = '40%'
        this.transform = 'translate(-50%, -50%)'
        this.lock = false
        this.$emit('input', false)
      },
      confirm () {
        alert('确定')
        this.close()
      },
      sizeSwitch () {
        this.fangda(!this.lock)
        let mymodel = document.getElementById(this.modelId).getElementsByClassName('f-model-content')[0]
        console.log(mymodel.offsetHeight)
        this.$emit('resize', {width: mymodel.offsetWidth, height: mymodel.offsetHeight})
      },
      fangda (val) {
        let mymodel = document.getElementById(this.modelId)
        if (val) {
          this.zhuangtai = []
          this.zhuangtai.push(mymodel.style.width)
          this.zhuangtai.push(mymodel.style.height)
          if (this.left === '50%') {
            this.zhuangtai.push('50%')
            this.zhuangtai.push('40%')
          } else {
            this.zhuangtai.push(mymodel.style.left)
            this.zhuangtai.push(mymodel.style.top)
          }
          this.zhuangtai.push(this.transform)
          mymodel.style.width = '100%'
          mymodel.style.height = '100%'
          mymodel.style.left = 0 + 'px'
          mymodel.style.top = 0 + 'px'
          this.transform = null
          this.lock = true
        } else {
          mymodel.style.width = this.zhuangtai[0]
          mymodel.style.height = this.zhuangtai[1]
          if (this.zhuangtai[2] === 0) {
            mymodel.style.left = '50%'
            mymodel.style.top = '40%'
          } else {
            mymodel.style.left = this.zhuangtai[2]
            mymodel.style.top = this.zhuangtai[3]
          }
          this.transform = this.zhuangtai[4]
          this.lock = false
        }
      }
    },
    components: {
    }
  }
</script>
