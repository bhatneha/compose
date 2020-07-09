<template>
   <div>
      <div>
         <b-navbar toggleable="xl" class="border-bottom border-dark">
            <b-navbar-nav>
               <h1>
                  <b-navbar-brand><b>Compose</b></b-navbar-brand>
               </h1>
            </b-navbar-nav>
            <b-navbar-nav>
               <div>
                  <router-link v-bind:to="'createcomp'">
                     <md-button class="md-icon-button md-raised">
                        <md-icon>add_box</md-icon>
                     </md-button>
                  </router-link>
               </div>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
               <b-nav-form>
                  <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="search" @input="searchOnTable"></b-form-input>
                  <div v-for="customer in filteredApplication" :key="customer.app">
                  <span>{{customer.app}}</span>
                  </div>
               </b-nav-form>
            </b-navbar-nav>
         </b-navbar> 
      </div>
      <div id="table" >
         <md-table v-model="searched">
            <md-table-empty-state md-label="No compose found" :md-description="`No compose found for this '${search}' query. Try a different search term`">
            </md-table-empty-state>
            <md-table-row>
               <md-table-head>APPLICATIONS</md-table-head>
            </md-table-row>
            <md-table-row v-for="item in application" :key="item">
               <md-table-cell  md-label="COMPOSE" md-sort-by="app" id="comp">
                 {{ item.app }}
               </md-table-cell>

               <md-table-cell><div style="float:right"><router-link v-bind:to="{ name: 'KVStore', params: { id: item.id, app: item.app} }"><md-button class="md-icon-button md-flat">
                     <md-icon>chevron_right</md-icon>
                     </md-button></router-link></div>
               </md-table-cell>
            </md-table-row>
           
         </md-table>
      </div>
   </div>
</template>
<script>
   import axios from 'axios';

   export default {
     name: 'Compose', //this is the name of the component

   data: () => ({
      //search: null,
      //searched: [],
       application: null  
     }),
     mounted() {
       const url='http://localhost/v1/getkvs'
       const options={
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({
              decode: false
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
   #comp{
     font-size: 15px;
   }
</style>