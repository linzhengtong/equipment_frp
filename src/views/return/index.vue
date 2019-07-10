<template>
  <el-card shadow="never" class="box-card">
    <div class="add-client-wrap">
      <div class="title">装备归还</div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div>说明:{{ props.row.recipientNote }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="编码"
        prop="recipientWkNo">
      </el-table-column>
      <el-table-column
        label="装备名称"
        prop="equipmentId">
      </el-table-column>
      <el-table-column
        label="归还人"
        prop="corpId">
      </el-table-column>
      <el-table-column
        label="归还单位"
        prop="returnDeptId">
      </el-table-column>
      <el-table-column
        label="归还日期"
        prop="returnAt">
        <template slot-scope="row">
          {{row.returnAt | time}}
        </template>
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
        recipientWkNo: '',
        equipmentId: '',
        returnAt: '',
        returnDeptId: '',
        returnNote: '',
        corpId: '',
        returnName: ''
      }]
    };
  },
  computed: {
  },
  methods: {
    // 获取归还列表
    async getReturnList () {
      let { data } = await http.get(`/v1/equipment-return/pagi?pageNo=1&pageSize=10`);

      console.log(data);
      let storeStateArrays = ['', '东发52泵', '电子流量计', '机动链锯', '灭火防护头盔', '灭火防护靴', '金属切割机'];
      for (var el of data['list']) {
        let name=await  http.get('/v1/dingtalk/user/detail?userid='+ el.returnUserid)
        let returnDeptDetail = await  http.get('/v1/dingtalk/department/detail?deptId='+(el.returnDeptId==null?el.returnDeptId: '86390084'))
        el.equipmentId = storeStateArrays[el.equipmentId];
        el.corpId = name.data.name;
        el.returnDeptId = returnDeptDetail.data.name;
      }
      this.tableData = data['list'] || [];
    }
  },
  async created () {
    this.getReturnList();

  }
};
</script>
