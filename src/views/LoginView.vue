<template>
    <div class="home">
        <NavBar/>
        <Login/>
    </div>
</template>

<script>
import Login from '@/components/Login.vue';
import NavBar from '@/components/NavBar.vue';

export default{
    name: 'LoginView',
    components: {
        Login,
        NavBar
    }
}
</script>