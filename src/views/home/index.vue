<template>
  <div class="home" style="">
    <el-container class="content" id="aa">
      <div class="home_icon">
        <img  src="../../assets/logo1.png">
      </div>
      <el-header class="home_titel" >
        <div style="width: 100%;align-content: center;text-align: center" >学用结合&emsp;&emsp;规范高效&emsp;&emsp;紧贴实战&emsp;&emsp;保障有力</div>
      </el-header>
      <el-main class="mainInfo" >
        <el-form :inline="true" :model="formInline" class="demo-form">
          <el-form-item class="home_find">
            <input v-model="searchVal" placeholder="提示:请输入装备名称" style="border-radius:0px;width: 300px;height: 35px"/>
            <div class="camera" @click="$refs.file.click()"></div>
          </el-form-item>
          <el-form-item style="padding-left: 0px;margin-left: 0px;">
            <input type="file"  ref="file" id="imgUpload" accept="image/*" capture="camera" style="padding-bottom: 1px;display: none"/>
          </el-form-item>
          <el-form-item id="home_button">
            <el-button style="border-radius: 0px;background-color:#0851cb;border-color:white;" type="primary" @click="onSubmit">查询</el-button>
            <el-button style="border-radius: 0px;background-color:#0851cb;border-color:white;" type="primary" @click="openAdd">新增装备</el-button>
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer class="home_footer">
        <div style="width:100%;text-align: center; font-size: larger">执勤装备掌上通</div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import http from 'http';
export default {
  name: 'home',
  data () {
    return {
      searchVal: '',
      modelId: '',
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    onSubmit () {
      if(this.searchVal==""||this.searchVal==null){
        this.$notify({
          title: '警告',
          message: "搜索内容不能为空",
          type: 'warning',
          duration: 2000
        });
      }else{
        this.$router.push({path: 'equipment',query: {"searchVal": this.searchVal}});
      }
    },
    onScan () {
      console.log("触发识别图片")
      this.$emit('onScan')
    },
    scan () {
      console.log("触发")
    },
    // 前往新增设备
    openAdd() {
      this.$router.push({
        name: 'equipmentAdd'
      });
    },
    async findEquipmentModel (imageBase64) {
      let dd = imageBase64.split('base64,');
      // alert(dd[0]);
      // alert(dd[1].substring(0,20));
      let resp = await http.post('/v1/equipment-model/find', {
        imageBase64: dd[1]
      });
      // alert(resp.status);
      // alert(JSON.stringify(resp.data))
      if (resp.data && resp.data.id) {
        console.log(resp.data)
        this.modelId = resp.data['id'];
        this.searchVal = resp.data['modelName']
      } else {
        alert('无匹配型号');
      }
    },
  },
  components: {
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
}
</script>
<style>
  html,body,#app,.home{
    height: 100%;
    background-color: #0851cb;
  }
  .content{
    width: 100%;
    height: 80%;
    justify-content: center;
  }
  .home_icon{
    float: left;
    width: 50px;
    height: 100px;
    margin: 30px;
  }
  .home_titel{
    width: 100%;
    color: white;
    font-size: 35px;
    position: relative;
    top: 30px;
    font-family:"方正粗黑宋简体";
    align-content: center;
    align-items: center;
  }
  .mainInfo{
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .zbmc{
    font-size: 20px;
    font-family:"黑体";
    color: white;
  }
  .home_find{
    font-weight: bold;
    font-size: 25px;
  }
  #home_button{
    color: white;
    font-family:"黑体";
    font-weight: bold;

  }
  .home_footer{
    width: 100%;
    height: 20%;
    font-size: 20px;
    color: white;
    font-family:"黑体";
    font-weight: bold;
  }
  .camera{
    background-image:url('../../assets/images/camera.png');
    position:absolute;
    width:30px;
    height:30px;
    top:4px;
    left:260px;
    z-index:99;
  }
</style>
