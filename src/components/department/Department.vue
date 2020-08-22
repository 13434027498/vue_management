<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>部门管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 查询 -->
      <el-row>
        <el-col :span="10">
          <el-input
            placeholder="请输入部门查询"
            list="departments"
            v-model="queryMap.name"
            clearable
            @clear="search"
          >
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
          <datalist id="departments">
            <option v-for="(item,index) in departmentData.rows" :key="index" :value="item.name"></option>
          </datalist>
        </el-col>
        <el-col :span="3" style="margin-left:10px">
          <el-button type="success" @click="showAddDepartment">添加</el-button>
        </el-col>
      </el-row>
      <!-- 部门表格信息 -->
      <el-table :data="departmentData.rows" style="width: 100%" border>
        <el-table-column prop="id" label="ID" width="60"></el-table-column>
        <el-table-column prop="phone" label="办公电话" min-width="120"></el-table-column>
        <el-table-column prop="name" label="部门名称"></el-table-column>
        <el-table-column prop="total" label="人数" width="80" sortable align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="110" sortable></el-table-column>
        <el-table-column prop="modifiedTime" label="修改时间" min-width="110" sortable></el-table-column>
        <el-table-column prop="mgrName" label="部门负责人" min-width="100"></el-table-column>
        <el-table-column prop="address" label="办公地址" min-width="100"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <el-button type="text" size="mini" icon="el-icon-edit" @click="edit(scope.row.id)">编辑</el-button>
            <el-button type="text" size="mini" icon="el-icon-delete" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <page-ination
        @SizeChange="pageSizeChange"
        @CurrentChange="pageCurrentChange"
        :pageNum="queryMap.pageNum"
        :pageSize="queryMap.pageSize"
        :total="departmentData.total"
        :pageSizes="[this.queryMap.pageSize,7,10,15]"
      ></page-ination>
      <!-- 添加部门 -->
      <add-department
        :deans="deans"
        :dialogFormVisible="addDialogFormVisible"
        @CloseShow="InshowAddDepartment"
        @addSuccess="getDepartmentList"
      ></add-department>
      <!-- 修改部门信息 -->
      <change-department
        :deans="deans"
        :dialogFormVisible="editDialogFormVisible"
        :changeDepartmentForm="editDepartmentFrom"
        @CloseShow="InshowEditDepartment"
        @changeSuccess="getDepartmentList"
      ></change-department>
    </el-card>
  </div>
</template>

<script>
import PageInation from "@/components/common/pagination/Pagination.vue";
import AddDepartment from "./children//AddDepartment.vue";
import ChangeDepartment from "./children/ChangeDepartment";
export default {
  name: "",
  components: {
    PageInation,
    AddDepartment,
    ChangeDepartment,
  },
  data() {
    return {
      queryMap: {
        pageNum: 1,
        pageSize: 5,
        name: "",
      },
      deans: [],
      departmentData: [],
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      editDepartmentFrom: {},
    };
  },
  methods: {
    search() {
      (this.queryMap.pageNum = 1), this.getDepartmentList();
    },
    // 获取部门信息列表
    async getDepartmentList() {
      const { data: res } = await this.$http.get(
        "department/findDepartmentList",
        {
          params: this.queryMap,
        }
      );

      if (res.code !== 200) {
        return this.$message.error("获取部门列表失败");
      }

      this.departmentData = res.data;
    },
    // 获取部门主任列表
    async getDeanList() {
      // const res = this.$http.get('department/findDeanList');
      // console.log(res); 返回promise

      const { data: res } = await this.$http.get("department/findDeanList");
      if (res.code !== 200) {
        this.$message.error("获取部门主任列表失败");
      }
      this.deans = res.data;
    },
    // 获取部门修改原数据
    async edit(id) {
      const { data: res } = await this.$http.get("department/edit/" + id);
      if (res.code !== 200) {
        return this.$message.error("获取部门编辑信息失败" + res.msg);
      }
      this.editDepartmentFrom = res.data;
      console.log(this.editDepartmentFrom);
      this.editDialogFormVisible = true;
    },
    // 删除部门
    async del(id) {
      let resConfirm =await this.$confirm(
        "此操作将永久删除该部门, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
      if (resConfirm == "confirm") {
        const { data: res } = await this.$http.delete(
          "department/delete/" + id
        );
        if (res.code !== 200) {
          return this.$message.error("部门删除失败" + res.msg);
        }
        this.$message.success("部门删除成功");
        this.getDepartmentList();
      }
    },
    // 添加部门
    showAddDepartment() {
      this.addDialogFormVisible = true;
    },
    InshowAddDepartment() {
      this.addDialogFormVisible = false;
    },
    // 修改部门
    showEditdialogFormVisible() {
      this.editDialogFormVisible = true;
    },
    InshowEditDepartment() {
      this.editDialogFormVisible = false;
    },
    // 分页
    pageSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getDepartmentList();
    },
    pageCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.getDepartmentList();
    },
  },
  created() {
    this.getDepartmentList();
    this.getDeanList();
  },
};
</script>

<style scoped>
.el-table {
  margin-top: 10px;
}
</style>