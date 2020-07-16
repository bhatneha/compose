<template>
   <div>
      <div>
         <b-navbar toggleable="xl" class="border-bottom border-dark">
            <h1>
               <b-navbar-brand><b>App: </b><b id="text-color" >{{ $route.params.app }}</b></b-navbar-brand>
            </h1>
            <div>
               <router-link v-bind:to="{ name: 'CreateKV', params: { id: $route.params.id, app: $route.params.app } }">
                  <md-button class="md-icon-button md-raised">
                     <md-icon>add_box</md-icon>
                  </md-button>
               </router-link>
            </div>
            <b-navbar-nav class="ml-auto">
               <b-nav-form>
                  <li class="nav-item">
                     <span class="nav-link nav-link-inner--text">
                        <md-button class="md-icon-button md-flat" @click="deletekv">
                           <md-icon>delete</md-icon>
                        </md-button>
                     </span>
                  </li>
               </b-nav-form>
            </b-navbar-nav>
         </b-navbar>
      </div>
      <div>
         <md-table v-model="application" md-sort="name" md-sort-order="asc" style="padding-top:20px">
            <md-table-row>
               <b-row class="my-3" cols="2">
                  <b-col  order="1">
                     <md-table-head>KEY-VALUE</md-table-head>
                  </b-col>
                  <b-col sm="2" offset-sm="1" order="2" class="my-2 ml-auto">
                     <b-form-input size="sm" class="mr-sm-4" placeholder="Search" v-model="search" type="text"></b-form-input>
                  </b-col>
               </b-row>
            </md-table-row>   
            <md-table-row v-for="filtereddata in filteredList" :key="filtereddata.key">
               <md-table-cell id="kv">
                  {{ filtereddata.key }}
                  <div style="float:right">
                     <router-link v-bind:to="{ name: 'DeleteKV', params: { id: $route.params.id, key: filtereddata.key} }">
                        <md-button class="md-icon-button md-flat">
                           <md-icon>delete</md-icon>
                        </md-button>
                     </router-link>
                  </div>
                  <div style="float:right">
                     <router-link v-bind:to="{ name: 'ViewKV', params: { id: $route.params.id, app: $route.params.app, key: filtereddata.key} }">
                        <md-button class="md-icon-button md-flat" >
                           <md-icon>visibility</md-icon>
                        </md-button>
                     </router-link>
                  </div>
               </md-table-cell>
            </md-table-row>
         </md-table>
         </div>
      </div>
</template>

<script>

import axios from 'axios';

   export default {
      name: 'KVStore',
      data: () => ({
         search: '',
         application: [],
      }),
      computed: {
         filteredList() {
            if (this.application.length != 0) {
               return this.application.data.filter(filtereddata => {
               return filtereddata.key.toLowerCase().includes(this.search.toLowerCase())
               })
            }
            return this.application.data
         }
      },
      created() {
         const url='http://localhost/v1/getvalue'
         const options={
            method:'POST',
            headers:{
            'Content-Type': 'application/json'
            },
            data: JSON.stringify({
               id: this.$route.params.id,
               decode: true,
               all: true
            })
         };
         axios(url,options)
         .then(response => (this.application = response.data.response))
         .catch(error => console.log(error))
      },
      methods:{
         deletekv(e){
            e.preventDefault();
            const url='http://localhost/v1/deletevalue'
            const options={
               method:'DELETE',
               headers:{
                  'Content-Type': 'application/json'
               },
               data: JSON.stringify({
                  id: this.$route.params.id,
                  all: true
               })
            }
            axios(url,options)
            .then(response => {
               if(response.status === 200) {
                  this.$router.push({ name : 'Compose' });}
               }
            )
            .catch(error => console.log(error))
         }
      }
};
</script>
<style>
   #kv{
      font-size: 15px;
   }
   #text-color{
      color: #6c757d;
   }
</style>