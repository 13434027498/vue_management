<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pageNum"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  ></el-pagination>
</template>

<script>
export default {
  name: "",
  props: {
    pageNum:  {
      type: Number,
      default: 1
      },
    pageSize: {
      type: Number,
      default: 5
      },
    total: Number,
    pageSizes: {
      type: Array,
      default: function () { return [5,10,15,20] }
      }
  },
  data() {
    return {
    }
  },
  methods: {
    // 修改显示行数
    handleSizeChange(newSize) {
      this.$emit('SizeChange',newSize)
    },
    // 修改显示页数
    handleCurrentChange(current) {
      this.$emit('CurrentChange',current)
    }
  }
};
</script>

<style scoped>
.el-pagination {
  margin-top: 5px;
}
</style>
    父组件

    <page-ination
      @SizeChange="pageSizeChange"
      @CurrentChange="pageCurrentChange"
      :pageNum="queryMap.pageNum"
      :pageSize="queryMap.pageSize"
      :total="departmentData.total"
      :pageSizes="[this.queryMap.pageSize,7,10,15]"
    ></page-ination>

    pageSizeChange(newSize) {
      this.queryMap.pageSize = newSize;
      this.getDepartmentList();
    },
    pageCurrentChange(current) {
      this.queryMap.pageNum = current;
      this.getDepartmentList();
    }

    data() {
    return {
      queryMap: {
        pageNum: 1,
        pageSize: 5
      }
    };
  },