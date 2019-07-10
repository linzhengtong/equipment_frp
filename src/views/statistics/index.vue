<template>
  <el-card shadow="never" class="box-card">
    <div class="add-client-wrap">
      <div class="title">实力统计</div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="装备名称"
        prop="modelName">
      </el-table-column>
      <el-table-column
        label="装备型号"
        prop="modelNo">
      </el-table-column>
      <el-table-column
        label="所属单位"
        prop="deptName">
      </el-table-column>
      <el-table-column
        label="在库状态"
        prop="storeState">
      </el-table-column>
      <el-table-column
        label="总数量"
        prop="count">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import http from 'http';
// import * as dd from 'dingtalk-jsapi';
export default {
  data () {
    return {
      currentPage: 1,
      total: 0,
      nickName: 'TEST',
      tableData: [{
        modelName: '',
        modelNo: '',
        deptName: '',
        modelClass: '',
        count: '',
        storeState: ''

      }]
    };
  },
  computed: {
  },
  methods: {
    handleClick(row) {
      console.log(row);
      alert(row['deptName'])
    },
    // 获取装备统计列表
    async getEquipmentList (currentPage) {
      let { data } = await http.post(`/v1/equipment/count`);
      console.log(data);
      let storeStateArray = ['', '在库', '在用', '载车', '维修'];
      for (var el of data) {
        el.storeState = storeStateArray[el.storeState];
      }
      this.tableData = data || [];
    }
  },
  async created () {
    this.getEquipmentList(this.currentPage);
  }
};
</script>
