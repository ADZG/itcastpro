<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logo"></div>
        <el-menu
          class="el-menu-vertical-demo"
          :router="true"
          :collapse="isCollapse"
          :unique-opened="true"
          :background-color="'#fff'"

        >
          <el-submenu :index="item.id+''"  v-for="item in menulist" :key="item.id" >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item-group>
              <!-- 这里再次使用遍历出来的item，当做数组在遍历一次里面的数据 -->
              <el-menu-item :index="'/home/'+second.path" v-for="second in item.children" :key="second.id">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>{{second.authName}}</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="myicon myicon-menu toggle-btn" @click='isCollapse = !isCollapse'></span>
          <span class="system-title ">后台管理</span>
          <div>
            <span>你好</span>
            <a href="#">admin</a>
          </div>
        </el-header>
        <el-main>
          <!-- 给其他的子组件留的占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { menubar } from '@/api/index.js'
export default {
  data () {
    return {
      isCollapse: true,
      menulist: []
    }
  },
  methods: {
    async getmenu () {
      let result = await menubar()
      // console.log(result)
      this.menulist = result.data.data
    }
  },
  mounted () {
    this.getmenu()
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    // background-color: #989898;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: #989898;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: #989898;
  }
  .welcome {
    color: #989898;
  }
}
</style>
