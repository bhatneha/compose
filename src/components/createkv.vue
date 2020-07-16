<template>
  <div>
    <b-card class="shadow-sm p-3 mb-5 bg-white rounded">
      <router-link v-bind:to="{ name: 'KVStore', params: { id: this.$route.params.id, app: this.$route.params.app} }">
        <md-button class="md-icon-button md-raised" id="backbutton">
          <md-icon>arrow_back</md-icon>
        </md-button>
      </router-link>
      <b-form @submit="updatekv">
        <b-card-header header-bg-variant="transparent" header-tag="h4">Create Key-Value</b-card-header>
        <b-card-body>
          <b-form-group label="Application" label-size="md" label-class="font-weight-bold">
          <b-form-input v-model="appname" disabled></b-form-input>
          </b-form-group>

          <div v-for="data in datas" :key="data.value">
            <b-form-group label="Key" label-size="md" label-class="font-weight-bold">
            <b-form-input v-model="data.key" ></b-form-input>
            </b-form-group>

            <b-form-group label="Value" label-size="md" label-class="font-weight-bold">
            <b-form-textarea rows="6" max-rows="80" v-model="data.value"></b-form-textarea>
            </b-form-group>
          </div>
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
                    <b-button type="submit" variant="secondary" :disabled='isDisabled'>SAVE</b-button>
                </b-col>
            </b-row>
        </b-card-footer>
     </b-form>
    </b-card>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: "CreateKV",
  data: () => ({
    datas: [
      {
        key:'',
        value:''
      }
    ],
    output: '',
  }),
  created() {
    this.appname = this.$route.params.app
  },
   computed: {
     isDisabled: function(){
      var data;
      for (data of this.datas) {
        if (data.key.length == 0) {
          return true
        }
      }
      return false
     }
  },
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
    updatekv(e) {
      e.preventDefault();

      const url='http://localhost/v1/updatevalue'
      const options={
          method:'PATCH',
          headers:{
            'Content-Type': 'application/json'
          },

          data: JSON.stringify({
              id: this.$route.params.id,
              data: this.datas
          })
      };
      axios(url,options)
      .then(response => {
        if(response.status === 200) {
            this.$router.push({ name : 'KVStore' });}
        }
      )
      .catch(error => console.log(error))
  }
  }
};
</script>