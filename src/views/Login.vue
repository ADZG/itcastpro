<template>
  <div class="login">
    <div class="container">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <img src="../assets/avatar.jpg" alt class="avatar">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" prefix-icon="myicon myicon-user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            prefix-icon="myicon myicon-key"
            @keydown.enter.native="loginSubmit('ruleForm')"
          type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="loginSubmit('ruleForm')" class="login-btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/index.js' // 按需接受
export default {
  // 这里的prop对应的是需要进行规则验证的参数，参数应该和表单的参数一致，这样才能检测到是否符合规则
  data () {
    return {
      ruleForm: {
        password: '',
        username: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginSubmit (ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          login(this.ruleForm).then(result => {
            console.log(result)
            if (result.meta.status === 200) {
              localStorage.setItem('itcastpro_token', result.data.token) // 这里要先写。先设置token令牌，再跳转路由
              this.$router.push({ name: 'Home' })
            } else {
              this.$message.error(result.meta.msg)
            }
          })
        } else {
          this.$message.error('数据输入不合法')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
