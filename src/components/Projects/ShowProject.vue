<template>
    <div class="card">
        <div class="card-body">
            <div v-if="error">
                {{ project }}
            </div>
            <div v-else>
                <div class="card text-center mb-3">
                    <div class="card-header d-flex justify-content-between">
                        <router-link class="btn btn-primary btn-sm" href="#" 
                            :to="{name: 'Assigned-project'}">
                            <i class="bi bi-person-add"></i>
                        </router-link>
                        {{ project.start_date }} / {{ project.dead_line }}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{ project.name }}</h5>
                        <p class="card-text">
                            {{ project.description }}
                        </p>
                    </div>
                </div>
                <table class="table table-sm table-bordered text-center">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Task</th>
                            <th>Description</th>
                            <th>State</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="task in project.tasks" :key="task.id">
                            <td>{{ task.id }}</td>
                            <td>{{ task.name }}</td>
                            <td>{{ task.description }}</td>
                            <td>{{ task.state }}</td>
                            <td>
                                <router-link class="btn btn-warning btn-sm" 
                                    :to="{
                                        name: 'form-task', 
                                        params: {
                                            action: 'Edit', edit: 'api/project/task/update/', dataTask: task
                                        }
                                    }">
                                    <i class="bi bi-pencil-square" />
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <router-link class="btn btn-primary btn-sm"
                :to="{name: 'form-task', params: {id: project.id}}">Create new task</router-link>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    props: ["id"],
    data() {
        return {
            project: null,
            error: true
        };
    },
    mounted() {
        axios
            .get("/api/project/"+ this.id)
            .then((response) => {
                this.error = false
                this.project = response.data.data
            })
            .catch((error) => this.project = error.response?.statusText)
    },
    methods: {
        deleteProject(){
            axios
                .delete("/api/project/" + this.id +"/delete")
                .then((response) => console.log(response.data))
                .catch((error) => {
                    console.log(error);
                })
        }
    }
};
</script>
