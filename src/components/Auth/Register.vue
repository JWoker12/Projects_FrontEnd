<template>
    <div class="card-body">
        <form v-on:submit.prevent="signUp">
            <h3>Register</h3>
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" v-model="formRegister.name" />
            </div>
            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control" v-model="formRegister.email"/>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" v-model="formRegister.password"/>
            </div>
            <div class="my-3">
                <button type="submit" class="btn btn-dark">Register</button>
            </div>
        </form>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default{
    data(){
        return {
            formRegister: {
                name: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        ...mapActions({sendCredentials: "singIn"}),
        async signUp() {
            await this.sendCredentials({url: 'api/register', credentials: this.formRegister});
        },
    }
}
</script>