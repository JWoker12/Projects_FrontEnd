<template>
    <table class="table table-sm table-bordered text-center">
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
                    <router-link class="btn btn-primary btn-sm" 
                        :to="{name: 'show-project', params: { id: project.id },}">
                        <i class="bi bi-eye-fill" />
                    </router-link>
                    <button v-if="user.role === 'admin'" class="btn btn-danger btn-sm" @click="deleteProject(project.id)">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props: ["projects"],
    computed: {
        ...mapState(["user"]),
    },
    methods: {
        deleteProject(id) {
            axios
                .delete("api/project/" + id + "/delete")
                .then((response) => {
                    console.log(response.data);
                    this.$router.push({ name: "home" });
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },
    },
};
</script>
