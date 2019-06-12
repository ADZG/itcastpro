<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="col">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="margin-top: 15px;">
      <el-button type="success" plain @click="getlist">添加分类</el-button>
    </div>

    <el-dialog title="添加分类" :visible.sync="goodsopen">
      <el-form :model="goodsform" :label-position="labelPosition" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="goodsform.cat_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属分类">
          <el-cascader
            expand-trigger="hover"
            :options="goodlist"
            v-model="selectedlist"
             :props="goodprop"
             :filterable="true"
             :clearable="true"
             @change="getnewselect"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="goodsopen = false">取 消</el-button>
        <el-button type="primary" @click="addgood">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getgoodlist } from '@/api/goods.js'
export default {
  data () {
    return {
      array: [],
      labelPosition: 'left',
      goodsopen: false,
      goodsform: {
        cat_name: ''
      },
      selectedlist: [],
      goodlist: [],
      goodprop: {
        children: 'children',
        label: 'cat_name',
        value: 'cat_id'
      }
    }
  },
  methods: {
    addgood () {
      console.log(this.selectedlist)
    },
    async getlist () {
      this.goodsopen = true
      let result = await getgoodlist(2)
      this.goodlist = result.data.data
      // console.log(result)
    },
    getnewselect () {
      console.log()
    }
  },
  mounted () {
    // this.getlist()
  }
}
</script>
<style lang="less" scoped>
.col {
  line-height: 45px;
}
</style>
