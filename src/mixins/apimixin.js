export default {
    data: function () {
        return {
            apiEndpoint: 'http://localhost/v1'
        }
    },     
    methods: {
        apiGetKVS: function(input) {
            const url=`${this.apiEndpoint}/getkvs`
            const options={
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input)
            };
            return fetch(url,options)
            .then((resp) => {
                return resp.json()
            })
            .catch((err) => {
                // console.log(err)
                return err
            })
        },
        apiGetValue: function(input) {
            const url=`${this.apiEndpoint}/getvalue`
            const options={
                method:'POST',
                headers:{
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(input)
            };
            return fetch(url,options)
            .then((resp) => {
                return resp.json()
            })
            .catch((err) => {
                // console.log(err)
                return err
            })
        },
        apiDeleteComposeORkv: function(input) {
            const url=`${this.apiEndpoint}/deletevalue`
            const options={
               method:'DELETE',
               headers:{
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(input)
            }
            return fetch(url,options)
            .then((resp) => {
                return resp
            })
            .catch((err) => {
                // console.log(err)
                return err
            })
        },
        apiCreateCompose: function(input) {
            const url=`${this.apiEndpoint}/setvalue`
            const options={
                method:'POST',
                headers:{
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(input)
            };
            return fetch(url,options)
            .then((resp) => {
                return resp
            })
            .catch((err) => {
                // console.log(err)
                return err
            })
        },
        apiCreateORUpdatekv: function(input) {
            const url=`${this.apiEndpoint}/updatevalue`
            const options={
                method:'PATCH',
                headers:{
                  'Content-Type': 'application/json'
                },
      
                body: JSON.stringify(input)
            };
            return fetch(url,options)
            .then((resp) => {
                return resp
            })
            .catch((err) => {
                return err
            })
        }
    }
}






