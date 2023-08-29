<template>
    <h1 class="title">Sus Cryptos</h1>
    <div class="tableAmounts">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Crypto Moneda</th>
                    <th scope="col">Cantidad de Crypto Monedas</th>
                    <th scope="col">Cantidad Total de Dinero (precio de venta)</th>
                    <th scope="col">Ganancia Acumulada</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="crypto in cryptoList" :key="crypto.id">
                    <td class="tg-kxt4">{{ crypto.name }}</td>
                    <td class="tg-kxt4">{{ crypto.amount }}</td>
                    <td class="tg-kxt4">{{ Number(crypto.amountInMoney).toLocaleString() }}</td>
                    <td class="tg-kxt4">{{ Number(crypto.result).toLocaleString() }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import ServicesAxios from '@/services/ServicesAxios';
import Swal from 'sweetalert2';

export default{
    name: "CurrentStatus",
    data(){
        return {
            cryptoList: this.$store.state.cryptos,
            salePrice: 0,
        }
    },
    mounted(){
        if(this.$store.state.username === ""){
            Swal.fire("Usuario no encontrado");
            this.$router.push("/");
        }
        this.cryptoList.forEach(element => {
            ServicesAxios.getCryptoData(element.symbol)
            .then((response) =>{
                element.amountInMoney = response.data.totalBid * element.amount;
                element.result = (element.sales - element.purchases) + element.amountInMoney;
            })
        });
    }
}
</script>

<style scoped>
.tableAmounts{
    width: 80%;
    margin: 2% auto 0 auto;
    margin-left: auto;
    margin-right: auto;
}
.title{
    margin: 5% 0 0 0;
    display: flex;
    justify-content: center;
}
</style>