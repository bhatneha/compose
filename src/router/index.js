import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/components/home'
import about from '@/components/about'
import contact from '@/components/contact'
import welcome from '@/components/welcome'
import compose from '@/components/compose'
import createcomp from '@/components/createcomp'
import kvstore from '@/components/kvstore'

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
    path: '/kvstore',
    name: 'KVStore',
    component: kvstore
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
