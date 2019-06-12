import Vue from 'vue'
import App from './App.vue'
import '@/styles/index.less'
import { router } from '@/router.js'

import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(VueQuillEditor) // 挂载ui的样式资源
Vue.config.productionTip = false
Vue.use(ElementUI)

// 这里直接渲染了app根组件，所有的组件都通过app
new Vue({
  render: h => h(App),
  router // 注入之前挂载的路由
}).$mount('#app')
