<template>
  <el-dialog title="添加部门" width="450px" :visible.sync="dialogFormVisible" :before-close="InShow">
    <el-form
      label-width="80px"
      ref="addDepartmentFormRef"
      :model="addDepartmentForm"
      :rules="addFromRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="addDepartmentForm.name"></el-input>
      </el-form-item>
      <el-form-item label="部门主任" prop="mgrId">
        <el-select v-model="addDepartmentForm.mgrId">
          <el-option v-for="item in deans" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="办公电话" prop="phone">
        <el-input v-model="addDepartmentForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="办公地址" prop="address">
        <el-input v-model="addDepartmentForm.address"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="InShow">取 消</el-button>
      <el-button type="primary" @click="addDepartment">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { department } from "@/network/index";
export default {
  name: "",
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false,
    },
    deans: Array,
  },
  data() {
    // 电话号码验证规则
    let checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[34578]\d{9}$$/;
      if (!value) {
        callback(new Error("联系方式不能为空"));
      }
      if (!Number.isInteger(+value)) {
        callback(new Error("请输入数字字符"));
      }
      if (!phoneReg.test(value)) {
        callback(new Error("号码格式不正确"));
      }
      callback();
    };
    return {
      // 添加表单信息
      addDepartmentForm: {},
      // 部门主任列表
      // deans: [],
      addFromRules: {
        name: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        address: [
          { required: true, message: "请输入办公地址", trigger: "blur" },
          {
            min: 4,
            max: 12,
            message: "长度在 4 到 12 个字符",
            trigger: "blur",
          },
        ],
        mgrId: [{ required: true, message: "请选择部门主任", trigger: "blur" }],
        phone: [
          {
            required: true,
            trigger: "blur",
            validator: checkPhone,
          },
        ],
      },
    };
  },
  methods: {
    // async getDeanList() {
    //   // const res = this.$http.get('department/findDeanList');
    //   // console.log(res); 返回promise

    //   const { data: res } = await this.$http.get("department/findDeanList");
    //   if (res.code !== 200) {
    //     this.$message.error("获取部门主任列表失败");
    //   }
    //   this.deans = res.data;
    // },
    InShow() {
      this.addDepartmentForm = {};
      this.$refs.addDepartmentFormRef.clearValidate();
      this.$emit("CloseShow");
    },
    addDepartment() {
      this.$refs.addDepartmentFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const res = await department.addDepartment(this.addDepartmentForm);
        console.log(this.addDepartmentForm);
        if (res.code == 200) {
          this.$message.success("部门添加成功");
        }
        this.addDepartmentForm = {};
        this.InShow();
        this.$emit("addSuccess");
      });
    },
  },
  created() {
    // this.getDeanList();
  },
};
</script>

<style scoped>
</style>