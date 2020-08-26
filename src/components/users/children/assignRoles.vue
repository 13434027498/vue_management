<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
    <span>
      <el-transfer
        v-model="value"
        :data="roles"
        :button-texts="['移除','添加']"
        :titles="['未拥有角色','已拥有角色']"
      ></el-transfer>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="doAssignRoles">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      dialogVisible: false,
      roles: [],
      value: [],
      uid: "",
    };
  },
  methods: {
    // 获取分配角色信息
    async assignRoles(id) {
      const { data: res } = await this.$http.get("user/" + id + "/roles");
      this.dialogVisible = true;
      if (res.code !== 200) {
        return this.$message.error(res.msg);
      }
      this.roles = res.data.roles;
      this.value = res.data.values;
      this.uid = id;
    },
    // 确定角色分配
    async doAssignRoles() {
      const { data: res } = await this.$http.post(
        "user/" + this.uid + "/assignRoles",
        this.value
      );
      this.dialogVisible = false;
      if (res.code !== 200) {
        return this.$message.error("角色分配失败: " + res.msg);
      }
      this.$message.success("角色分配成功");
    },
  },
};
</script>

<style scoped>
</style>