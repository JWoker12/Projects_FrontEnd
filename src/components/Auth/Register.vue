<template>
    <div class="card-body">
        <form>
            <h3>Register</h3>
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" v-model="register.name" />
            </div>
            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control" v-model="register.email"/>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" v-model="register.password"/>
            </div>
            <div class="my-3">
                <button type="submit" class="btn btn-dark">Register</button>
            </div>
        </form>
    </div>
</template>
<script>
export default{
    data(){
        return {
            register: {
                name: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        createUser() {
            axios
                .post('http://localhost:8001/api/register', this.register)
                .then(response => {
                    this.setUser(response.data.user);
                    this.setToken(response.data.token);
                    this.$store.getters.loggedIn = true
                    this.$router.push({name: 'home'})
                })
                .catch(err => console.log(err))
        },
    }
}
</script>