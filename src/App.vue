<template>
   <div id="app" class="main-container">
      <Navigation/>
      <div id="body" class="container">
         <router-view/>
      </div>
      <Footer/>
   </div>
</template>
<script>
   import navigation from './components/navigation'
   import footer from './components/footer'
   
   export default {
     name: 'app',
     components: {
       'Navigation': navigation,
       'Footer':footer
     }
   }
</script>
<style>
   #app {
   font-family: 'Avenir', Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   }
   #body{
   color: rgb(5, 5, 5);
   padding-top: 100px; 
   }
   .main-container {
   min-height: 100vh; /* will cover the 100% of viewport */
   overflow: hidden;
   display: block;
   position: relative;
   padding-bottom: 100px; /* height of your footer */
   }
</style>