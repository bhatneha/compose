
import axios from 'axios';

   export default {
      name: 'DeleteKV',
      data: () => ({
      output: '',
      }),

    created(){
        const url='http://localhost/v1/deletevalue'
                const options={
                method:'DELETE',
                headers:{
                'Content-Type': 'application/json'
                },
                data: JSON.stringify({
                    id: this.$route.params.id,
                    data: [{key: this.$route.params.key}]
                })
                };
                axios(url,options)
                .then(response => {
                    if(response.status === 200) {
                        this.$router.push({ name : 'KVStore' ,params: { id: this.$route.params.id} });}
                    }
                )
                .catch(error => console.log(error))
        }
    };
</script>