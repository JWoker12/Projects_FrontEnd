<template>
    <div class="card">
        <div class="card-header">{{action}} Task</div>
        <div class="card-body">
            <form @submit.prevent="sendTask">
                <div class="my-1">
                    <label class="form-label">Task Title</label>
                    <input type="text" class="form-control" v-model="task.name" />
                </div>
                <div class="my-1">
                    <label class="form-label">Description</label>
                    <input type="text" class="form-control" v-model="task.description" />
                </div>
                <div class="my-1">
                    <label class="form-label">State</label>
                    <select class="form-select" v-model="task.state">
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
    props: ['action', 'edit', 'dataTask'],
    data() {
        return {
            task: {
                name: this.dataTask ? this.dataTask.name : '',
                description: this.dataTask ? this.dataTask.description : '',
                state: this.dataTask ? this.dataTask.state : '',
                project_id: this.id
            },
            url: this.edit ? this.edit : "/api/project/task/create",
            response: null
        };
    },
    methods: {
        sendTask() {
            axios
                .post(this.edit, this.task)
                .then((res) => this.response = res.data)
                .catch((err) => {
                    this.response = err.response.data
                });
        },
    },
};
</script>
