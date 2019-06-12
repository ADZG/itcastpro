<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="col">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <!-- 外面一层是卡片 -->
      <!-- 给嵌套组件展示的位置 -->
    <router-view></router-view>
    </el-card>

  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.col {
  line-height: 45px;
}
</style>
