<template>
  <el-card shadow="never" class="box-card">
    <div class="add-client-wrap">
      <div class="title">装备详情</div>
    </div>
    <el-form label-width="160px">
      <el-form-item label="装备名称：">
        <div>{{equipmentDetail.modelName}}</div>
      </el-form-item>
      <el-form-item label="装备型号：">
        <div>{{equipmentDetail.modelNo}}</div>
      </el-form-item>
      <el-form-item label="装备用途：">
        <div>{{equipmentDetail.usage}}</div>
      </el-form-item>
      <el-form-item label="性能参数：">
        <div>{{equipmentDetail.techPara}}</div>
      </el-form-item>
      <el-form-item label="维修保养：">
        <div>{{equipmentDetail.mrNote}}</div>
      </el-form-item>
      <el-form-item label="常见故障及排查方法：" >
        <div>{{equipmentDetail.instructionUrl}}</div>
      </el-form-item>
      <el-form-item label="装备图片：">
        <div><img :src="equipmentDetail.imageUrl" alt="装备图片："></div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import http from 'http';
export default {
  data () {
    return {
      equipmentDetail: {
        modelName: '',
        modelNo: '',
        usage: '',
        techPara: '',
        mrNote: '',
        instructionUrl: '',
        imageUrl: ''
      }
      // code: sessionStorage.getItem('code'),
      // departmentList: sessionStorage.getItem('departmentList'),
      // userInfo: sessionStorage.getItem('userInfo')
    };
  },
  methods: {
    // 获得装备详情
    async getEquipmentDetail (id) {
      let { data } = await http.get(`/v1/equipment?uuid=` + id);
      this.equipmentDetail = data.equipmentModel;
    }
  },
  created () {
    let id = this.$route.query['id'];
    this.getEquipmentDetail(id);
  }
};
</script>
