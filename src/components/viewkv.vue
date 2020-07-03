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

    <div id="content">
        <form>
            <fieldset>
                <b-alert variant="success" dismissible fade :show="updatesuccess" @dismissed="updatesuccess=false"> {{ updateMessage }} </b-alert>
                <b-alert variant="danger" dismissible fade :show="updatefail" @dismissed="updatefail=false"> {{ updateMessage }} </b-alert>
                <div>
                    <toggle-button :value="true" :labels="{checked: 'json', unchecked: 'yaml'}" :color="{checked: '#808080', unchecked: '#808080'}" font-size="18" width="90" height="25"/>
                </div>
                <codemirror v-model="code" :options="cmOption" />
            </fieldset>
            <button type="submit" class="button btn" @click="updatekv">UPDATE</button>
            <router-link v-bind:to="{ name: 'DeleteKV', params: { id: $route.params.id, key: $route.params.key} }">
                <button type="submit" class="button btn" style="margin-left:15px">DELETE</button>
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
    #content{
        padding-top: 50px;
    }
    .button {
        padding: 6px 10px;
        text-align: center;
        display: inline-block;
        font-size: 14px;
        margin: 30px 2px;
        transition-duration: 0.6s;
        cursor: pointer;
        border-radius: 3px;
        background-color: grey;
        color: honeydew;
        box-shadow: 0 4px 12px 0 rgba(0,0,0,0.19);
    }
    .button:hover {
        background-color: rgb(151, 148, 148);
        color: honeydew;
    }
    .CodeMirror {
        border: 1px solid #eee;
        height: auto;
    }
</style>