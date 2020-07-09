import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/components/home'
import about from '@/components/about'
import contact from '@/components/contact'
import welcome from '@/components/welcome'
import compose from '@/components/compose'
import createcomp from '@/components/createcomp'
import kvstore from '@/components/kvstore'
import viewkv from '@/components/viewkv'
import deletekv from '@/components/deletekv'
import createkv from '@/components/createkv'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: welcome
  },
  {
    path: '/home',
    name: 'Home',
    component: home
  },
  {
    path: '/about',
    name: 'About',
    component: about
  },
  {
    path: '/contact',
    name: 'Contact',
    component: contact
  },
  {
    path: '/compose',
    name: 'Compose',
    component: compose
  },
  {
    path: '/createcomp',
    name: 'Createcomp',
    component: createcomp
  },
  {
    path: '/kvstore/:id/:app',
    name: 'KVStore',
    component: kvstore
  },
  {
    path: '/viewkv/:id/:key',
    name: 'ViewKV',
    component: viewkv
  },
  {
    path: '/deletekv/:id/:key',
    name: 'DeleteKV',
    component: deletekv
  },
  {
    path: '/createkv/:id/:app',
    name: 'CreateKV',
    component: createkv
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
