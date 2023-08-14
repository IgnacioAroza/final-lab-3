<template>
    <div class="tables">
        <table class="table table-bordered table-dark border-light">
            <thead>
                <tr>
                    <th scope="col">Exchanges Bitcoin</th>
                    <th scope="col">Precio de Compra</th>
                    <th scope="col">Precio de Venta</th>
                </tr>
            </thead>
            <tbody class="table-group-divider" v-for="exchangeBTC in exchangesBTC" :key="exchangeBTC.id">
                <tr>
                    <td>{{ exchangeBTC.exchangeBTC.charAt(0).toUpperCase() + exchangeBTC.exchangeBTC.slice(1) }}</td>
                    <td>ARS$ {{ Number(exchangeBTC.ask).toLocaleString() }}</td>
                    <td>ARS$ {{ Number(exchangeBTC.bid).toLocaleString() }}</td>
                </tr>
            </tbody>
        </table>
        <table class="table table-bordered table-dark border-light">
            <thead>
                <tr>
                    <th scope="col">Exchanges Ethereum</th>
                    <th scope="col">Precio de Compra</th>
                    <th scope="col">Precio de Venta</th>
                </tr>
            </thead>
            <tbody class="table-group-divider" v-for="exchangeETH in exchangesETH" :key="exchangeETH.id">
                <tr>
                    <td>{{ exchangeETH.exchangeETH.charAt(0).toUpperCase() + exchangeETH.exchangeETH.slice(1) }}</td>
                    <td>ARS$ {{ Number(exchangeETH.ask).toLocaleString() }}</td>
                    <td>ARS$ {{ Number(exchangeETH.bid).toLocaleString() }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="tables">
        <table class="table table-bordered table-dark border-light">
            <thead>
                <tr>
                    <th scope="col">Exchanges Binance Coin</th>
                    <th scope="col">Precio de Compra</th>
                    <th scope="col">Precio de Venta</th>
                </tr>
            </thead>
            <tbody class="table-group-divider" v-for="exchangeBNB in exchangesBNB" :key="exchangeBNB.id">
                <tr>
                    <td>{{ exchangeBNB.exchangeBNB.charAt(0).toUpperCase() + exchangeBNB.exchangeBNB.slice(1) }}</td>
                    <td>ARS$ {{ Number(exchangeBNB.ask).toLocaleString() }}</td>
                    <td>ARS$ {{ Number(exchangeBNB.bid).toLocaleString() }}</td>
                </tr>
            </tbody>
        </table>
        <table class="table table-bordered table-dark border-light">
            <thead>
                <tr>
                    <th scope="col">Exchanges Tether USDT</th>
                    <th scope="col">Precio de Compra</th>
                    <th scope="col">Precio de Venta</th>
                </tr>
            </thead>
            <tbody class="table-group-divider" v-for="exchangeUSDT in exchangesUSDT" :key="exchangeUSDT.id">
                <tr>
                    <td>{{ exchangeUSDT.exchangeUSDT.charAt(0).toUpperCase() + exchangeUSDT.exchangeUSDT.slice(1) }}</td>
                    <td>ARS$ {{ Number(exchangeUSDT.ask).toLocaleString() }}</td>
                    <td>ARS$ {{ Number(exchangeUSDT.bid).toLocaleString() }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default{
    name: "Tables",
    data(){
        return{
            exchangesBTC: null,
            exchangesETH: null,
            exchangesBNB: null,
            exchangesUSDT: null,
        }
    },
    mounted(){
        const optionsBTC = {
            method: 'GET',
            url: 'https://criptoya.com/api/btc/ars/0.1',
        };

        axios.request(optionsBTC).then(response =>{
            this.exchangesBTC = Object.keys(response.data).map((exchangeBTC) => ({
                exchangeBTC,
                bid: response.data[exchangeBTC].totalBid,
                ask: response.data[exchangeBTC].totalAsk,
            }));
        }).catch(function (error){
            console.log(error);
        });

        const optionsETH = {
            method: 'GET',
            url: 'https://criptoya.com/api/eth/ars/0.1',
        };

        axios.request(optionsETH).then(response =>{
            this.exchangesETH = Object.keys(response.data).map((exchangeETH) => ({
                exchangeETH,
                bid: response.data[exchangeETH].totalBid,
                ask: response.data[exchangeETH].totalAsk,
            }));
        }).catch(function (error){
            console.log(error);
        });

        const optionsBNB = {
            method: 'GET',
            url: 'https://criptoya.com/api/bnb/ars/0.1',
        };

        axios.request(optionsBNB).then(resposnse =>{
            this.exchangesBNB = Object.keys(resposnse.data).map((exchangeBNB) => ({
                exchangeBNB,
                bid: resposnse.data[exchangeBNB].totalBid,
                ask: resposnse.data[exchangeBNB].totalAsk,
            }));
        }).catch(function (error){
            console.log(error);
        });

        const optionsUSDT = {
            method: 'GET',
            url: 'https://criptoya.com/api/usdt/ars/0.1',
        };

        axios.request(optionsUSDT).then(response =>{
            this.exchangesUSDT = Object.keys(response.data).map((exchangeUSDT) =>({
                exchangeUSDT,
                bid: response.data[exchangeUSDT].totalBid,
                ask: response.data[exchangeUSDT].totalAsk,
            }))
        })
    }
}
</script>

<style scoped>
.tables{
    display: flex;
    justify-content: space-evenly;
    margin: 2% 0 0 0;
}

.table{
    max-width: 600px;
    padding: 15%;
}
</style>