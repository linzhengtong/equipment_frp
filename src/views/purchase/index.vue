<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="采购主题" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="采购单位" prop="region">
      <el-select v-model="ruleForm.deptId" placeholder="请选择所属单位">
        <el-option
          v-for="(item, index) in departmentList"
          :key="index"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="采购时间" required>
      <el-col :span="11">
        <el-form-item prop="date">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="采购装备" prop="delivery">
      <el-transfer
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入城市拼音"
        v-model="value"
        :titles="['装备库', '已选择装备']"
        :data="data">
      </el-transfer>
    </el-form-item>
    <el-form-item label="采购原由" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即申请</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import http from 'http';
    export default {
        name: "index",
        data() {
          const generateData = _ => {
              const data = [];
              const equipments = ['东发52泵', '电子流量计', '灭火防护靴', '机动链锯'];
              const categoryIds = ['0000001', '0000002', '0000003', '0000004'];
              equipments.forEach((city, index) => {
                data.push({
                  label: city,
                  key: index,
                  categoryIds: categoryIds[index]
                });
              });
              return data;
            };
          return {

            departmentList: [],
            ruleForm: {
              name: '',
              deptId: '',
              date: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            },
            rules: {
              name: [
                {required: true, message: '请输入采购主题', trigger: 'blur'},
                {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
              ],
              deptId: [
                {required: true, message: '采购单位', trigger: 'change'}
              ],
              date: [
                {type: 'date', required: true, message: '请选择采购日期', trigger: 'change'}
              ],
              type: [
                {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
              ],
              resource: [
                {required: true, message: '请选择活动资源', trigger: 'change'}
              ],
              desc: [
                {required: true, message: '请填写采购原由', trigger: 'blur'}
              ]
            },
            data: generateData(),
            value: [],
            filterMethod(query, item) {
              return item.categoryIds.indexOf(query) > -1;
            }
          };
        },
        methods: {
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                alert('submit!');
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          },
          async getDepartmentList() {
            this.departmentList = (await http.get(`/v1/dingtalk/department/list?deptId=1`))['data']['department'] || [];
          },
        },
        created() {
          this.getDepartmentList()
        }
    }
</script>

<style scoped>

</style>
