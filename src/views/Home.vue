<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div class="logo">
        <img src="~@/assets/img/ilogo.png" alt />
      </div>
      <el-dropdown class="avatar">
        <div>
          <el-avatar :size="50" :src="this.userInfo.avatar"></el-avatar>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>系统首页</el-dropdown-item>
          <el-dropdown-item>
            <span @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>

    <el-container>
      <!-- 侧边菜单 -->
      <el-aside :width="this.isOpen==true?'64px':'200px'">
        <div class="toggle-btn" @click="toggleMenu">|||</div>
        <home-menu :menuList="menuList" :isOpen="isOpen"></home-menu>
      </el-aside>
      <!-- 主体部分 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeMenu from "../components/common/menu/Menu";
import {user} from '@/network/index'
export default {
  name: "Home",
  components: {
    HomeMenu,
  },
  data() {
    return {
      menuList: [],
      userInfo: {},
      isOpen: false,
      activePath: "",
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    async getMenuList() {
      const res = await user.getMenuList()
      if (res.code == 200) {
        this.menuList = res.data;
      }
    },
    async logout() {
      var res = await this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消退出登录",
        });
      });
      if (res == "confirm") {
        localStorage.clear()
        this.$router.push("/login");
      }
    },
  },
  created() {
    this.userInfo = this.$store.getters.getUserInfo;
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
};
</script>

<style scoped>
.home-container {
  width: 100vw;
  height: 100vh;
  min-width: 1033px;
}

.el-header {
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

.el-aside {
  height: calc(100vh - 60px);
  /* height: 100%; */
  overflow-y: auto;
  background-color: #272c33;
}
.el-aside::-webkit-scrollbar {
  display: none;
}
.el-menu {
  border-right: 0;
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

.el-main {
  background-color: #fff;
  height: calc(100vh - 60px);
}
</style>