<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 查询表单 -->
      <el-form :inline="true" :model="queryMap">
        <el-form-item label="部门">
          <el-select
            placeholder="请选择所属部门"
            v-model="queryMap.departmentId"
            clearable
            @change="searchUser"
            @clear="searchUser"
          >
            <el-option
              v-for="item in departments"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input
            placeholder="请输入用户名查询"
            @keyup.enter.native="searchUser"
            v-model="queryMap.username"
            @clear="searchUser"
            clearable
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="昵称">
          <el-input
            placeholder="请输入昵称查询"
            @keyup.enter.native="searchUser"
            v-model="queryMap.nickname"
            @clear="searchUser"
            clearable
          ></el-input>
        </el-form-item>-->
        <el-form-item label="性别">
          <el-radio v-model="queryMap.sex" label="1">男</el-radio>
          <el-radio v-model="queryMap.sex" label="0">女</el-radio>
          <el-radio v-model="queryMap.sex" label>全部</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="searchUser">查询</el-button>
          <el-button type="success" @click="dialogVisible = true">添加</el-button>
        </el-form-item>
      </el-form>
      <!-- 数据表格 -->
      <el-table :data="userList.rows" border style="width:100%">
        <el-table-column prop="id" label="#" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名" width="100px"></el-table-column>
        <el-table-column prop="sex" label="性别" width="70px">
          <template slot-scope="scope">
            <el-tag size="mini" type="success" v-if="scope.row.sex == 1">男</el-tag>
            <el-tag size="mini" type="warning" v-else>女</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="departmentName" label="所属部门" width="80px"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phoneNumber" label="联系方式"></el-table-column>
        <el-table-column prop="isban" label="是否禁用" width="80px">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" @change="changeUserStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="175px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit-outline"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
            <el-tooltip effect="dark" :enterable="false" content="分配角色" placement="top">
              <el-button type="warning" size="mini" icon="el-icon-s-tools" @click="showAssignRoles(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryMap.pageNum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="queryMap.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userList.total"
      ></el-pagination>

      <!-- 添加用户框 -->
      <el-dialog title="添加用户" @close="closeDialog" :visible.sync="dialogVisible" width="580px">
        <el-form
          :model="addForm"
          :rules="addFormRules"
          label-position="right"
          ref="addFormRef"
          label-width="80px"
        >
          <el-row>
            <el-col :span="11">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="addForm.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="部门" prop="departmentId">
                <el-select v-model="addForm.departmentId" placeholder="请选择所属部门">
                  <el-option
                    v-for="department in departments"
                    :key="department.id"
                    :label="department.name"
                    :value="department.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="昵称" prop="nickname">
                <el-input v-model="addForm.nickname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="addForm.sex">
                  <el-radio :label="1">帅哥</el-radio>
                  <el-radio :label="0">美女</el-radio>
                </el-radio-group>
                <!-- <el-radio v-model="addForm.sex" :label="1">男</el-radio>
                <el-radio v-model="addForm.sex" :label="0">女</el-radio>-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phoneNumber">
            <el-input v-model="addForm.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item label="生日" prop="birth">
            <el-date-picker
              v-model="addForm.birth"
              value-format="yyyy年MM月dd日"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑用户角色 -->
      <assign-roles ref="assignRolesRef"></assign-roles>
    </el-card>
  </div>
</template>

<script>
import AssignRoles from "./children/assignRoles";
export default {
  name: "",
  components: {
    AssignRoles
  },
  data() {
    // 自定义验证规则需要定义在return前
    // email验证规则
    let checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    // phoneNumber验证规则
    let checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[34578]\d{9}$$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字字符"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("手机号码格式错误"));
          }
        }
      }, 100);
    };
    return {
      departments: [],
      userList: [],
      // 添加用户弹出框
      dialogVisible: false,
      btnDisabled: false,
      addDialogVisible: false,
      // 查询表单信息
      queryMap: {
        pageNum: 1,
        pageSize: 5,
        username: "",
        sex: "",
        nickname: "",
      },
      // 添加用户表单数据
      addForm: {
        username: "",
        nickname: "",
        password: "",
        email: "",
        phoneNumber: "",
        sex: "",
        birth: "",
      },
      // 添加用户表单验证规则
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        departmentId: [
          { required: true, message: "请选择部门", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        birth: [{ required: true, message: "请填写出生日期", trigger: "blur" }],
        email: [
          {
            required: true,
            validator: checkEmail,
            trigger: "blur",
          },
        ],
        phoneNumber: [
          {
            required: true,
            validator: checkPhone,
            trigger: "blur",
          },
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 5,
            max: 10,
            message: "长度在 5 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 获取部门信息
    async getDepartments() {
      const { data: res } = await this.$http.get("department/findAll");
      if (res.code !== 200) {
        return this.$message.error("获取部门列表失败！");
      }
      this.departments = res.data;
    },
    // 获取用户信息
    async getUserList() {
      const { data: res } = await this.$http.get("user/findUserList", {
        params: this.queryMap,
      });
      if (res.code !== 200) {
        return this.$message.error("获取用户列表失败！");
      }
      this.userList = res.data;
    },
    // 表单查询
    searchUser() {
      this.queryMap.pageNum = 1;
      this.getUserList();
    },
    // 重置查询
    reset() {
      this.queryMap = {
        pageNum: 1,
        pageSize: 5,
        username: "",
        sex: "",
        nickname: "",
      };
      this.getUserList();
    },
    // 修改显示行数
    handleSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getUserList();
    },
    // 修改显示页数
    handleCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.getUserList();
    },
    // 改变用户状态
    async changeUserStatus(row) {
      const { data: res } = await this.$http.put(
        "user/updateStatus/" + row.id + "/" + row.status
      );
      if (res.code !== 200) {
        this.$message.error("更新用户状态失败:" + res.msg);
        row.status = !row.status;
      } else {
        let message = row.status ? "用户状态已禁用" : "用户状态已启用";
        this.$message.success({
          title: "操作成功",
          message: message,
        });
      }
    },
    // 关闭对话框
    closeDialog() {
      // 清除验证
      this.$refs.addFormRef.clearValidate();
      // 清空表单
      this.$refs.addFormRef.resetFields();
    },
    // 添加用户
    async addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        } else {
          this.btnDisabled = true;
          const { data: res } = await this.$http.post("user/add", this.addForm);
          if (res.code == 200) {
            this.$message.success({
              title: "操作成功",
              message: "用户添加成功",
            });
            this.$refs.addFormRef.resetFields();
            this.getUserList;
          } else {
            return this.$message.error("用户添加失败:" + res.msg);
          }
          this.btnDisabled = false;
          this.addDialogVisible = false;
        }
      });
    },
    // 删除用户
    async del(userId) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
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

      if (confirmResult == "confirm") {
        const { data: res } = await this.$http.delete("user/delete/" + userId);
        if (res.code == 200) {
          this.$message.success({
            title: "操作成功",
            message: "用户删除成功",
          });
          this.getUserList();
        } else {
          this.$message.error(res.msg);
        }
      }
      console.log(userId);
    },
    // 编辑用户角色
    showAssignRoles(userId) {
      this.$refs.assignRolesRef.assignRoles(userId)
      console.log(userId);
    }
  },
  created() {
    this.getDepartments();
    this.getUserList();
  },
};
</script>

<style scoped>
.el-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>