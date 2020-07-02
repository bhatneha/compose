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
    <b-alert variant="success" dismissible fade :show="updatesuccess" @dismissed="updatesuccess=false"> {{ updateMessage }} </b-alert>
    <b-alert variant="danger" dismissible fade :show="updatefail" @dismissed="updatefail=false"> {{ updateMessage }} </b-alert>
    <codemirror v-model="code" :options="cmOption" />
    <md-button type="submit" class="md-raised" id="but" @click="updatekv">Update</md-button>
    <router-link v-bind:to="{ name: 'DeleteKV', params: { id: $route.params.id, key: $route.params.key} }">
            <md-button type="submit" class="md-raised" id="but">Delete</md-button>
    </router-link>               
    </div>
</div>
</template>

<script>
    import axios from 'axios';
    //import dedent from 'dedent'
    import { codemirror } from 'vue-codemirror'
    // base
    import 'codemirror/lib/codemirror.css'
    // language
    import 'codemirror/mode/yaml/yaml.js'
    // theme css
    import 'codemirror/theme/base16-dark.css'

    export default {
        name: 'ViewKV',
        components: {
            codemirror
        },
      data: () => ({
        cmOption: {
            tabSize: 4,
            styleActiveLine: true,
            lineNumbers: true,
            line: true,
            mode: {
                name: 'yaml',
                json: true
            },
            theme: 'base16-dark',
            viewportMargin: Infinity
        },
        code: "",
        updatesuccess: false,
        updatefail: false,
        updateMessage: ""
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
       console.log(options.data)
       axios(url,options)
      .then(response => (this.code = JSON.stringify(JSON.parse(response.data.data.Data[0].value), null, 2)))
      .catch(error => console.log(error))
   },
   methods: {
       updatekv(e){
       e.preventDefault();
       const url='http://localhost/v1/updatevalue'
       const options={
          method:'PATCH',
          headers:{
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({
              id: this.$route.params.id,
              data: [{key: this.$route.params.key, value: this.code}]
          })
       }
         axios(url,options)
         .then(response => {
                if(response.status === 200) {
                this.$forceUpdate();
                this.updatesuccess=true
                this.updateMessage="Updated Successfully!"
                }
            }
         )
      .catch(error => {
          this.updatefail=true
          this.updateMessage=error}
       )
       }
   }
}
</script>

<style>
    #json{
        padding-top: 50px;
    }
    .CodeMirror {
    border: 1px solid #eee;
    height: auto;
    }
</style>