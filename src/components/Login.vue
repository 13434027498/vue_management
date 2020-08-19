<template>
  <div id="login">
    <el-form 
      ref="userLoginFormRef" 
      class="el-form"
      status-icon
      :rules="loginRules"
      :model="userLoginForm"
    >
      <h1 class="login-title">新冠-物资管理系统</h1>
      <h3>系统登录</h3>
      <el-form-item prop="username">
        <el-input 
          type="text"
          placeholder='请输入账号'
          v-model="userLoginForm.username"
          @keyup.enter.native="handleSubmit"
          prefix-icon="iconfont el-icon-user"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder=' 请输入密码'
          v-model="userLoginForm.password"
          @keyup.enter.native="handleSubmit"
          prefix-icon="iconfont el-icon-lock"
        ></el-input>
      </el-form-item>
      <el-form-item label-position="right" label-width="200px">
        <el-button 
          type="primary"
          @click="handleSubmit"
          :loading="loading"
          class="el-icon-mobile-phone"
        >登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      userLoginForm: {
        username: "jack",
        password: "123456"
      },
      loading: false,
      loginRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur"}
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    resetForm() {
      this.$refs.userLoginFormRef.resetFields()
    },
    handleSubmit() {
      this.$refs.userLoginFormRef.validate( valid => {
        if(!valid) {
          return;
        }else{
          this.Login()
        }
      })
    },
    async Login() {
      this.loading = true;
      //发起登入请求
      const { data: res } = await this.$http.post(
        // "user/login",this.userLoginForm
        "user/login?username=" +
          this.userLoginForm.username +
          "&password=" +
          this.userLoginForm.password
      );
      console.log(res);
      if (res.code == 200) {
        this.$message({
          title: "登入成功",
          message: "欢迎你进入系统",
          type: "success"
        })
        //保存token
        localStorage.setItem("JWT_TOKEN", res.data);
        this.getUserInfo()
      } else {
        this.$message.error({
          title: "登入失败",
          message: res.msg,
          type: "error"
        });
      }
      this.loading = false;
    },
    async getUserInfo() {
      const {data: res} = await this.$http.get("user/info");
      if(res.code !== 200) {
        return this.$message.error("获取用户信息失败: " + res.msg)
      }
      // this.userInfo = res.data;
      console.log(res.data);
      this.$store.commit("setUserInfo",res.data)
      this.$router.push('/home')
    }
  }
}

</script>

<style scoped>
#login{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-title {
  position: absolute;
  color: #fff;
  top: -100px;
  text-align: center;
  width: 370px;
}

.el-form {
  position: relative;
  border-radius: 5px;
  width: 370px;
  padding: 40px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
}
</style>