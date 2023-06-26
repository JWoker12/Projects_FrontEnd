<script>
import { createRouter, createWebHashHistory } from 'vue-router'
import { store } from './main.js'

import Login from './components/Auth/Login.vue'
import Register from './components/Auth/Register.vue'

import Home from './components/HomeComponent.vue'
import CreateProject from './components/Projects/FormProject.vue'
import ShowProject from './components/Projects/ShowProject.vue'
import CreateTask from './components/Projects/tasks/CreateTask.vue'
import UserProjects from './components/Projects/UserProjects.vue'

const routes = [
    { path: "/login", component: Login, name: 'login' },
    { path: "/register", component: Register, name: 'register' },
    { path: "/", component: function (){
        if(store.loggedIn) {
            return Home
        }
        else {
            router.push({name: 'login'})
        }
    }, name: 'home' },
    { path: "/project/create", component: CreateProject, name: 'form-project' },
    { path: "/project/:id", component: ShowProject, name: 'show-project', props: true },
    { path: "/project/:id/task/create", component: CreateTask, name: 'create-task', props: true },

    { path: "/users", component: UserProjects, name: 'Assigned-project' },
];
export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
</script>