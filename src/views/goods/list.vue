<template>
  <div class="list">
    <el-button type="success" @click='$router.push({name:"Add"})'>添加商品</el-button>
    <el-table :data="goodslist" stripe style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="480"></el-table-column>
      <el-table-column prop="goods_price" label="价格" width="180"></el-table-column>
      <el-table-column prop="goods_number" label="数量"></el-table-column>
      <el-table-column prop="goods_weight" label="重量"></el-table-column>
      <el-table-column prop="add_time" label="创建时间"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllgoods } from '@/api/goods.js'
export default {
  data () {
    return {
      goodslist: [],
      obj: {
        query: '',
        pagenum: 1,
        pagesize: 6
      }

    }
  },
  methods: {
    getAlllist () {
      getAllgoods(this.obj).then((res) => {
        this.goodslist = res.data.data.goods
        console.log(res)
      })
    }
  },
  mounted () {
    this.getAlllist()
  }
}
</script>
<style lang="less" scoped>
</style>
