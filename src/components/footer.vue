<template>
<footer class="footer">
    <div class="copyright text-center align-text-bottom">
        &copy; {{ new Date().getFullYear() }}
        <a href="https://www.creative-tim.com/?ref=mdf-vuejs" target="_blank">Compose</a>, made with love for a better web
      </div>
</footer>
</template>

<script>
export default {
    
}
</script>

<style>
footer {
 background-color: #f7f7f7;
 position: absolute;
 bottom: 0;
 width: 100%;
 height: 40px;
align-items: center;
 line-height: 40px;
}

</style>