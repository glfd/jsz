import util from './util'
import {Notice} from "iview";

export default {
  demo: async (vm, data) => {  // 登录   user/login
    vm.$Spin.show()
    await util.ajax.post('user/login', data)
      .then(response => {
        //  请求成功
        if (response) {
          vm.$store.commit('cleanTagData')
        }
      })
      .catch(error => {
        // 请求失败
        console.log(error, 'demo')
      })
    vm.$Spin.hide()
  }
}
