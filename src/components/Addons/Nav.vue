<template>
    <nav
        class="navbar navbar-expand-lg bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
        <div class="container-fluid">
            <router-link class="navbar-brand" :to="{ name: 'home' }">Control Panel</router-link>
            <ul v-if="!loggedIn" class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'login' }"
                        >Login</router-link
                    >
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'register' }"
                        >Register</router-link
                    >
                </li>
            </ul>
            <ul v-else class="navbar-nav">
                <li class="nav-item">
                    <a href="#" @click="logout" class="nav-link">LogOut</a>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
    computed: {
        ...mapState(["loggedIn"]),
    },
    methods: {
        ...mapActions(["singOut"]),
        async logout() {
            await this.singOut();
        },
    },
};
</script>
