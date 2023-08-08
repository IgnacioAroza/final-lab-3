<template>
    <div class="register">
        <h2>Ingrese su usuario para comenzar</h2>
        <div class="form-register mt-4 mb-3">
            <form v-on:submit.prevent="createUser">
                <h1 class="h3 mb-3 fw-normal">Por favor registrese</h1>
                <div class="form">
                    <!-- <label for="username" class="mb-2 h5">Ingrese su usuario</label> -->
                    <input type="text" class="form-control mb-3" id="username" name="username" v-model="username" placeholder="Usuario">
                </div>
                <button class="btn btn-lg btn-primary w-100" type="submit">Registrarme</button>
            </form>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
    name: "Login",
    data() {
        return {
            username: "",
        }
    },
    methods: {
        createUser: function(){
            if(this.username === ""){
                Swal.fire("Error, el usuario no puede estar vacio");
                this.$router.push("/");
            }
            else if (this.username.length < 10){
                Swal.fire("El usuario no debe tener menos de 10 caracteres");
                this.$router.push("/");
            }
            else {
                this.$store.commit("newUser", this.username);
                this.$router.push("/trade");
            }
        },
    },
}
</script>

<style scoped>
.register{
    margin: 10% 0 0 0;
}
.form-register{
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    max-width: 330px;
    padding: 15px;
    margin: auto;
}
.form-register .form:focus-within{
    z-index: 2;
}
</style>