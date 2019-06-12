<template>
    <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="col">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        <el-breadcrumb-item>权限详情</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="margin-top: 15px;">
      <el-button type="success" plain>添加分类</el-button>
    </div>

      <el-table
        :data="rightdata"
        style="width: 100%"

        >
        <el-table-column
          prop="authName"
          label="权限"
          width="180">
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径"
          width="180">
        </el-table-column>
        <el-table-column label="层级" >
        <template  slot-scope="scope">
                <span>{{scope.row.level | rankformdata}}</span>
        </template>
        </el-table-column>
      </el-table>

    </div>
</template>
<script>
import { getrightdata } from '@/api/right.js'
export default {
  data () {
    return {
      rightdata: ''
    }
  },
  methods: {
    async getlist () {
      let result = await getrightdata('list')
      console.log(result)
      this.rightdata = result.data.data
    }
  },
  filters: {
    rankformdata (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else {
        return '三级'
      }
    }
  },
  mounted () {
    this.getlist()
  }
}
</script>
<style lang="less" scoped>
.col{
  line-height: 45px;
}
 .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
