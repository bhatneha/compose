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
                        <router-link v-bind:to="'kvstore'">
                        <md-button class="md-icon-button md-flat" @click="deletekv">
                           <md-icon>delete</md-icon>
                        </md-button>
                        </router-link>
                     </span>
                  </li>
               </b-nav-form>
            </b-navbar-nav>
         </b-navbar>
      </div>

      <div id="table">
         <md-table v-model="application" md-sort="name" md-sort-order="asc">
            <md-table-row>
               <md-table-head>KEY-VALUE</md-table-head>
            </md-table-row>   
            <md-table-row v-for="item in application.Data" :key="item" >
               <md-table-cell id="kv">
                  {{ item.key }}
                  <div style="float:right">
                     <router-link v-bind:to="{ name: 'DeleteKV', params: { id: $route.params.id, key: item.key} }">
                        <md-button class="md-icon-button md-flat">
                           <md-icon>delete</md-icon>
                        </md-button>
                     </router-link>
                  </div>
                  <div style="float:right">
                     <router-link v-bind:to="{ name: 'ViewKV', params: { id: $route.params.id, key: item.key} }">
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
         application: null,
      }),
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
         .then(response => (this.application = response.data.data))
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
   #table{
      padding-top: 50px;
   }
   #kv{
      font-size: 15px;
   }
   #text-color{
      color: grey;
   }
</style>