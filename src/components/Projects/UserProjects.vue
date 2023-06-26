<template>
    <div class="card">
        <div class="card-body">
            {{ users }}
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default{
    props: ['id'],
    data(){
        return {
            users: null
        }
    },
    mounted(){
        axios
            .get('http://localhost:8001/api/project/assigned', this.$store.getters.config)
            .then(response => this.users = response.data.data)
            .catch(error => console.log(error))
    },
    methods:{

    }
}
</script>