<template>
    <div class="card">
        <div class="card-header">Create Task</div>
        <div class="card-body">
            <form @submit.prevent="createTask" class="row">
                <div class="my-1">
                    <label class="form-label">Task Title</label>
                    <input type="text" class="form-control" v-model="newTask.name" />
                </div>
                <div class="my-1">
                    <label class="form-label">Description</label>
                    <input type="text" class="form-control" v-model="newTask.description" />
                </div>
                <div class="my-1">
                    <label class="form-label">State</label>
                    <select class="form-select" v-model="newTask.state">
                        <option selected>Choose...</option>
                        <option value="PENDING">Pending</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="PROGRESS">Progress</option>
                    </select>
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
    props: ['id'],
    data() {
        return {
            newTask: {
                name: '',
                description: '',
                state: '',
                user_id: '1',
                project_id: this.id
            },
            response: null
        };
    },
    methods: {
        createTask() {
            axios
                .post("http://localhost:8001/api/project/task/create", this.newTask, this.$store.getters.config)
                .then((res) => this.response = res.data)
                .catch((err) => {
                    this.response = err.response.data
                });
        },
    },
};
</script>
