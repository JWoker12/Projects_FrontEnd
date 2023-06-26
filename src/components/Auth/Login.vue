<template>
    <div class="card">
        <div class="card-body">
            <form v-on:submit.prevent="accessSession">
                <h3>Sign In</h3>
                <div class="form-group">
                    <label>Email address</label>
                    <input
                        type="email"
                        class="form-control"
                        v-model="login.email"
                    />
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input
                        type="current-password"
                        class="form-control"
                        v-model="login.password"
                    />
                </div>
                <div class="my-3">
                    <button type="submit" class="btn btn-dark">Login</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            login: {
                email: "",
                password: "",
            },
        };
    },
    methods: {
        ...mapMutations(["setUser", "setToken"]),
        accessSession() {
            axios
                .post("http://localhost:8001/api/login", this.login)
                .then((response) => {
                    this.setUser(response.data.user);
                    this.setToken(response.data.token);
                    this.$store.loggedIn = true
                    console.log(this.$store.loggedIn)
                    this.$router.push({name: 'home'})
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>
