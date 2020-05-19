<template>
 <div class="container">
  <div>
  <b-navbar toggleable="xl" class="border-bottom border-dark">
    <b-navbar-nav>
      <h1><b-navbar-brand><b>Compose</b></b-navbar-brand></h1>
    </b-navbar-nav>
    <b-navbar-nav>
    <div>
        <router-link v-bind:to="'createcomp'" :active="isActive"> <md-button class="md-icon-button md-raised">
            <md-icon>add_box</md-icon>
        </md-button></router-link>
    </div>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
     <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search" v-model="search" @input="searchOnTable"></b-form-input>
     </b-nav-form>
    </b-navbar-nav>
  </b-navbar>
  </div>
  <div id="table">
    <md-table v-model="searched" md-fixed-header >
      <md-table-empty-state md-label="No compose found" :md-description="`No compose found for this '${search}' query. Try a different search term`">
        <!-- <md-button class="md-primary md-raised" @click="navigate">Create New User</md-button> -->
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>
        <md-table-cell md-label="Job Title" md-sort-by="title">{{ item.title }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
  </div>
</template>

<script>
// import router from '../router/index'

const toLower = text => {
    return text.toString().toLowerCase()
  };
  const searchByName = (items, term) => {
    if (term) {
      return items.filter(item => toLower(item.name).includes(toLower(term)));
    }
    return items;
  };

export default {
  name: 'Compose', //this is the name of the component

data: () => ({
    search: null,
    searched: [],
    users: [
      {
        id: 1,
        name: "Shawna Dubbin",
        email: "sdubbin0@geocities.com",
        gender: "Male",
        title: "Assistant Media Planner"
      },
      {
        id: 2,
        name: "Odette Demageard",
        email: "odemageard1@spotify.com",
        gender: "Female",
        title: "Account Coordinator"
      },
      {
        id: 3,
        name: "Lonnie Izkovitz",
        email: "lizkovitz3@youtu.be",
        gender: "Female",
        title: "Operator"
      },
      {
        id: 4,
        name: "Thatcher Stave",
        email: "tstave4@reference.com",
        gender: "Male",
        title: "Software Test Engineer III"
      },
      {
        id: 5,
        name: "Clarinda Marieton",
        email: "cmarietonh@theatlantic.com",
        gender: "Female",
        title: "Paralegal"
      }
    ]
  }),
  methods: {
    searchOnTable() {
      this.searched = searchByName(this.users, this.search);
    }
  },
  created() {
    this.searched = this.users;
  },
//   navigate() {
//     router.push('home');
//   }
};
</script>


<style>
#table{
    padding-top: 50px;
}

</style>