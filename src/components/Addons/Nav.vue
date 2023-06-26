<template>
    <nav class="navbar navbar-expand-lg bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand text-white" href="#" :to="{ name: 'home' }">Control Panel</a>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link v-if="!this.$store.loggedIn" class="nav-link text-white" href="#" :to="{ name: 'login' }">Login</router-link>
                </li>
                <li class="nav-item">
                    <router-link v-if="!this.$store.loggedIn" class="nav-link text-white" href="#" :to="{ name: 'register' }">Register</router-link>
                </li>
                <li class="nav-item">
                    <a href="#" v-if="this.$store.loggedIn" @click="logout" class="nav-link text-white">LogOut</a>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
import { mapMutations } from "vuex";
import axios from 'axios'
export default{
    computed: {
        ...mapMutations(["setUser", "setToken"]),
    },
    methods:{
        logout(){
            axios
            .get("http://localhost:8001/api/logout", this.$store.getters.config)
            .then((response) => {
                this.$store.loggedIn = false
                this.$router.push({name: 'login'})
            })
            .catch((error) => {
                error.response?.statusText == 'Unauthorized'
                    ? this.$router.push({name: 'login'})
                    : console.log(error)
            });
        }
    }
}
</script>
