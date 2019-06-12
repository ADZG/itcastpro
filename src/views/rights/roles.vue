<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="col">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="margin-top: 15px;">
      <el-button type="success" plain @click="increase_people=true">添加员工</el-button>
    </div>

    <el-table :data="rolesdata" style="width: 100%" border>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="first in scope.row.children" :key="first.id">
            <el-col :span="4">
              <!-- 第一层权限分四份，剩下的给二级和三级权限 -->
              <div class="grid-content bg-purple">
                <el-tag
                  closable
                  :type="'success'"
                  style="margin:5px"
                  @close="cancel(scope.row,first.id)"
                >{{first.authName}}</el-tag>
              </div>
            </el-col>
            <el-col :span="20">
              <div class="grid-content bg-purple-light">
                <!-- 剩下的二级菜单再分8分，剩下的给三级权限 -->
                <el-row v-for=" second in first.children" :key="second.id">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <el-tag
                        closable
                        :type="'primary'"
                        style="margin:5px"
                        @close="cancel(scope.row,second.id)"
                      >{{second.authName}}</el-tag>
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <div class="grid-content bg-purple-light">
                      <!-- 前面分完的16分 -->
                      <el-tag
                        closable
                        :type="'warning'"
                        v-for="third in second.children"
                        :key="third.id"
                        style="margin:5px"
                        @close="cancel(scope.row,third.id)"
                      >{{third.authName}}</el-tag>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="角色" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
               <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="left">
            <el-button type="primary" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="warning" icon="el-icon-delete"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="授权" placement="right">
            <el-button type="primary" icon="el-icon-loading" @click="opentree(scope.row)"></el-button>
          </el-tooltip>
          </template>
       </el-table-column>
    </el-table>

    <el-dialog title="添加员工" :visible.sync="increase_people">
      <el-form
        :model="addform"
        :label-position="labelPosition"
        label-width="80px"
        rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="员工名称" prop="name">
          <el-input v-model="addform.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="员工描述" prop="describe">
          <el-input v-model="addform.roleDesc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="increase_people = false">取 消</el-button>
        <el-button type="primary" @click="addrole">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="授权" :visible.sync="treelist" width="50%">
      <el-tree
        ref="treeright"
        :data="treedata"
        show-checkbox
        node-key="id"
        :default-checked-keys="selectkeys"
        :props="defaultProps"
        style="overflow:auto;height:300px"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="treelist = false">取 消</el-button>
        <el-button type="primary" @click="accredit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getrolesdata,
  cancelright,
  gettreelist,
  addnewpeople,
  authorization
} from '@/api/right.js'
export default {
  data () {
    return {
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        describe: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      roleId: '',
      labelPosition: 'left',
      selectkeys: [],
      increase_people: false,
      addform: {
        roleName: '',
        roleDesc: ''
      },
      treelist: false,
      rolesdata: [],
      treedata: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods: {
    async addrole () {
      this.increase_people = false
      let result = await addnewpeople(this.addform)
      if (result.data.meta.status === 201) {
        this.$message({
          message: result.data.meta.msg,
          type: 'success'
        })
      }
      this.getalllist() // 重新刷新
    }, // 添加角色
    //   获取数据
    async getalllist () {
      let result = await getrolesdata()
      this.rolesdata = result.data.data
    }, // 取消用户授权
    cancel (row, rightid) {
      cancelright(row.id, rightid).then(data => {
        // 返回的是已经取消后的数据了
        row.children = data.data // 取消授权之后，直接刷新
      })
    }, // 获取树状数据
    async opentree (row) {
      this.treelist = !this.treelist
      let result = await gettreelist()
      // console.log(result)
      this.treedata = result.data.data
      this.selectkeys = []
      if (row.children && row.children.length > 0) {
        // 这里的条件，每次会判断children节点是否存在，并且该节点有数据
        // 只要最下面的子节点被选中，上一级的菜单会自动选中展开
        row.children.forEach(first => {
          if (first.children && first.children.length > 0) {
            first.children.forEach(second => {
              if (second.children && second.children.length > 0) {
                second.children.forEach(third => {
                  // 只要找到子节点的id就可以让父节点自动选中
                  this.selectkeys.push(third.id)
                })
              }
            })
          }
        })
      }
      // console.log(row)
      this.roleId = row.id
    }, // 设置默认树状数据的默认数据
    async accredit () {
      this.treelist = false
      // 在设置ref的时候，并不需要绑定: 这里是设置属性，相当于设置了一个id值
      let allkeys = this.$refs.treeright.getCheckedNodes() // 这里用着方法，可以获取到父级权限和子级全选的id
      // console.log(allkeys)得到的是一个对象·下面将该对象，进行处理，拼接成字符串值
      let arr = allkeys.map(value => {
        return value.id + ',' + value.pid
        // 这个方法遍历出数组，并给每个遍历出来的对象进行操作，最后返回出一个操作后的数组
      })
      // 得到的数据格式是以数组包裹的多个数组字符串，需要重新转成字符串，在切割字符串，转成一般形式的数组
      let newarr = arr.join(',').split(',') // ..先将数组以逗号方式隔开形成一个个独立的字符，再切割字符串形成数组
      let finallyarr = [...new Set(newarr)] // 数组去重后全部展开到数组内
      console.log(finallyarr)
      let result = await authorization(this.roleId, finallyarr.join(',')) // 这里在传入时候，应该传入字符串，请求已经包装为对象了
      if (result.data.meta.status === 200) {
        this.$message({
          message: result.data.meta.msg,
          type: 'success'
        })
        this.getalllist()
      }
    }
  },
  mounted () {
    this.getalllist()
  }
}
</script>
<style lang="less" scoped>
.col {
  line-height: 45px;
}
</style>
