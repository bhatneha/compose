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
            <md-input v-model="compose" type="text"></md-input>
          </md-field>

        <div v-for="(value, index) in kv" :key="index">
          <md-field>
            <label>Key</label>
            <md-input v-model="key" type="text"></md-input>
          </md-field>

          <md-field>
            <label>Value</label>
            <md-textarea></md-textarea>
          </md-field>
        </div>

          <md-card-actions md-alignment="space-between">
           <md-button class="md-icon-button md-raised" @click="addkv">
              <md-icon>add</md-icon>
          </md-button>
            <md-button type="submit" class="md-raised" :disabled="sending" id="but">Save</md-button>
          </md-card-actions>
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>

<script>
export default {
  name: "Createcomp",
  data: () => ({
    compose: null,
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
</style>