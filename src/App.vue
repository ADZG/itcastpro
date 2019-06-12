<template>
  <div id="app">
    <!-- appvue是启始的根组件 -->
    <!-- 空白占位符，给其他的组件使用 -->
    <!-- app已经在前面渲染了 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">

</style>
