<template>
  <el-card shadow="never" class="box-card">
    <div class="add-client-wrap">
      <div class="title">新增装备</div>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="识图功能">
        <input type="file" id="imgUpload" accept="image/*" capture="camera"/>
      </el-form-item>
      <el-form-item label="规格型号">
        <el-select v-model="form.modelId" placeholder="请选择规格型号">
          <el-option
            v-for="(item, index) in equipmentModel"
            :key="index"
            :label="item.modelName+' / '+item.modelNo"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="购入时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.boughtAt"
          format="yyyy 年 MM 月 dd 日"
          value-format="timestamp"
          style="width: 100%;">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="报废时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.scrapAt"
          format="yyyy 年 MM 月 dd 日"
          value-format="timestamp"
          style="width: 100%;">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="所属单位">
        <el-select v-model="form.deptId" placeholder="请选择所属单位">
          <el-option
            v-for="(item, index) in departmentList"
            :key="index"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="存放地点">
        <el-input v-model="form.storeLocation"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">装备入库</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import http from 'http';
export default {
  data () {
    return {
      equipmentModel: [],
      departmentList: [],
      form: {
        modelId: '',
        deptId: '',
        storeLocation: '',
        boughtAt: '',
        scrapAt: ''
      }
    };
  },
  mounted () {
    let vm = this;
    document.getElementById('imgUpload').addEventListener('change', function () {
      // 获取图片对象
      let file = this.files[0];
      if (file.type.indexOf('image') !== -1) {
        let reader = new FileReader();
        let image = new Image();
        // 创建隐藏的画布
        let canvasTag = document.createElement('canvas');
        canvasTag.setAttribute('id', 'baiduCanvas');
        canvasTag.setAttribute('style', 'display:none;');
        document.body.appendChild(canvasTag);
        let canvas = document.getElementById('baiduCanvas');
        let ctx = canvas.getContext('2d');
        reader.onload = function (e) {
          let base64Url = reader.result;

          // console.log(base64Url);
          image.onload = function () {
            // 一般宽度小于400px的大小肯定小于4M
            let width = 400;
            let height = Math.ceil(400 / this.width * this.height);
            console.log(height);
            ctx.drawImage(image, 0, 0, width, height);
            let dataURL = canvas.toDataURL();
            ctx.clearRect(0, 0, width, height);
            // 将dataURL传到后台接口
            console.log(dataURL);
            vm.findEquipmentModel(dataURL);
          };
          // 触发图片加载回调
          image.src = base64Url;
        };
        // 触发回调获取base64
        reader.readAsDataURL(file);
      } else {
        alert('请上传图片文件');
      }
    });
  },
  methods: {
    // 查找装备型号
    async findEquipmentModel (imageBase64) {
      let dd = imageBase64.split('base64,');
      // alert(dd[0]);
      // alert(dd[1].substring(0,20));
      let resp = await http.post('/v1/equipment-model/find', {
        imageBase64: dd[1]
      });
      // alert(resp.status);
      //alert(JSON.stringify(resp.data))
      if (resp.data && resp.data.id) {
        this.form.modelId = resp.data['id'];
      } else {
        alert('无匹配型号');
      }
    },
    // 获得装备型号
    async getEquipmentModel () {
      let { data } = await http.get('/v1/equipment-model/pagi?pageNo=1&pageSize=100');
      this.equipmentModel = data['list'];
    },
    // 获取部门列表
    async getDepartmentList () {
      this.departmentList = (await http.get(`/v1/dingtalk/department/list?deptId=1`))['data']['department'] || [];
    },
    async onSubmit () {
      let { data } = await http.post('/v1/equipment', this.form);
      if (data.success) {
        this.$notify({
          title: '成功',
          message: '入库成功',
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
    this.getEquipmentModel();
    this.getDepartmentList();
  }
};
</script>
