<template>
    <div class="home">
        <NavBar/>
        <Login/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Login from '@/components/Login.vue';

export default{
    name: "RegisterView",
    components: {
        Login,
        NavBar
    }
}
</script>