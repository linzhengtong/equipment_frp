<template>
  <el-card shadow="never" class="box-card">
    <div class="add-client-wrap">
      <div class="title">领用装备</div>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="领用时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.recipientAt"
          format="yyyy 年 MM 月 dd 日"
          value-format="timestamp"
          style="width: 100%;">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="领用单位">
        <el-select v-model="form.recipientDeptId" placeholder="请选择所属单位">
          <el-option
            v-for="(item, index) in departmentList"
            :key="index"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="领用人">
        <el-input v-model="form.recipientUserid"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.recipientNote"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认领用</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import http from 'http';
export default {
  data () {
    return {
      departmentList: [],
      form: {
        equipmentId: this.$route.query['id'],
        recipientUserid: '',
        recipientNote: '',
        recipientAt: '',
        recipientDeptId: ''
      }
    };
  },
  methods: {
    // 获取部门列表
    async getDepartmentList () {
      this.departmentList = (await http.get(`/v1/dingtalk/department/list?deptId=1`))['data']['department'] || [];
    },
    async onSubmit () {
      let { data } = await http.post('/v1/equipment-recipient', this.form);
      if (data.success) {
        this.$notify({
          title: '成功',
          message: '领用成功',
          type: 'success',
          duration: 2000
        });
        setTimeout(() => {
          this.$router.push({name: 'equipment'});
        }, 2000);
      } else {
        this.$notify({
          title: '警告',
          message: data.message,
          type: 'warning',
          duration: 2000
        });
      }
    }
  },
  created () {
    try {
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      this.form.recipientUserid = userInfo.userid || '';
      this.form.recipientDeptId = userInfo.department[0] || '';
    } catch (e) {}
    this.getDepartmentList();
  }
};
</script>
