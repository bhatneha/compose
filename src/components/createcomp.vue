<template>
  <div>
    <b-card class="shadow-sm p-3 mb-5 bg-white rounded">
      <router-link v-bind:to="'compose'">
        <md-button class="md-icon-button md-raised" id="backbutton">
          <md-icon>arrow_back</md-icon>
        </md-button>
      </router-link>
      <b-card-header header-bg-variant="transparent" header-tag="h4">Create Compose</b-card-header>
      <b-card-body>
          <b-form>
              <b-form-group label="Application" label-size="md" label-class="font-weight-bold">
              <b-form-input v-model="application.name"></b-form-input>
              </b-form-group>

              <div v-for="data in application.datas" :key="data.value">
              <b-form-group label="Key" label-size="md" label-class="font-weight-bold">
              <b-form-input v-model="data.key"></b-form-input>
              </b-form-group>

              <b-form-group label="Value" label-size="md" label-class="font-weight-bold">
              <b-form-textarea rows="6" max-rows="80" v-model="data.value"></b-form-textarea>
              </b-form-group>
              </div>
          </b-form>
      </b-card-body>
      <b-card-footer footer-bg-variant="transparent">
          <b-row cols="2">
              <b-col order="1">
                  <md-button class="md-icon-button md-raised" @click="addkv">
                      <md-icon>add</md-icon>
                  </md-button>
                  <md-button class="md-icon-button md-raised" @click="removekv()">
                      <md-icon>remove</md-icon>
                  </md-button>
              </b-col>
              <b-col order="2" class="text-right">
                  <b-button type="submit" variant="secondary" @click="formSubmit" :disabled='isDisabled'>SAVE</b-button>
              </b-col>
          </b-row>
      </b-card-footer>
    </b-card>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Createcomp",
  data: () => ({
    application: {
      name: '',
      datas: [
        {
          key:'',
          value:''
        }
      ],
    },
    output: '',
  }),
  computed: {
     isDisabled: function(){
      var data;
      if (this.application.name.length == 0) {
        return true
      }
      for (data of this.application.datas) {
        if (data.key.length == 0) {
          return true
        }
      }
      return false
     }
  },
  methods: {
    addkv () {
      this.application.datas.push({
        key: '',
        value: ''
      })
    },
    removekv () {
      this.application.datas.splice(-1,1)
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
              app: this.application.name,
              data: this.application.datas
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
#backbutton{
  float: right;
}
</style>