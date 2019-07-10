<template>
  <el-container class="home-container">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#0851cb"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="0"  style="font-size: 20px;color: white;padding-right: 100px"><router-link to="/main/home"><span>装备管理系统</span></router-link></el-menu-item>
      <el-menu-item index="1"><router-link to="/main/home"><span>首页</span></router-link></el-menu-item>
      <el-menu-item index="2"><router-link to="/main/equipment"><span>基础信息</span></router-link></el-menu-item>

      <el-submenu index="3" >
        <template slot="title"><span>使用记录</span></template>
        <el-menu-item index="3-1" ><router-link to="/main/loan-list"><span style="color: white">领用记录</span></router-link></el-menu-item>
        <el-menu-item index="3-2"><router-link to="/main/giveBack-list"><span style="color: white">归还记录</span></router-link></el-menu-item>
        <el-menu-item index="3-3"><router-link to="/main/maintain-list"><span style="color: white">维修记录</span></router-link></el-menu-item>
        <el-menu-item index="3-4"><router-link to="/main/dispatch-list"><span style="color: white">调拨记录</span></router-link></el-menu-item>
        <el-menu-item index="3-5"><router-link to="/main/dispatch-list"><span style="color: white">报废记录</span></router-link></el-menu-item>
      </el-submenu>
      <el-menu-item index="4"><router-link to="/main/statistics-list"><span>实力统计</span></router-link></el-menu-item>
      <el-menu-item index="5"><router-link to="/main/statistics-list"><span>在线学习</span></router-link></el-menu-item>
      <el-menu-item index="6"><router-link to="/main/purchase-list"><span>在线采购</span></router-link></el-menu-item>
      <el-menu-item index="7" style="float: right" disabled=""><span style="font-size: 20px">{{nickName}}</span></el-menu-item>
    </el-menu>
    <el-container>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
    <el-footer class="home-footer" style="background: #0851cb;height: 60px;line-height: 60px;padding-left: 20px;color: #ffffff;font-size: 14px;">©Coyperight 2019 装备管理系统</el-footer>
  </el-container>
</template>

<script>
import '@/assets/stylus/home.styl';
import * as dd from 'dingtalk-jsapi';
import http from 'http';
export default {
  data () {
    return {
      activeIndex2: '3',
      menuToggle: false,
      nickName: '开发环境',
      userInfo: {
        'errcode': 0,
        'unionid': 'gcGnMx54VwIg6iSYmJliP41giEiE',
        'roles': [
          {
            'id': 252791575,
            'name': '????',
            'groupName': '??',
            'type': 102
          }
        ],
        'userid': '04193701351036392',
        'isLeaderInDepts': '{86390084:false}',
        'isBoss': false,
        'isSenior': false,
        'department': [
          86390084
        ],
        'orderInDepts': '{86390084:176356448799959512}',
        'errmsg': 'ok',
        'active': true,
        'avatar': '',
        'isAdmin': true,
        'tags': {
        },
        'isHide': false,
        'name': '???',
        'position': ''
      },
      department: [
        {
          id: 1234,
          name: '部署部',
          parentid: 1
        }

      ]
    };
  },
  watch: {
    $route () {
      this.menuToggle = false;
    }
  },
  methods: {
    toggle () {
      this.menuToggle = !this.menuToggle;
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.activeIndex2=key
    },
    // JSAPI鉴权
    async dingtalkLogin () {
      let url = location.href.split('#')[0];
      let { data } = await http.get(`/v1/dingtalk/login-info?url=${url}&nonceStr=123456`);
      dd.config({
        agentId: 270948660,
        corpId: 'dingfca97a82a2e64a4d35c2f4657eb6378f',
        timeStamp: data.timeStamp,
        nonceStr: '123456',
        signature: data.signature,
        type: 0,
        jsApiList: [
          'runtime.info',
          'biz.contact.choose',
          'device.notification.confirm',
          'device.notification.alert',
          'device.notification.prompt',
          'biz.ding.post',
          'biz.util.openLink'
        ]
      });
    }
  },
  created () {
    let self = this;
    this.dingtalkLogin();
    dd.ready(function () {
      dd.runtime.permission.requestAuthCode({
        corpId: 'dingfca97a82a2e64a4d35c2f4657eb6378f',
        onSuccess: async (info) => {
          // alert(JSON.stringify(info));
          let userInfo = (await http.post(`/v1/dingtalk/auth?code=${info.code}`))['data'];
          // 用户信息
          // alert(JSON.stringify(data));
          self.nickName = userInfo['name'];
          sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
          sessionStorage.setItem('code', info['code']);
          // 获取部门列表
          let departmentList = (await http.get(`/v1/dingtalk/department/list?deptId=1`))['data']['department'];
          sessionStorage.setItem('departmentList', JSON.stringify(departmentList));
        },
        onFail: function (err) {
          alert.log(err);
        }
      });
      dd.biz.contact.departmentsPicker({
        title: '测试选部门',
        corpId: 'dingfca97a82a2e64a4d35c2f4657eb6378f',
        multiple: true,
        limitTips: '超出了',
        maxDepartments: 100,
        pickedDepartments: [],
        disabledDepartments: [],
        requiredDepartments: [],
        appId: 270948660,
        permissionType: 'GLOBAL',
        onSuccess: function (result) {
          console.log(result);
        },
        onFail: function (err) {
          console.log('错误' + err);
        }
      });
    });
    dd.error(function (error) {
      alert('dd error: ' + JSON.stringify(error));
    });
  }
};
</script>

<style>

/*重写框架el-main样式*/
.el-main {
  /*该值原本20px*/
  padding: 2px;
}

/*重写el-card__body样式*/
.el-card__body {
  padding: 5px;
}

.header-nav-list li {


}
.header-nav-list li a{
  text-decoration: none;
  color: #666;
  text-align: center;
  display: block;
}

a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}


@media screen and (max-width: 756px) {
  .home-container .header-nav {
    display: none;
  }
  .home-container .hear-nav-btn {
    display: inline-block;
  }
}
@media screen and (min-width: 756px) {
  .home-container .hear-nav-btn {
    display: none;
  }
  .header-nav-list {
    display: none;
  }
}
</style>
