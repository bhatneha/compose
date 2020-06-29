<template>
<header>
<div>
   <b-navbar toggleable="xl" type="dark" variant="faded" fixed="top" id="bar" tabs>
   <b-navbar-brand href="/">
    <img class="navbar-logo" src="../assets/welcome.png" alt="Tryvium Logo">
   </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav >
            <h5><b-nav-item to="/home" exact exact-active-class="active"><b>Home</b></b-nav-item></h5>
            <h5><b-nav-item to="/about" exact exact-active-class="active"><b>About</b></b-nav-item></h5>
            <h5><b-nav-item to="/contact" exact exact-active-class="active"><b>Contact</b></b-nav-item></h5>
            <h5><b-nav-item to="/compose" exact exact-active-class="active"><b>Compose</b></b-nav-item></h5>
          </b-navbar-nav>
      </b-collapse>
   </b-navbar>
</div>
</header>
</template> 

<style scoped>
#bar{
  /* background-color: rgb(117, 81, 117) */
  background-color: rgb(117, 81, 117)
}
.navbar-logo{
  height: 30px;
  width: 30px;
}
</style>

