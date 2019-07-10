<template>
  <el-card shadow="never" class="box-card">
    <div class="add-client-wrap">
      <div class="title">装备调拨</div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div>说明:{{ props.row.dispatchNote }}</div>
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
        label="调出单位"
        prop="fromDeptId">
      </el-table-column>
      <el-table-column
        label="调出时间"
        prop="fromAt">
        <template slot-scope="row">
          {{row.fromAt | time}}
        </template>
      </el-table-column>
      <el-table-column
        label="调入单位"
        prop="intoDeptId">
      </el-table-column>
      <el-table-column
        label="调入时间"
        prop="intoAt">
        <template slot-scope="row">
          {{row.intoAt | time}}
        </template>
      </el-table-column>
      <el-table-column
        label="处理人"
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
        // 接口暂时没有
        recipientWkNo: '',
        equipmentId: '',
        fromDeptId: '',
        fromAt: '',
        intoDeptId: '',
        intoAt: '',
        dispatchNote: '',
        corpId: ''
      }]
    };
  },
  computed: {
  },
  methods: {
    // 获取调度列表
    async getDispatchList () {
      let { data } = await http.get(`/v1/equipment-dispatch/pagi?pageNo=1&pageSize=20`);
      console.log(data);
      let storeStateArrays = ['', '东发52泵', '电子流量计', '机动链锯', '灭火防护头盔', '灭火防护靴', '金属切割机'];
      for (var el of data['list']) {
        let name=await  http.get('/v1/dingtalk/user/detail?userid='+ el.createdBy)
        let intoDeptDetail = await  http.get('/v1/dingtalk/department/detail?deptId='+el.intoDeptId )
        let fromDeptDetail = await  http.get('/v1/dingtalk/department/detail?deptId='+ el.fromDeptId )
        el.equipmentId = storeStateArrays[el.equipmentId];
        el.corpId = name.data.name;
        el.intoDeptId = intoDeptDetail.data.name;
        el.fromDeptId = fromDeptDetail.data.name;
      }
      this.tableData = data['list'] || [];
    }
  },
  async created () {
    this.getDispatchList();
  }
};
</script>
