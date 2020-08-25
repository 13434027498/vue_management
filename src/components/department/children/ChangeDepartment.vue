<template>
  <el-dialog title="部门信息修改" width="450px" :visible.sync="dialogFormVisible" :before-close="InShow">
    <el-form
      label-width="80px"
      ref="changeDepartmentFormRef"
      :model="changeDepartmentForm"
      :rules="changeFromRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="changeDepartmentForm.name"></el-input>
      </el-form-item>
      <el-form-item label="部门主任" prop="mgrId">
        <el-select v-model="changeDepartmentForm.mgrId">
          <el-option v-for="item in deans" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="办公电话" prop="phone">
        <el-input v-model="changeDepartmentForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="办公地址" prop="address">
        <el-input v-model="changeDepartmentForm.address"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="InShow">取 消</el-button>
      <el-button type="primary" @click="changeDepartment">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "",
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false,
    },
    deans: Array,
    changeDepartmentForm:Object
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
      // DepartmentForm: {},
      changeFromRules: {
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
    InShow() {
      this.$emit("CloseShow");
    },
    changeDepartment() {
      this.$refs.changeDepartmentFormRef.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http.put(
          "department/update/" + this.changeDepartmentForm.id,
          this.changeDepartmentForm
        );
        console.log(this.changeDepartmentForm);
        if (res.code !== 200) {
          return this.$message.error("部门信息更新失败" + res.msg);
        }
        this.$message.success("部门更新成功");
        this.InShow();
        this.$emit("changeSuccess");
      });
    },
  },
  created() {
  },
};
</script>

<style scoped>
</style>