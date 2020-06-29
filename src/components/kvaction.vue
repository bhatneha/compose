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
    <codemirror v-model="code" :options="cmOption" />
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
        name: 'KVAction',
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
        code: ""
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
      .then(response => (this.code = JSON.stringify(JSON.parse(response.data.data.Data[0].value), null, 2)))
      .catch(error => console.log(error))
   }
}
</script>

<style>
    #json{
        padding-top: 50px;
    }
</style>