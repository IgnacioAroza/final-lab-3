<template>
    <div>
        <h1 class="title">Momento de tradear!</h1>
    </div>
    <div class="trade">
        <div>
            <select class="form-select" aria-label=".form-select-sm example" @change="onChangeBuy($event)">
                <option value="" selected>Selecciona uno para comprar</option>
                <option v-for="crypto in cryptos" :key="crypto.id">
                {{ crypto.symbol }}
                </option>
            </select>
            <br/>
            <input type="number" class="form-control" v-model="amountToBuy">
            <br/>
            <button class="btn btn-warning" v-on:click="newBuy()">Comprar</button>
        </div>
        <div class="card text-bg-ligth">
            <div class="card-header">{{ action }}</div>
            <div class="card-body">
                <p class="card-text">{{ keyWord }}</p>
                <h5 class="card-title" v-for="crypto in cryptos" :key="crypto.id">
                {{ 
                    coinSelectedToBuy === crypto.symbol && action === "Comprar"
                        ? amountToBuy === "" || amountToBuy === null ? " 1 " + coinSelectedToBuy + " = ARS $ " + buyPrice : amountToBuy + " " + coinSelectedToBuy + " = ARS $ " + (buyPrice * amountToBuy).toLocaleString()
                    :action === "Vender" && coinSelectedToSell === crypto.symbol
                        ? amountToSell === "" || amountToSell === null ? " 1 " + coinSelectedToSell + " = ARS $ " + salePrice : amountToSell + " " + coinSelectedToSell + " = ARS $ " + (salePrice * amountToSell).toLocaleString()
                    : ""
                }}
                </h5>
            </div>
        </div>
        <div>
            <select class="form-select" aria-label=".form-select-sm example" @change="onChangeSell($event)">
                <option value="" selected>Selecciona uno para vender</option>
                <option v-for="crypto in cryptos" :key="crypto.id">
                    {{ crypto.symbol }}
                </option>
            </select>
            <br/>
            <input type="number" class="form-control" v-model="amountToSell">
            <br/>
            <button class="btn btn-warning" v-on:click="newSell()">Vender</button>
        </div>
    </div>
</template>

<script>
import ServicesAxios from "@/services/ServicesAxios";
import store from "@/store";
import axios from "axios";
import Swal from "sweetalert2";

export default{
    name: "Trade",
    data(){
        return{
            cryptos: ServicesAxios.cryptos,
            investmentHistory: [],
            amountToBuy: null,
            amountToSell: null,
            coinSelectedToBuy: null,
            coinSelectedToSell: null,
            nameCoin: null,
            buyPrice: null,
            salePrice: null,
            action: "Tarjeta de precios",
            keyWord: "Precio en ARS $",

            purchase:{
                user_id: "",
                action: "",
                crypto_code: "",
                crypto_amount: "",
                money: "",
                datetime: "",
            },

            sell:{
                user_id: "",
                action: "",
                crypto_code: "",
                crypto_amount: "",
                money: "",
                datetime: "",
            },
        }
    },

    mounted(){
        if(this.$store.state.username === ''){
            Swal.fire("Usuario no encontrado");
            this.$router.push("/");
        }
    },

    methods: {
        onChangeBuy(event){
            if(event.target.value !== ""){
                this.coinSelectedToBuy = event.target.value;
                ServicesAxios.getCryptoData(this.coinSelectedToBuy)
                .then((response) =>{
                    this.buyPrice = response.data.totalAsk;
                    // console.log(response.data);
                })
                .catch((e) =>{
                    console.log(e);
                });
                this.action = "Comprar";
                this.keyWord = "Precio de compra en ARS $";
            }else {
                this.action = "Tarjeta de precios";
                this.keyWord = "Precio en ARS $";
            }
        },
        onChangeSell(event){
            if(event.target.value !== ""){
                this.coinSelectedToSell = event.target.value;
                ServicesAxios.getCryptoData(this.coinSelectedToSell)
                .then((response) =>{
                    this.salePrice = response.data.totalBid;
                    // console.log(response.data);
                })
                .catch((e) =>{
                    console.log(e);
                });
                this.action = "Vender";
                this.keyWord = "Precio de venta en ARS $";
            }else {
                this.action = "Tarjeta de precios";
                this.keyWord = "Precio en ARS $";
            }
        },

        newBuy(){
            this.purchase.user_id = this.$store.state.username;
            this.purchase.crypto_code = this.coinSelectedToBuy;
            this.purchase.crypto_amount = this.amountToBuy.toFixed(2);
            this.purchase.money = (this.buyPrice * this.amountToBuy).toFixed(2).toString();
            this.purchase.action = "purchase";
            this.purchase.datetime = Date.now();

            ServicesAxios.newTrade(this.purchase);

            this.$store.commit("newPurchase", this.purchase);
            this.$router.push("/CurrentStatus");

            Swal.fire("Compra exitosa");
        },

        newSell(){
            let validationAmountCrypto = ServicesAxios.cryptos.find(x => x.symbol === this.coinSelectedToSell);

            if(this.amountToSell > validationAmountCrypto.amount){
                Swal.fire("Usted no cuenta con la cantidad de " + this.sell.crypto_code + " para vender");
                this.$router.push("/trade");
            }
            else{
                this.sell.user_id = this.$store.state.username;
                this.sell.crypto_code = this.coinSelectedToSell;
                this.sell.crypto_amount = this.amountToSell.toFixed(2);
                this.sell.money = (this.salePrice * this.amountToSell).toFixed(2).toString();
                this.sell.action = "sale";
                this.sell.datetime = Date.now();

                ServicesAxios.newTrade(this.sell);

                this.$store.commit("newSale", this.sell);
                this.$router.push("/CurrentStatus")

                Swal.fire("Venta exitosa");
            }
        }
    }
}
</script>

<style scoped>
.trade{
    display: flex;
    justify-content: space-evenly;
    margin: 10% 0 5% 0;
}
.title{
    margin: 5% 0 0 0;
    display: flex;
    justify-content: center;
}
</style>