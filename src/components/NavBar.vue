<template>
    <header>
        <div class="container">
            <ul class="nav">
                <li><RouterLink to="/home" class="nav-link px-2 text-white">Home</RouterLink></li>
                <li><RouterLink to="/trade" class="nav-link px-2 text-white">Trading</RouterLink></li>
                <li><RouterLink to="/tradeHistory" class="nav-link px-2 text-white">Movimientos</RouterLink></li>
                <li><RouterLink to="/currentStatus" class="nav-link px-2 text-white">Estado Actual</RouterLink></li>
            </ul>

            <div class="texto-final">
                <router-link type="button" to="/" class="btn btn-warning" v-if="this.$store.state.username === ''">Login</router-link>
                <p class="text-dark btn btn-warning" v-else>{{this.$store.state.username}}</p>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "NavBar",
};
</script>

<style scoped>
header{
    padding: 20px;
    background-color: black;
    color: #fff;
}
.container{
    display: flex;
    justify-content: space-between;
    height: 40px;
}
.nav{
    align-items: center;
    justify-content: center;
}
li{
    margin-left: 10px;
}
</style>
