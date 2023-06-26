<template>
    
    <div>
        <Nav></Nav>
        <div class="container mt-3">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import Nav from './components/Addons/Nav.vue'
export default{
    components: {Nav},
}
</script>