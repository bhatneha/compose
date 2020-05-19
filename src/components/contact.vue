<template>
  <div>
    <h1>Contact Me</h1>
  <p>
      Email: {{email}}<br/>
      Website: {{web}}
  </p>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data(){
    return {
      email: 'neha@gmail.com',
      web: 'neha.com'
    }
  }
}
</script>