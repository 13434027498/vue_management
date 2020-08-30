<template>
  <el-menu
    background-color="#272c33"
    text-color="rgba(255,255,255,0.7)"
    :collapse="isOpen"
    :collapse-transition="false"
    active-text-color="#409eff"
    :default-active="activePath"
    :router="true"
    unique-opened
    >
    <template v-for="item in this.menuList">
      <el-submenu 
        v-if="item.children && item.children.length" 
        :index="item.id+''"
        :key="item.id"
        >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.menuName}}</span>
        </template>
        
        <!-- 二级菜单 -->
        <template v-for="itemChild in item.children">
          <el-submenu 
            v-if="itemChild.children && itemChild.children.length" 
            :index="itemChild.url+''" 
            :key="itemChild.id"
            @click="savePath(itemChild.url)"
            >
            <template slot="title">
              <i :class="itemChild.icon"></i>
              <span>{{itemChild.menuName}}</span>
            </template>
              
              <!-- 三级菜单 -->
              <el-menu-item 
                v-for="itemChild_Child in itemChild.children" 
                :index="itemChild_Child.url+''" 
                :key="itemChild_Child.id"
                @click="savePath(itemChild_Child.url)"
                >
                <i :class="itemChild_Child.icon"></i>
                <span slot="title">{{itemChild_Child.menuName}}</span>
              </el-menu-item>
          </el-submenu>
          
          <el-menu-item 
            v-else 
            :index="itemChild.url+''" 
            :key="itemChild.id"
            @click="savePath(itemChild.url)"
            >
            <i :class="itemChild.icon"></i>
            <span slot="title">{{itemChild.menuName}}</span>
          </el-menu-item>
        </template>
      </el-submenu>
      
      <el-menu-item 
        v-else 
        :index="item.url+''" 
        :key="item.id"
        >
        <i :class="item.icon"></i>
        <span slot="title">{{item.menuName}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      activePath: ''
    }
  },
  props: {
    menuList: {},
    isOpen: {}
  },
  methods: {
    savePath(path) {
      window.sessionStorage.setItem('activePath',path)
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
  }
    

}

</script>

<style scoped>

</style>