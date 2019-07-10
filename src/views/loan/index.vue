<template>
  <el-card shadow="never" class="box-card">
    <div class="add-client-wrap">
      <div class="title">装备领用</div>
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
        label="使用人"
        prop="corpId">
      </el-table-column>
      <el-table-column
        label="所属单位"
        prop="recipientDeptId">
      </el-table-column>
      <el-table-column
        label="领用日期"
        prop="recipientAt">
        <template slot-scope="row">
          {{row.recipientAt | time}}
        </template>
      </el-table-column>
      <el-table-column
        label="审核人"
        prop="corpId">
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
        recipientAt: '',
        recipientDeptId: '',
        recipientNote: '',
        corpId: ''
      }]
    };
  },
  computed: {
  },
  methods: {
    // 获取装备列表
    async getRecipientList () {
      let { data } = await http.get(`/v1/equipment-recipient/pagi?pageNo=1&pageSize=20`);
      console.log(data);
      let storeStateArrays = ['', '东发52泵', '电子流量计', '机动链锯', '灭火防护头盔', '灭火防护靴', '金属切割机'];
      for (var el of data['list']) {
        let name=await  http.get('/v1/dingtalk/user/detail?userid='+ el.recipientUserid)
        let returnDeptDetail = await  http.get('/v1/dingtalk/department/detail?deptId='+(el.recipientDeptId==null?el.recipientDeptId: '86390084'))
        el.equipmentId = storeStateArrays[el.equipmentId];
        el.corpId = name.data.name;
        el.recipientDeptId = returnDeptDetail.data.name;
      }
      this.tableData = data['list'] || [];
    }
  },
  async created () {
    this.getRecipientList();
  }
};
</script>
