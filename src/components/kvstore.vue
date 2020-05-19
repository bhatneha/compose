<template>
  <div class="container">
    <form novalidate class="md-layout md-primary" >
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Create key/value</div>
        </md-card-header>

        <md-card-content v-for="(value, index) in kv" :key="index">
          <md-field>
            <label>Key</label>
            <md-input v-model="key" type="text" required></md-input>
          </md-field>

          <md-field>
            <label>Value</label>
            <md-textarea v-model="textarea" required></md-textarea>
          </md-field>   
        </md-card-content>

       <md-card-actions md-alignment="space-between">
          <md-button class="md-icon-button md-raised" @click="addkv" >
              <md-icon>add</md-icon>
          </md-button>
            <md-button type ="submit" class="md-raised" :disabled="sending" id="but">Save</md-button>
          </md-card-actions>
      </md-card>      
    </form> 
  </div>
</template>

<script>

export default {
  name: "kvstore",
  data: () => ({
    kv: [
      {
        key:'',
        value:''
      }
    ]
   }),
  methods: {
    addkv () {
      this.kv.push({
        key: '',
        value: ''
      })
    }
  }
};
</script>


<style>
#but{
background-color: grey;
color: honeydew;
}
.container{
    padding-top: 50px;
}
</style>