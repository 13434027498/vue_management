<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="10">
          <el-input placeholder="请输入角色查询" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3" style="margin-left:10px">
          <el-button type="success">添加</el-button>
        </el-col>
      </el-row>

      <el-table border :data="roleData">
        <el-table-column label="ID" prop="id" width="50"></el-table-column>
        <el-table-column label="角色名" prop="roleName"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" icon="el-icon-present" @click="showEditRole(scope.row.id)">授权</el-button>
            <el-button type="text" size="mini" icon="el-icon-edit">编辑</el-button>
            <el-button type="text" size="mini" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <page-ination
        :total="total"
        :pageNum="queryMap.pageNum"
        :pageSize="queryMap.pageSize"
        @SizeChange="pageSizeChange"
        @CurrentChange="pageCurrentChange"
      ></page-ination>

      <!-- 编辑权限弹框 -->
      <edit-role ref="editRoleRef" :Id="grantId" :role="roleData"></edit-role>
    </el-card>
  </div>
</template>

<script>
import PageInation from "@/components/common/pagination/Pagination.vue";
import EditRole from "./children/editRole";
import {role} from "@/network/index"
export default {
  name: "",
  components: {
    PageInation,
    EditRole,
  },
  data() {
    return {
      queryMap: {
        roleName: "",
        pageNum: 1,
        pageSize: 5,
      },
      roleData: [],
      total: null,
      grantId: null
    };
  },
  methods: {
    // 获取角色列表信息
    async getRoleData() {
      const res = await role.getRoleData(this.queryMap)
      this.roleData = res.data.rows;
      this.total = res.data.total;
    },
    // 角色权限分配
    showEditRole(id) {
      this.grantId = id
      this.$refs.editRoleRef.grant(this.grantId)
    },
    // 分页数据修改
    pageSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getRoleData();
    },
    pageCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.getRoleData();
    },
  },
  created() {
    this.getRoleData();
  },
};
</script>

<style scoped>
.el-table {
  margin-top: 10px;
}
</style>