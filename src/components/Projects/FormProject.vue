<template>
    <div class="card">
        <div class="card-header">Create Project</div>
        <div class="card-body">
            <form @submit.prevent="createProject" class="row">
                <div class="my-1">
                    <label class="form-label">Project</label>
                    <input type="text" class="form-control" v-model="project.name" />
                </div>
                <div class="my-1">
                    <label class="form-label">Description</label>
                    <input type="text" class="form-control" v-model="project.description" />
                </div>
                <div class="col-6 my-1">
                    <label class="form-label">Start Date</label>
                    <input type="date" class="form-control" v-model="project.start_date" />
                </div>
                <div class="col-6 my-1">
                    <label class="form-label">Dead Line</label>
                    <input type="date" class="form-control" v-model="project.dead_line" />
                </div>
                <div class="d-grid col-6 mx-auto my-1">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
        <div v-if="response">
            <div v-if="response.errors" v-for="error in response.errors">
                <div class="alert alert-danger">
                    {{ error }}
                </div>
            </div>
            <div v-else class="alert alert-success" role="alert">
                {{ response.message }}
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            project: {
                name: null,
                description: null,
                start_date: null,
                dead_line: null,
            },
            response: null
        };
    },
    methods: {
        createProject() {
            axios
                .post("http://localhost:8001/api/project/create", this.project, this.$store.getters.config)
                .then((res) => {
                    this.response = res.data
                })
                .catch((err) => {
                    this.response = err.response.data
                });
        },
    },
};
</script>
