<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="350" @close="closeAll">
    <el-tree
      :data="data"
      :auto-expand-parent="false"
      node-key="id"
      show-checkbox
      :default-expanded-keys="open"
      :expand-on-click-node="false"
      :props="defaultProps"
      highlight-current
      ref="tree"
    ></el-tree>
    <span slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" icon="el-icon-setting" @click="authority">授权</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      // 对话框显示控制
      dialogVisible: false,
      // 权限树
      data: [],
      open: [],
      defaultProps: {
        children: "children",
        label: "menuName",
      },
    };
  },
  props: {
    Id: Number,
  },
  methods: {
    // 获取权限树信息
    async getMenuTree() {
      const { data: res } = await this.$http.get("menu/tree");
      if (res.code == 200) {
        this.data = res.data.tree;
        this.open = res.data.open;
      }
    },
    // 获取角色对应权限列表
    async grant(id) {
      const { data: res } = await this.$http.get("role/findRoleMenu/" + id);
      if (res.code == 200) {
        res.data.mids.forEach((value) => {
          this.$refs.tree.setChecked(value, true);
        });
      }
    },
    // 权限修改
    async authority() {
      const { data: res } = await this.$http.post(
        "role/authority/" + this.Id,
        [].concat(
          this.$refs.tree.getCheckedKeys(),
          this.$refs.tree.getHalfCheckedKeys()
        )
      );
      this.dialogVisible = false
      if (res.code !== 200) {
        return this.$message.error("修改失败: " + res.msg);
      }
      this.$message.success("权限修改完成")
      
    },
    closeAll() {
      this.$refs.tree.getCheckedNodes().forEach((value) => {
        this.$refs.tree.setChecked(value, false);
      });
    },
  },
  created() {
    this.getMenuTree();
  },
  mounted() {},
};
</script>

<style scoped>
</style>