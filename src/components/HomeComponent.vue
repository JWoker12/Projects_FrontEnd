<template>
    <div class="card p-0">
        <div class="card-header d-flex justify-content-between">
            Projects
            <router-link
                v-if="user.role === 'admin'"
                class="btn btn-primary btn-sm"
                href="#"
                :to="{ name: 'form-project' }"
                >Create Project</router-link
            >
        </div>
        <div class="card-body">
            <Loading v-if="loading" />
            <div v-else>
                <h3 v-if="projects?.length === 0 || projects === null" class="text-center">
                    You have no projects currently assigned
                </h3>
                <Table v-else :projects="projects" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

import Loading from "./Addons/Loading.vue";
import Table from "./Addons/Table.vue";
export default {
    components: { Loading, Table },
    data() {
        return {
            projects: null,
            loading: true,
        };
    },
    computed: {
        ...mapState(["user"]),
    },
    mounted() {
        axios
            .get("api/projects")
            .then((response) => (this.projects = response.data.data))
            .catch((error) => console.log(error))
            .finally(() => (this.loading = false));
    },
};
</script>
