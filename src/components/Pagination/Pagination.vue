<template>
  <div class="block">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="parseInt(total)">
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    total: Number,
    pageSize: Number,
    pageNum: Number
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.$emit('pageSizeSearchFn', val)
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.$emit('pageNumSearch', val)
    }
  }
}
</script>
<style>
.block {
  text-align: center;
  margin: 30px;
}
</style>


