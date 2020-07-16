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
                  <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="search" type="text"></b-form-input>
               </b-nav-form>
            </b-navbar-nav>
         </b-navbar> 
      </div>
      <div id="table" >
         <md-table>
            <md-table-row>
               <md-table-head>APPLICATIONS</md-table-head>
            </md-table-row>

               <md-table-row v-for="filteredapp in filteredList" :key="filteredapp.app">
               <md-table-cell  md-label="COMPOSE" md-sort-by="app" id="comp">
                 {{ filteredapp.app }}
               </md-table-cell>

               <md-table-cell><div style="float:right"><router-link v-bind:to="{ name: 'KVStore', params: { id: filteredapp.id, app: filteredapp.app} }"><md-button class="md-icon-button md-flat">
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
         search: '',
         applications: []
      }),
      computed: {
         filteredList() {
            if (this.applications.length != 0) {
               return this.applications.filter(filteredapp => {
               return filteredapp.app.toLowerCase().includes(this.search.toLowerCase())
               })
            }
            return this.applications
         }
      },
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
      .then(response => (this.applications = response.data.response))
      .catch(error => console.log(error))
      }
   };
</script>
<style>
   #table{
   padding-top: 30px;
   }
   #comp{
     font-size: 15px;
   }
</style>