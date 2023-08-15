<template>
    <h1 class="title">Trending Coins</h1>

    <div class="slider">
    <div class="coins row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-6">
        <div class="card" v-for="coin of trendCoins" :key="coin.id" >
            <div class="card-body"  >
            <div class="inside-card">
            <div class="logo"><img :src="coin.image.small"></div>
                <div class="info">
                <h5 class="card-title" >{{coin.name}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{coin.symbol}}</h6>
                <p class="card-text">ARS$ {{coin.market_data.current_price.ars.toLocaleString()}}</p>
                </div>
            </div>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';

export default{
    name: "CoinsData",
    data(){
        return{
            trendCoins: null,
        }
    },
    mounted(){
        const Coins = {
            method: 'GET',
            url: 'https://api.coingecko.com/api/v3/coins/',
        };

        axios.request(Coins).then(response => {
            this.trendCoins = response.data.filter(x => x.id === "bitcoin" || x.id === "ethereum" || x.id === "binancecoin" || x.id === "tether" || x.id === "binance-usd");
        }).catch(function (error) {
            console.log(error);
        });
    },
}
</script>

<style scoped>
.coins{
    display: flex;
    justify-content: space-evenly;
}
.inside-card{
    display:flex;
    justify-content: space-around;
}
.title{
    margin: 2% 0 2% 0;
}
.card{
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
}
</style>