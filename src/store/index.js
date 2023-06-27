import { createStore } from "vuex";
import axios from "axios";
import { router } from "../router";

export const store = createStore({
    state: {
        user: null,
        loggedIn: false,
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user;
            state.loggedIn = Boolean(user);
        }
    },
    actions: {
        async singIn({},{url, credentials}) {
            await axios.get("sanctum/csrf-cookie").then((response) => {
                axios
                    .post(url, credentials)
                    .then((res) => {
                        store.commit("SET_USER", res.data.user)
                        localStorage.setItem('user', res.data.user);
                        localStorage.setItem('token', res.data.token);
                        console.log(localStorage.getItem('token'))
                    })
                    .catch((err) => {
                        store.commit("SET_USER", null)
                    })
                    .finally(() => router.push({ name : "home"}))
            });
        },
        async singOut() {
            await axios
                .get("api/logout")
                .then((response) => {
                    store.commit("SET_USER", null)
                    localStorage.removeItem('token')
                    router.push({ name: "login" });
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    }
});
