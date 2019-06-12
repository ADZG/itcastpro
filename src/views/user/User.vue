<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="col">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="query" class="input-with-select" style="width:300px" clearable
     @keyup.enter.native="serach" >
        <el-button slot="append" icon="el-icon-search" @click="serach"></el-button>
      </el-input>
      <el-button type="success" plain @click="adddialogFormVisible=true">添加账号</el-button>
    </div>
    <!-- 添加列表菜单 -->
    <el-dialog title="添加角色" :visible.sync="adddialogFormVisible">
      <el-form :model="addform" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="addform.username" auto-complete="off"  ></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="addform.password" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addform.email" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addform.mobile" auto-complete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add_staff('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 数据展示列表 -->
    <el-table :data="userlist" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="create_time" label="日期" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="手机"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changestatus($event,scope.row.id)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" @click="getperson(scope.row.id)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="warning" icon="el-icon-delete" @click="delperson(scope.row.id)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
            <el-button type="primary" icon="el-icon-share" @click="distribute(scope)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑菜单 -->
    <el-dialog title="编辑用户" :visible.sync="editdialogFormVisible">
      <el-form :model="editform" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="editform.username" auto-complete="off" style="width:218px" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editform.email" auto-complete="off" style="width:230px"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editform.mobile" auto-complete="off" style="width:230px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editsubmitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

      <!-- 分配角色的下拉列表 -->
    <el-dialog title="分配角色" :visible.sync="allotdialogFormVisible">
      <el-form :model="alloform" label-position="labelPosition" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="alloform.username" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-select v-model="alloform.rid" placeholder="请选择">
            <el-option
              v-for="item in selectdata"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
            <!-- label是展示给用户看的数据,VALUE是对应选择后的id，同步到了alloform.rid -->
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="allotdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitallo">确 定</el-button>
      </div>
    </el-dialog>

      <!-- 分页列表 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import {
  getlist,
  getuserdata,
  edituser,
  deluser,
  switchuser,
  allroles,
  addstaff,
  apportion
} from '@/api/index.js'
export default {
  data () {
    return {
      labelPosition: 'left',
      addform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      adddialogFormVisible: false,
      alloform: {
        username: '',
        id: '',
        rid: ''
      },
      value: '',
      selectdata: [],
      allotdialogFormVisible: false,
      rules: {
        username: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }, {
          pattern: /^[a-zA-Z]\w{5,17}$/, message: '密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)'
        }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '请输入标准的邮箱地址' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码' }]
      },
      editdialogFormVisible: false,
      editform: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      },

      userstatu: true,
      userlist: [],
      query: '',
      pagenum: 1,
      pagesize: 2,
      total: 0
    }
  },
  methods: {
    // 封装页面数据刷新的函数
    init: function () {
      getlist({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(result => {
        this.userlist = result.data.users
        this.total = result.data.total
      })
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.init()
    },
    serach () {
      this.init()
    },
    // 获取点击编辑根据id获取的数据
    getperson (id) {
      getuserdata(id).then(res => {
        this.editdialogFormVisible = true
        // 这里获取数据后，id值就已经传入到了editform里面了。
        this.editform = res.data
      })
    },
    delperson (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deluser(id).then(res => {
            if (res.meta.status === 200) {
              this.init()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 在提交的时候，先检测一遍用户是否有输入值
    editsubmitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 如果通过用户有更改值，则调用这个更新的请求
          edituser(this.editform).then(data => {
            if (data.meta.status === 200) {
              this.init() // 成功刷新列表
              this.dialogFormVisible = false
              this.$message({
                message: data.meta.msg,
                type: 'success'
              })
            } else {
              this.$message.error('出错')
            }
          })
        } else {
          return false
        }
      })
    }, // 改变开关状态
    changestatus (type, id) {
      switchuser(id, type).then(data => {
        if (data.meta.status === 200) {
          this.init() // 成功刷新列表
          this.dialogFormVisible = false
          this.$message({
            message: data.meta.msg,
            type: 'success'
          })
        }
      })
    }, // 获取下拉列表
    distribute (scope) {
      this.allotdialogFormVisible = true
      this.alloform.username = scope.row.username
      this.alloform.id = scope.row.id
      this.alloform.rid = scope.row.rid
    },
    submitallo () {
      apportion(this.alloform.id, this.alloform.rid).then((data) => {
        if (data.meta.status === 200) {
          this.init() // 成功刷新列表
          this.allotdialogFormVisible = false
          this.$message({
            message: data.meta.msg,
            type: 'success'
          })
        }
      })
    },
    // 添加员工
    add_staff (formName) {
      // console.log(this.addform)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          addstaff(this.addform).then((data) => {
            console.log(data)
            if (data.meta.status === 201) {
              this.init() // 成功刷新列表
              this.adddialogFormVisible = false
              this.$message({
                message: data.meta.msg,
                type: 'success'
              })
              // 清空输入框的内容
              this.$refs[formName].resetFields()
            }
          })
        } else {
          return false
        }
      })
    }
  },
  mounted () {
    this.init()
    allroles().then((res) => {
      this.selectdata = res.data
    })
  }
}
</script>
<style lang="less" scoped>
.col {
  line-height: 45px;
}
</style>
