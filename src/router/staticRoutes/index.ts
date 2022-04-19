import Wrapper from '@/layout/components/Wrapper/index.vue';
import Home from '@/views/Home.vue';
import Document from '@/views/Document.vue';
import Tab from '@/views/Tab.vue';
import Image from '@/views/Image.vue';
import Button from '@/views/Button.vue';
import Date from '@/views/Date.vue';
import Component from '@/views/Component.vue';
import Table from '@/views/Table.vue';
// import Search from '@/views/Search.vue';
// import syno from '@/views/syno.vue';
import Visual from '@/views/Visualization.vue';
const syno = ()=>import("@/views/syno.vue");
const Search = ()=>import("@/views/Search.vue")
/**
 * 
 * 路由配置规则：
 * 
 * {
 *  path:'',路径
 *  name:'',路由名称，生成menu时menu name
 *  meta:{},额外信息，icon为menu中的icon
 *  children: [], 子路由，menu中的子menu 没有时可为空数组
 * }
 * 
 */


export const staticRoutes = [
  {
    path: '/',
    name: '首页',
    component: Home,
    children: [],
    meta: {
      icon: 'el-icon-s-home'
    }
  },
  {
    path: '/doc', 
    name: '检索',
    redirect: '/doc/doctxt',
    component: Wrapper,
    meta: {
      icon: 'el-icon-s-order'
    },
    children: [
      {
        path: 'doctxt', 
        name: '语料库检索',
        component: Wrapper,
        meta: {
          icon: 'el-icon-s-data'
        },
        children: [
          {
            path: 'doctxtooo',
            name: '单词检索',
            component: Wrapper,
            meta: {
              icon: 'el-icon-s-data'
            },
            children: [
              {
                path: 'docimg1',
                name: '单词检索',
                component: Search,
                children: [],
                meta: {
                  icon: 'el-icon-s-data'
                }
              }
            ]
          },
          {
            path: 'Synonyms',
            name: '同义词和反义词检索',
            component: syno,
            children: [],
            meta: {
              icon: 'el-icon-s-data'
            }
          },
        ]
      },
    ]
  },
    {
    path: '/tab',
    name: '语料库可视化',
    component: Visual,
    children: [],
    meta: {
      icon: 'el-icon-s-release'
    }
  },
  // {
  //   path: '/tab',
  //   name: '选项',
  //   component: Tab,
  //   children: [],
  //   meta: {
  //     icon: 'el-icon-s-release'
  //   }
  // },
  // {
  //   path: '/button',
  //   name: '按钮',
  //   component: Button,
  //   children: [],
  //   meta: {
  //     icon: 'el-icon-s-grid'
  //   }
  // },
  // {
  //   path: '/date',
  //   name: '日期',
  //   component: Date,
  //   children: [],
  //   meta: {
  //     icon: 'el-icon-date'
  //   }
  // },
  // {
  //   path: '/component',
  //   name: '组件',
  //   component: Component,
  //   children: [],
  //   meta: {
  //     icon: 'el-icon-orange'
  //   }
  // },
  // {
  //   path: '/table',
  //   name: '表格',
  //   component: Table,
  //   children: [],
  //   meta: {
  //     icon: 'el-icon-orange'
  //   }
  // }
];
