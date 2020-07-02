<template>
  <div>
    <form novalidate class="md-layout md-primary">
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Create Compose</div>
        </md-card-header>

        <md-card-content>
          <md-field>
            <label>Application</label>
            <md-input v-model="app" type="text"></md-input>
          </md-field>
  
        <div v-for="data in datas" :key="data">
          <md-field>
            <label>Key</label>
            <md-input type="text" v-model="data.key"></md-input>
          </md-field>

          <md-field>
            <label>Value</label>
            <md-textarea v-model="data.value"></md-textarea>
          </md-field>
        </div>

          <md-card-actions md-alignment="space-between">
            <div>
           <md-button class="md-icon-button md-raised" @click="addkv">
              <md-icon>add</md-icon>
          </md-button>
          <md-button class="md-icon-button md-raised" @click="removekv()">
              <md-icon>remove</md-icon>
          </md-button>
            </div>
            <md-button type="submit" class="md-raised"  id="but" @click="formSubmit">Save</md-button>
          </md-card-actions>
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Createcomp",
  data: () => ({
    app: '',
    datas: [
      {
        key:'',
        value:''
      }
    ],
      output: ''
  }),
  methods: {
    addkv () {
      this.datas.push({
        key: '',
        value: ''
      })
    },
    removekv () {
      this.datas.splice(-1,1)
    },
    formSubmit(e) {
      e.preventDefault();
      const url='http://localhost/v1/setvalue'
      const options={
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          data: JSON.stringify({
              app: this.app,
              data: this.datas
          })
      };
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
#but{
background-color: grey;
color: honeydew;
}
</style>