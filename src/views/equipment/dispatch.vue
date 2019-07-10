<template>
  <el-card shadow="never" class="box-card">
    <div class="add-client-wrap">
      <div class="title">装备调拨</div>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="调出时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.fromAt"
          format="yyyy 年 MM 月 dd 日"
          value-format="timestamp"
          style="width: 100%;">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="调出单位">
        <el-select v-model="form.fromDeptId" placeholder="请选择所属单位">
          <el-option
            v-for="(item, index) in departmentList"
            :key="index"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="调入时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.intoAt"
          format="yyyy 年 MM 月 dd 日"
          value-format="timestamp"
          style="width: 100%;">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="调入单位">
        <el-select v-model="form.intoDeptId" placeholder="请选择所属单位">
          <el-option
            v-for="(item, index) in departmentList"
            :key="index"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.dispatchNote"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认调拨</el-button>
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
        dispatchNote: '',
        fromAt: '',
        fromDeptId: '',
        intoAt: '',
        intoDeptId: ''
      }
    };
  },
  methods: {
    // 获取部门列表
    async getDepartmentList () {
      this.departmentList = (await http.get(`/v1/dingtalk/department/list?deptId=1`))['data']['department'] || [];
    },
    async onSubmit () {
      let { data } = await http.post('/v1/equipment-allocation', this.form);
      if (data.success) {
        this.$notify({
          title: '成功',
          message: '调度成功',
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
    this.getDepartmentList();
  }
};
</script>
