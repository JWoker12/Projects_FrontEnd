<template>
    <div class="card">
        <div class="card-body">
            <form v-on:submit.prevent="signIn">
                <h3>Sign In</h3>
                <div class="form-group">
                    <label>Email address</label>
                    <input
                        type="email"
                        class="form-control"
                        v-model="formLogin.email"
                    />
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input
                        type="current-password"
                        class="form-control"
                        v-model="formLogin.password"
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
import { mapActions } from "vuex";
export default {
    data() {
        return {
            formLogin: {
                email: "",
                password: "",
            },
        };
    },
    methods: {
        ...mapActions({sendCredentials: "singIn"}),
        async signIn() {
            await this.sendCredentials({url: '/api/login', credentials: this.formLogin});
        },
    },
};
</script>
