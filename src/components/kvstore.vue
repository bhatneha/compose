<template>
   <div>
      <div>
         <b-navbar toggleable="xl" class="border-bottom border-dark">
            <b-navbar-nav>
               <h1>
                  <b-navbar-brand><b>App: {{ $route.params.id }}</b></b-navbar-brand>
               </h1>
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
                     <router-link v-bind:to="'kvstore'">
                        <md-button class="md-icon-button md-flat">
                           <md-icon>delete</md-icon>
                        </md-button>
                     </router-link>
                  </div>
                  <div style="float:right">
                     <router-link v-bind:to="kvstore">
                        <md-button class="md-icon-button md-flat" >
                           <md-icon>edit</md-icon>
                        </md-button>
                     </router-link>
                  </div>
                  <div style="float:right">
                     <router-link v-bind:to="{ name: 'KVAction', params: { id: $route.params.id, key: item.key} }">
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
   // created() {
   //          this.data = this.$route.params.data;
   //      },
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
</style>