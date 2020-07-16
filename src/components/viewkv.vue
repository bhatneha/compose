<template>
<div>
    <div>
        <b-navbar toggleable="xl" class="border-bottom border-dark">
            <b-navbar-nav>
                <h1>
                    <b-navbar-brand><b>Key: </b><b id="text-color">{{ $route.params.key }}</b></b-navbar-brand>
                </h1>
            </b-navbar-nav>
            <router-link v-bind:to="{ name: 'KVStore', params: { id: this.$route.params.id, app: this.$route.params.app} }">
              <md-button class="md-icon-button md-raised" id="backbutton">
               <md-icon>arrow_back</md-icon>
              </md-button>
            </router-link>
        </b-navbar>
    </div>

    <div id="content">
        <form>
            <fieldset>
                <b-alert variant="success" dismissible :show="alertProps.updatesuccess" @dismissed="alertProps.updatesuccess=false"> {{ alertProps.successMessage }} </b-alert>
                <b-alert variant="danger" dismissible :show="alertProps.updatefail" @dismissed="alertProps.updatefail=false"> {{ alertProps.failureMessage }} </b-alert>
                <div>
                    <toggle-button :value="Boolean(isyaml.yaml)" :labels="{checked: 'yaml', unchecked: 'json'}" :color="{checked: '#6c757d', unchecked: '#6c757d'}" :font-size=18 :width=90 :height=25 @change="jsontoyaml($event)"/>
                </div>
                <codemirror :options="cmOption" v-model="code" id="codem"/>
            </fieldset>
            <b-button type="submit" class="comp-button" variant="secondary" @click.prevent="updatekv">UPDATE</b-button>
            <router-link v-bind:to="{ name: 'DeleteKV', params: { id: $route.params.id, key: $route.params.key} }">
                <b-button type="submit" class="comp-button" variant="secondary" style="margin-left:15px">DELETE</b-button>
            </router-link>
        </form>
    </div>
</div>
</template>

<script>
    import axios from 'axios';

    import { ToggleButton } from 'vue-js-toggle-button'
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
            codemirror,
            ToggleButton
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
        alertProps: {
            updatesuccess: false,
            updatefail: false,
            successMessage: "",
            failureMessage: ""
        },
        isyaml: {
            yaml: false,
            rawJson: "",
            rawOutput: ""
        }
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
            .then(response => (
                this.isyaml.rawJson = JSON.stringify(JSON.parse(response.data.response.data[0].value), null, 2),
                this.isyaml.rawOutput = JSON.parse(response.data.response.data[0].value),
                this.code = this.isyaml.rawJson 
            ))
            .catch(error => console.log(error))
        },
        methods: {
            updatekv(){
                //e.preventDefault();
                if(!(this.isyaml.yaml)){
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
                            // this.$forceUpdate();
                            this.alertProps.updatesuccess=true
                            this.alertProps.successMessage="Updated Successfully!"
                            }
                        }
                    )
                    .catch(error => {
                        this.alertProps.updatefail=true
                        this.alertProps.failureMessage=error
                        }
                    )
                }
                else{
                    this.alertProps.updatefail=true
                    this.alertProps.failureMessage="At this moment updating YAML not allowed!"
                }
            },
            jsontoyaml(event){
                if (event.value) {
                    "use strict";
                    var YAML = require('json2yaml'), ymlText;
                    ymlText = YAML.stringify(this.isyaml.rawOutput);
                    this.code = ymlText
                    this.isyaml.yaml = event.value
                } else {
                    this.code = this.isyaml.rawJson
                    this.isyaml.yaml = event.value
                }
            }
        }
}
</script>

<style>
    #content{
        padding-top: 50px;
    }
    .comp-button {
        margin-top: 20px;
    }
    #codem{
        margin-top: 10px;
    }
    .CodeMirror {
        border: 1px solid #eee;
        height: auto;
    }
</style>