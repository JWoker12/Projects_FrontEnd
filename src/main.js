import { createApp } from "vue";
import { createStore } from "vuex";
import "./style.css";

import { router } from './Routes.vue'

import App from "./App.vue";

export const store = createStore({
    state: {
        user: null,
        token: null,
        loggedIn: false
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
        },
    },
    actions: {},
    getters: {
        config(state) {
            return {headers: {Authorization: 'Bearer ' + state.token}}
        }
    },
});

const app = createApp(App);
app.use(store);
app.use(router);

app.mount("#app");
