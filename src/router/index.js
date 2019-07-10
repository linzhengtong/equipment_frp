import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout/Layout';
import home from '@/views/home/index';
import equipment from '@/views/equipment/index';
import equipmentAdd from '@/views/equipment/add';
import equipmentDetail from '@/views/equipment/detail';
import equipmentDispacth from '@/views/equipment/dispatch';
import equipmentGiveBack from '@/views/equipment/giveBack';
import equipmentMaintain from '@/views/equipment/maintain';
import equipmentReceive from '@/views/equipment/receive';
import classify from '@/views/category/index';
import loan from '@/views/loan/index';
import giveBack from '@/views/return/index';
import maintain from '@/views/maintain/index';
import dispatch from '@/views/allocation/index';
import statistics from '@/views/statistics/index';
import purchase from '@/views/purchase/index'

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      name: 'main',
      path: '/main',
      component: Layout,
      redirect: '/main/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: home
        },
        {
          path: 'equipment',
          name: 'equipment',
          component: equipment
        },
        {
          path: 'equipment-add',
          name: 'equipmentAdd',
          component: equipmentAdd
        },
        {
          path: 'equipment-detail',
          name: 'equipmentDetail',
          component: equipmentDetail
        },
        {
          path: 'equipment-dispacth',
          name: 'equipmentDispacth',
          component: equipmentDispacth
        },
        {
          path: 'equipment-return',
          name: 'equipmentGiveBack',
          component: equipmentGiveBack
        },
        {
          path: 'equipment-maintain',
          name: 'equipmentMaintain',
          component: equipmentMaintain
        },
        {
          path: 'equipment-receive',
          name: 'equipmentReceive',
          component: equipmentReceive
        },
        {
          path: 'category-list',
          name: 'classify',
          component: classify
        },
        {
          path: 'loan-list',
          name: 'loan',
          component: loan
        },
        {
          path: 'return-list',
          name: 'giveBack',
          component: giveBack
        },
        {
          path: 'maintain-list',
          name: 'maintain',
          component: maintain
        },
        {
          path: 'allocation-list',
          name: 'dispatch',
          component: dispatch
        },
        {
          path: 'statistics-list',
          name: 'statistics',
          component: statistics
        },
        {
          path: 'purchase-list',
          name: 'purchase',
          component: purchase
        }
      ]
    }
  ]
});
