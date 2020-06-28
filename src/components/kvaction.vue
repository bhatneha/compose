<template>
<div>
       <div>
         <b-navbar toggleable="xl" class="border-bottom border-dark">
            <b-navbar-nav>
               <h1>
                  <b-navbar-brand><b>Key: {{ $route.params.key }}</b></b-navbar-brand>
               </h1>
            </b-navbar-nav>
         </b-navbar>
      </div>
      <div id="json">
    <!-- <json-viewer :value="jsonData" :expand-depth=5 copyable boxed></json-viewer> -->
    <v-jsoneditor v-model="jsonData" :options="options" :height="400" @error="onError"></v-jsoneditor>
    </div>
</div>
</template>

<script>
    import VJsoneditor from 'v-jsoneditor/src/index'
    import axios from 'axios';
    // import JsonViewer from 'vue-json-viewer'

    export default {
        name: 'KVAction',
        components: {
            VJsoneditor
        },
      data: () => ({
      jsonData: {}
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
              data: [{key: this.$route.params.key}]
          })
       };
       axios(url,options)
      .then(response => (this.jsonData = JSON.parse(response.data.data.Data[0].value)))
      .catch(error => console.log(error))
   },
   methods: { 
    pushkv() {
        this.json = this.kvdata.value;
    }
   }
}
</script>

<style>
    #json{
        padding-top: 50px;
    }
</style>