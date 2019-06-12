<template>
  <div>
    <el-steps :active="activeName-1">
      <el-step title="步骤 1" icon="el-icon-edit"></el-step>
      <el-step title="步骤 2" icon="el-icon-upload"></el-step>
      <el-step title="步骤 3" icon="el-icon-picture"></el-step>
      <el-step title="步骤 4" icon="el-icon-success"></el-step>
      <el-step title="步骤 5" icon="el-icon-printer"></el-step>
    </el-steps>

    <el-tabs v-model="activeName" tab-position="left" type="border-card">
      <el-tab-pane label="添加商品" name="1">
        <el-form ref="form" :model="listform" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="listform.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="listform.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="listform.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="重量">
            <el-input v-model="listform.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="所属分类">
            <el-cascader
              expand-trigger="hover"
              :options="goodlist"
              v-model="selectedlist"
              :props="goodprop"
              :filterable="true"
              :clearable="true"
              @change="getvalue"
            ></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="上传文件" name="2">
        <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload"
          :headers="setToken()"
          list-type="picture"
          :on-success="uploadSucess"
        >
        <!-- 图片上传这里，需要手动设置token值才行 -->
        <!-- 给请求头添加事件 -->
        <!-- action="http://localhost:8888/api/private/v1/upload"需要重新定位图片服务器的位置 -->
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

      </el-tab-pane>
      <el-tab-pane label="商品描述" name="3">
        <quill-editor v-model="listform.goods_introduce" style="height:150px"></quill-editor>
      </el-tab-pane>
      <el-tab-pane label="消息中心" name="4">消息中心</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="5">定时任务补偿</el-tab-pane>
    </el-tabs>

    <el-button type="success" @click="addgood">添加商品</el-button>
  </div>
</template>
<script>
import { getgoodlist, addonegood } from '@/api/goods.js'
export default {
  data () {
    return {
      selectedlist: [],
      goodlist: [],
      goodprop: {
        children: 'children',
        label: 'cat_name',
        value: 'cat_id'
      },
      activeName: '',
      listform: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_cat: '',
        pics: [],
        goods_introduce: ''
      }
    }
  },
  methods: {
    async getlist () {
      this.goodsopen = true
      let result = await getgoodlist([3])
      this.goodlist = result.data.data
      // console.log(result)
    },
    getvalue (value) {
      this.listform.goods_cat = value.join(',')
    },
    setToken () {
      // 由于上传文件里面有自己的异步方法，所以没有使用axios
      // 在请求头设置token 设置上传的请求头部
      return { 'Authorization': localStorage.getItem('itcastpro_token') }
    },
    // 文件上传成功后处理函数，添加在钩子上
    uploadSucess (response, file, fileList) {
      console.log(response)
      //   这里是参数是一个数组，里面放一个对象
      this.goodlist.pics.push({ pics: response.data.tmp_path })
      console.log(this.listform)
    },
    async addgood () {
      let result = await addonegood(this.listform)
      console.log(result)
    }
  },
  mounted () {
    this.getlist()
  }
}
</script>
<style lang="less" scoped>
</style>
