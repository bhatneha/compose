<template>
  <div class="container">
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

          <md-field>
            <label>Key</label>
            <md-input v-model="key" type="text"></md-input>
          </md-field>

          <md-field>
            <label>Value</label>
            <md-textarea v-model="textarea"></md-textarea>
          </md-field>

          <md-card-actions md-alignment="space-between">
            <!-- <md-button type="submit" class="md-dark" :disabled="sending">Save</md-button> -->
            <router-link v-bind:to="'kvstore'" :active="isActive"> <md-button class="md-icon-button md-raised">
              <md-icon>add</md-icon>
          </md-button></router-link>
            <md-button type="submit" class="md-raised" :disabled="sending" id="but">Save</md-button>
          </md-card-actions>
          <!-- <div v-html="rawHTML"></div> -->
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>

<script>
export default {
  name: "createcomp",
  data: () => ({
    compose: null,
    key: null,
    textarea: null,
    // rawHTML: "<h2>This is KV</h2>"
    
  })
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