<template>
   <div>
      <div>
         <b-navbar toggleable="xl" class="border-bottom border-dark">
            <b-navbar-nav>
               <h1>
                  <b-navbar-brand v-for="item in application.apps" :key="item.name"><b>App: {{item.name}}</b></b-navbar-brand>
               </h1>
            </b-navbar-nav>
         </b-navbar>
      </div>
      <div id="table">
         <div v-for="item in application.apps" :key="item.apps">
         <md-table v-model="application" md-sort="name" md-sort-order="asc">
            <md-table-row>
               <md-table-head>KEY-VALUE</md-table-head>
            </md-table-row>   
            <md-table-row v-for="kv in item.kvs" :key="kv.key">
               <md-table-cell id="kv">
                  {{ kv.key }}
                  <div style="float:right">
                     <router-link v-bind:to="'kvstore'" :active="isActive">
                        <md-button class="md-icon-button md-flat">
                           <md-icon>delete</md-icon>
                        </md-button>
                     </router-link>
                  </div>
                  <div style="float:right">
                     <router-link v-bind:to="'kvstore'" :active="isActive">
                        <md-button class="md-icon-button md-flat">
                           <md-icon>edit</md-icon>
                        </md-button>
                     </router-link>
                  </div>
                  <div style="float:right">
                     <router-link v-bind:to="'kvstore'" :active="isActive">
                        <md-button class="md-icon-button md-flat">
                           <md-icon>visibility</md-icon>
                        </md-button>
                     </router-link>
                  </div>
               </md-table-cell>
            </md-table-row>
         </md-table>
         </div>
      </div>
   </div>
</template>
<script>
   export default {
     name: 'KVStore',
   //  props: [  
   // // camelCase in JavaScript  
   // 'childData'  
   // ] ,
   data: () => ({
       searchKV: null,
       searchedKV: [],
       application: {
          apps: [{
          name: 'UI',
          kvs: [
            {
              key: 'dev',
              value: ""
            },
            {
              key: 'testing',
              value: ""
            },
            {
              key: 'production',
              value: ""
            },
            {
              key: 'production',
              value: ""
            },
            {
              key: 'production',
              value: ""
            },
            {
              key: 'production',
              value: ""
            },
            {
              key: 'production',
              value: ""
            },
            {
              key: 'production',
              value: ""
            },
            {
              key: 'production',
              value: ""
            },
            {
              key: 'production',
              value: ""
            },
            {
              key: 'production',
              value: ""
            },
            {
              key: 'production',
              value: ""
            },
            {
              key: 'production',
              value: ""
            },
            {
              key: 'production',
              value: ""
            },
            {
              key: 'production',
              value: ""
            },
            {
              key: 'production',
              value: ""
            },
            {
              key: 'production',
              value: ""
            },
            {
              key: 'production',
              value: ""
            },
            {
              key: 'production',
              value: ""
            }
       ],
       }]
       }
     }),
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