<template>
  <el-card shadow="never" class="box-card">
    <div class="add-client-wrap">
      <div class="title">归还装备</div>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="归还时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.returnAt"
          format="yyyy 年 MM 月 dd 日"
          value-format="timestamp"
          style="width: 100%;">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="归还部门">
        <el-select v-model="form.deptId" placeholder="请选择所属部门">
          <el-option
            v-for="(item, index) in departmentList"
            :key="index"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="归还人">
        <el-input v-model="form.returnUserid"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.returnNote"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认归还</el-button>
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
        returnUserid: '',
        returntNote: '',
        returnAt: '',
        deptId: '',
        returnName: ''
      }
    };
  },
  methods: {
    // 获取部门列表
    async getDepartmentList () {
      this.departmentList = (await http.get(`/v1/dingtalk/department/list?deptId=1`))['data']['department'] || [];
    },
    async getDetailUser (userId) {
      alert(http.get('/v1/dingtalk/user/detail?userid=',userId))
      this.form.returnName = await  http.get('/v1/dingtalk/user/detail?userid=',userId)
    },
    async onSubmit () {
      let { data } = await http.post('/v1/equipment-return', this.form);
      if (data.success) {
        this.$notify({
          title: '成功',
          message: '归还成功',
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
    console.log("123456")
    this.getDetailUser("013434160526325138");
    try {
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      this.getDetailUser("013434160526325138");

      console.log("--------"+this.getDetailUser(userInfo.userid))
      this.form.returnUserid = userInfo.userid || '';
      this.form.deptId = userInfo.department[0] || '';

    } catch (e) {}
    this.getDepartmentList();
  }
};
</script>
