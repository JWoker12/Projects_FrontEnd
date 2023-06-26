<template>
    <div class="card p-0">
        <div class="card-header d-flex justify-content-between">
            Projects
            <router-link class="btn btn-primary btn-sm" href="#" :to="{name: 'form-project'}">Create Project</router-link>
        </div>
        <div class="card-body">
            <Loading v-if="loading" />
            <table v-else class="table table-sm table-bordered text-center">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Project</th>
                        <th>Description</th>
                        <th>Dead Line</th>
                        <th>Assigned Users</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="project in projects" :key="project.id">
                        <td>{{ project.id }}</td>
                        <td>{{ project.name }}</td>
                        <td>
                            {{ project.description.substring(0, 50) + ".." }}
                        </td>
                        <td>{{ project.dead_line }}</td>
                        <td>{{ project.users ? project.users : 0 }}</td>
                        <td>
                            <router-link class="btn btn-primary btn-sm" :to="{name: 'show-project', params: {id: project.id}}"><i class="bi bi-eye-fill"></i></router-link>
                            <button class="btn btn-danger btn-sm" @click="deleteProject(project.id)"><i class="bi bi-trash-fill"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import Loading from "./Addons/Loading.vue";
export default {
    components: {
        Loading,
    },
    data() {
        return {
            projects: null,
            loading: true,
        };
    },
    mounted() {
        axios
            .get("http://localhost:8001/api/projects", this.$store.getters.config)
            .then((response) => (this.projects = response.data.data))
            .catch((error) => {
                error.response.statusText == 'Unauthorized'
                    ? this.$router.push({name: 'login'})
                    : console.log(error)
            })
            .finally(() => (this.loading = false));
    },
    methods: {
        deleteProject(id){
            axios
                .delete("http://localhost:8001/api/project/" + id +"/delete", this.$store.getters.config)
                .then((response) => {
                    console.log(response.data)
                    this.$router.push({name: 'home'})
                })
                .catch((error) => {
                    console.log(error.response)
                })
                .finally(() => (this.loading = false));
        }
    }
};
</script>
