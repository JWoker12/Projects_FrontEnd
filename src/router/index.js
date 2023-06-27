import { createRouter, createWebHistory } from 'vue-router'
import { store } from '../store'

import Login from '../components/Auth/Login.vue'
import Register from '../components/Auth/Register.vue'

import Home from '../components/HomeComponent.vue'
import CreateProject from '../components/Projects/FormProject.vue'
import ShowProject from '../components/Projects/ShowProject.vue'
import FormTask from '../components/Projects/tasks/FormTask.vue'
import UserProjects from '../components/Projects/UserProjects.vue'

const routes = [
    { path: "/login", component: Login, name: 'login'},
    { path: "/register", component: Register, name: 'register' },
    { path: "/", component:  Home, name: 'home',  meta: { requiresAuth: true } },
    { path: "/project/create", component: CreateProject, name: 'form-project',  meta: { requiresAuth: true } },
    { path: "/project/:id", component: ShowProject, name: 'show-project', props: true,  meta: { requiresAuth: true } },
    { path: "/project/task/form", component: FormTask, name: 'form-task', props: true,  meta: { requiresAuth: true } },
    { path: "/users", component: UserProjects, name: 'Assigned-project' },
];
export const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to) => {
    if (Boolean(to.meta.requiresAuth && !store.state.loggedIn)) {
            return {name: 'login'}
    }
})