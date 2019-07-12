<template>
  <div class="multiSelect-table">
    <el-table ref="multipleSelection" size='mini' align="center" border :data="tableData" style="width: 100%" highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column :prop="item.prop" :sortable="item.sortable" show-overflow-tooltip :label="item.label" :width="handleTableWidth" v-for="(item, index) in tableTitle" :key="index">
        <template slot-scope="scope">
          <div v-if="item.prop.indexOf('[list]') > -1">
            <template v-for="(obj,index) in scope.row[item.prop.substring(6,item.prop.indexOf('.'))]">
              <template v-if="index!==0">,</template>
              {{ obj[item.prop.substring(item.prop.indexOf('.')+1)] }}
            </template>
          </div>
          <div v-else-if="item.prop.indexOf('[formatType]') > -1">
            {{typeArr[scope.row[item.prop.substring(12)]]}}
          </div>
          <div v-else-if="item.prop.indexOf('.') > -1">
            {{scope.row[item.prop.substring(0,item.prop.indexOf('.'))][item.prop.substring(item.prop.indexOf('.')+1)]}}
          </div>
          <div v-else>
            {{scope.row[item.prop]}}
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    tableData: Array,
    tableTitle: Array,
    typeArr: Object
  },
  data() {
    return {
      currentRow: null
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('childData', this.multipleSelection)
    },
    handleTableWidth() {
      let width
      if (this.tableTitle) {
        width = 1000 / this.tableTitle.length
      }
      return width
    }
  }
}
</script>
<style>
.el-table .current-row {
  background: red;
}
.multiSelect-table {
  width: 98%;
  margin: 0 auto;
}
</style>

