<style scoped lang="less">
  @import "../../../assets/color.less";
  .Sider {
    width: 240px;
    height: 100%;
    border-right: 1px solid @divider;
  }
</style>

<template>
  <div class="Sider">
    <Menu theme="light" :active-name="activeName" @on-select="menuToggle">
      <MenuGroup>
        <MenuItem :name="item.value" v-for="(item, index) in list" :key="index">
          {{ item.label }}
        </MenuItem>
      </MenuGroup>
    </Menu>
  </div>
</template>

<script>
  import EChartsList from '../../../assets/data/EChartsList'
  export default {
    name: 'Sider',
    data () {
      return {
        list: EChartsList,
        activeName: EChartsList[0].value
      }
    },
    methods: {
      menuToggle (val) {
        console.log(val)
        this.$router.push({name: val})
      }
    },
    components: {
    }
  }
</script>
