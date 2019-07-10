<template>
  <el-card shadow="never" class="box-card">
    <div class="add-client-wrap">
      <div class="title">装备维护</div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div>说明:{{ props.row.mrNote }}</div>
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
        label="维修类别"
        prop="mrCategory">
        <template slot-scope="row">
          {{row.mrCategory==1?'维修':'保养'}}
        </template>
      </el-table-column>
      <el-table-column
        label="处理人"
        prop="corpId">
      </el-table-column>
      <el-table-column
        label="花费金额"
        prop="mrSpent">
      </el-table-column>
      <el-table-column
        label="维修日期"
        prop="mrAt">
        <template slot-scope="row">
          {{row.mrAt | time}}
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
        // 接口暂时没有
        recipientWkNo: '',
        equipmentId: '',
        // 1-维修、2-保养
        mrCategory: '',
        mrAt: '',
        mrUserid: '',
        corpId: '',
        mrSpent: '',
        mrNote: ''
      }]
    };
  },
  computed: {
  },
  methods: {
    // 获取归还列表
    async getMaintainList () {
      let { data } = await http.get(`/v1/equipment-mr/pagi?pageNo=1&pageSize=10`);
      console.log(data);
      let storeStateArrays = ['', '东发52泵', '电子流量计', '机动链锯', '灭火防护头盔', '灭火防护靴', '金属切割机'];
      for (var el of data['list']) {
        let name=await  http.get('/v1/dingtalk/user/detail?userid='+ el.mrUserid)
        el.equipmentId = storeStateArrays[el.equipmentId];
        el.corpId = name.data.name;
      }
      this.tableData = data['list'] || [];
    }
  },
  async created () {
    this.getMaintainList();
  }
};
</script>
