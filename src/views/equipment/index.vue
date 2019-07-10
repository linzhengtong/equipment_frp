<template>
  <el-card shadow="never" class="box-card">
    <div class="add-client-wrap">
      <el-row>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="title">装备信息</div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <div style="padding-right: 10px">
            <el-button icon="el-icon-circle-plus-outline" @click="openAdd" plain size="small"
                       type="primary">新增装备
            </el-button>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10" style="padding-top: 5px">
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <div style="padding-left: 10px">
            所属单位:
            <el-select v-model="search.deptId" placeholder="请选择所属单位">
              <el-option
                v-for="(item, index) in departmentList"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <label>装备名称：</label><input v-model="searchVal" placeholder="提示:请输入装备名称" style="border-radius:0px;width: 300px;height: 35px"/>
          <el-button style="border-radius: 0px;background-color:#0851cb;border-color:white;margin-right: 180px" type="primary" @click="onSubmit">查询</el-button>
        </el-col>
      </el-row>

    </div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="装备编号"
        prop="uuid">
      </el-table-column>
      <el-table-column
        label="所属单位"
        prop="deptName">
      </el-table-column>
      <el-table-column
        label="装备分类"
        prop="catalogName">
      </el-table-column>
      <el-table-column
        label="装备名称"
        prop="modelName">
      </el-table-column>
      <el-table-column
        label="装备型号"
        prop="modelNo">
      </el-table-column>
      <el-table-column
        label="装备状态"
        prop="storeState">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="70">
        <template slot-scope="scope">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="openDetail(scope.row.uuid)">详情</el-dropdown-item>
              <el-dropdown-item v-if="scope.row.storeState=='在库' " @click.native="openReceive(scope.row.id)">领用
              </el-dropdown-item>
              <el-dropdown-item v-else @click="openGiveBack(scope.row.id)">归还</el-dropdown-item>
              <el-dropdown-item @click="openMaintain(scope.row.id)">维修</el-dropdown-item>
              <el-dropdown-item @click="openDispacth(scope.row.id)">调拨</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:10px;"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
  import http from 'http';
  // import * as dd from 'dingtalk-jsapi';
  export default {
    data() {
      return {
        currentPage: 1,
        total: 0,
        nickName: 'TEST',
        restaurants: [],
        zcmc: '',
        timeout: null,
        searchVal: null,
        departmentList: [],
        search: {
          deptId: ''
        },
        tableData: [{
          corpId: '',
          storeLocation: '',
          storeState: '',
          updatedAt: '',
          updatedBy: '',
          equipmentModel: {
            attention: '',
            modelClass: '',
            modelName: '',
            modelNo: '',
            mrNote: '',
            techPara: '',
            usage: ''
          }
        }]
      };
    },
    computed: {

    },
    methods: {
      handleCurrentChange(val) {
        this.currentPage = val;
        let searchVal=this.$route.query.searchVal
        if(searchVal==null||searchVal==''){
          this.getEquipmentList(val,"");
        }else{
          this.getEquipmentList(val,searchVal);
        }
      },
      // 获取装备列表
      async getEquipmentList(currentPage,searchVal) {
        let {data} = await http.get(`/v1/equipment/pagi?pageNo=${currentPage}&pageSize=10&modelName=`+searchVal);
        console.log(data);
        let storeStateArrays = ['', '在库', '在用', '载车', '维修'];
        for (var el of data['list']) {
          el.storeState = storeStateArrays[el.storeState];
        }
        this.tableData = data['list'] || [];
        this.total = data['totalRow'] || 0;
      },
      // 前往新增设备
      openAdd() {
        this.$router.push({
          name: 'equipmentAdd'
        });
      },
      // 前往设备详情
      openDetail(id) {
        this.$router.push({
          name: 'equipmentDetail',
          query: {
            id
          }
        });
      },
      // 前往设备调度
      openDispacth(id) {
        this.$router.push({
          name: 'equipmentDispacth',
          query: {
            id
          }
        });
      },
      // 前往设备归还
      openGiveBack(id) {
        this.$router.push({
          name: 'equipmentGiveBack',
          query: {
            id
          }
        });
      },
      // 前往设备维修
      openMaintain(id) {
        this.$router.push({
          name: 'equipmentMaintain',
          query: {
            id
          }
        });
      },
      // 前往设备借用
      openReceive(id) {
        this.$router.push({
          name: 'equipmentReceive',
          query: {
            id
          }
        });
      },
      async getDepartmentList() {
        this.departmentList = (await http.get(`/v1/dingtalk/department/list?deptId=1`))['data']['department'] || [];
      },
      onSubmit () {
        if(this.searchVal==""||this.searchVal==null){
          this.$notify({
            title: '警告',
            message: "搜索内容不能为空",
            type: 'warning',
            duration: 2000
          });
        }else{
          this.getEquipmentList(this.currentPage,this.searchVal);
        }
      },
      onScan () {
        console.log("触发识别图片")
        this.$emit('onScan')
      },
      scan () {
        console.log("触发")
      },

    },
    async created() {
      let searchVal=this.$route.query.searchVal
      if(searchVal==null||searchVal==''){
        this.getEquipmentList(this.currentPage,"");
      }else{
        this.getEquipmentList(this.currentPage,searchVal);
      }
      // this.getEquipmentList(this.currentPage,null);
      this.getDepartmentList()

    }
  };
</script>

<style>
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .camera{

  }
</style>
