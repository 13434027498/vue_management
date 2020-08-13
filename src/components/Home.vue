<template>
  <el-container class="container">
    <el-header class="header">
      <div class="logo">
        <img src="~@/assets/img/ilogo.png" alt="">
      </div>
      <el-dropdown class="avatar">
        <div>
          <el-avatar :size='50' :src="this.userInfo.avatar"></el-avatar>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>系统首页</el-dropdown-item>
          <el-dropdown-item><span @click="logout">退出登录</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>

    <el-container>
    <!-- 菜单 -->
      <el-aside :width="this.isOpen==true?'64px':'200px'" class="aside">
        <div class="toggle-btn" @click="toggleMenu">|||</div>
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#272c33"
            text-color="rgba(255,255,255,0.7)"
            :collapse="isOpen"
            :collapse-transition="false"
            active-text-color="#ffd04b"
            unique-opened
            >
            <template v-for="item in this.menuList">
              <el-submenu index="1" :key="item.id+''">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.menuName}}</span>
                </template>
                <el-menu-item-group v-for="(item,index) in item.children" :key="index">
                  <el-menu-item index="1-1">{{item.menuName}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </template>
            
          </el-menu>
      </el-aside>
      <el-main>
        {{this.menuList}}
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      menuList: {},
      userInfo: {},
      isOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('user/findMenu')
      if(res.code !== 200) {
        return this.$message.error("获取菜单失败!" + res.msg);
      }
      this.menuList = res.data
    },
    async logout() {
      var res = await this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出登录'
        });
      });
      if(res == 'confirm') {
        window.localStorage.clear();
        this.$router.push('/login')
      }
    }
  },
  created() {
    this.userInfo = this.$store.state.userInfo;
    this.getMenuList()
  }
    
};
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  height: 60px;
  background-color: #272c33;
}

.logo img {
  height: 60px;
}

.avatar {
  margin-top: 5px;
}

.aside {
  /* height: calc(100% - 60px); */
  height: 100%;
  background-color: #272c33;
}

.toggle-btn {
  background-color: #2d3a4b !important;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>