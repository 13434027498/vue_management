<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统首页</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户信息</span>
      </div>
      <el-table
        :data="tableInfo"
        border>
        <el-table-column
          prop="username"
          label="用户账号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="用户昵称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="department"
          label="所属部门"
          align="center">
        </el-table-column>
        <el-table-column
          prop="roles"
          label="权限"
          align="center">
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <el-row :gutter="20" justify="space-between">
        <el-col :span="6">
          <div>
            <router-link to="/products">
              <img src="../assets/img/1.svg"
                   alt=""
                   width="60px">
            </router-link>
            <p>物资资料</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <router-link to="/products">
              <img src="../assets/img/2.svg"
                   alt=""
                   width="60px">
            </router-link>
            <p>物资库存</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <router-link to="/products">
              <img src="../assets/img/3.svg"
                   alt=""
                   width="60px">
            </router-link>
            <p>物资入库</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <router-link to="/products">
              <img src="../assets/img/4.svg"
                   alt=""
                   width="60px">
            </router-link>
            <p>物资发放</p>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      userInfo: [],
      tableInfo: []
    }
  },
  created() {
    this.userInfo = this.$store.state.userInfo;
    var roles = this.userInfo.isAdmin ? "超级管理员" : this.userInfo.roles;
    this.tableInfo.push({
      username: this.userInfo.username,
      nickname: this.userInfo.nickname,
      department: this.userInfo.department,
      roles: roles
    });
  }

}

</script>

<style scoped>
.el-card {
  margin: 10px 0;
}
.el-row {
  text-align: center;
}
</style>