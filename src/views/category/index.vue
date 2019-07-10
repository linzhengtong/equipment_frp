<template>
  <el-card shadow="never" class="box-card">
    <div class="add-client-wrap">
      <div class="title">装备分类</div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="分类名称"
        prop="catalogName">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import http from 'http';
export default {
  data () {
    return {
      tableData: [{
        pid: '',
        catalogName: '',
        id: '',
        corpId: '',
        createdAt: '',
        updatedAt: '',
        updatedBy: ''
      }]
    };
  },
  computed: {
  },
  methods: {
    // 获取分类列表
    async getCatalogList () {
      let { data } = await http.get(`/v1/equipment-catalog/0/children`);
      console.log(data);
      this.tableData = data || [];
    }
  },
  async created () {
    this.getCatalogList();
  }
};
</script>
