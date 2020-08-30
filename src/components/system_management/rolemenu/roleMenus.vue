<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限菜单</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-tree
          :data="data"
          accordion
          :auto-expand-parent="false"
          node-key="id"
          show-checkbox
          :default-expanded-keys="open"
          :expand-on-click-node="false"
          :render-content="renderContent"
          :props="defaultProps"
          highlight-current
          ref="tree"
        ></el-tree>
    </el-card>
  </div>
</template>

<script>
  import { menu } from "@/network/index";
export default {
  name: "",
  data() {
    return {
      data: [],
      open: [],
      defaultProps: {
          children: 'children',
          label: 'menuName'
        }
    }
  },
  methods: {
    // 获取权限树信息
    async getMenuTree() {
      const res = await menu.getMenuTree()
      if(res.code == 200) {
        this.data = res.data.tree
        this.open = res.data.open
        console.log(res.data);
      }
    },
    // 树节点内容区的渲染 Function
    renderContent(h, { node, data}) {
      return (
        <span class="custom-tree-node">
          <span>
            <i class={data.icon}></i>&nbsp;&nbsp;&nbsp;{node.label}
            {node.data.type == 0 ?  <el-tag style='margin-left:20px;'  effect='plain' size='mini'>菜单</el-tag>:
                    <el-tag style='margin-left:20px;' type='warning' effect='plain' size='mini'>权限  [{node.data.perms}]</el-tag>

            }
          </span>
        </span>
      );
    }
  },
  created() {
    this.getMenuTree()
  }
};
</script>

<style scoped>
</style>