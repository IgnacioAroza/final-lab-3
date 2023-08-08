import axios from "axios";

const clientAPI = axios.create({
    baseURL: "https://laboratorio-36cf.restdb.io/rest/",
    headers: {"x-apikey": "64a5ccf686d8c5d256ed8fce"},
});

export default{
    newTrade(newTrade) {
        return clientAPI.post("/transactions", newTrade);
    },
    getMovements(username){
        return clientAPI.get(`/transactions?q={"user_id": "${username}"}`);
    },
    getMovementById(id){
        return clientAPI.get(`/transactions/${id}`);
    },
    updateMovement(id, transactionEdited){
        transactionEdited.datetime = Date.now();
        return clientAPI.put(`/transactions/${id}`, transactionEdited);
    },
    deleteMovement(id){
        return clientAPI.delete(`/transactions/${id}`);
    },

// Pagina de las Crypto

getCryptoData(coin){
    return axios.get("https://criptoya.com/api/binance/"+ coin +"/ars/0.1");
},

cryptos: [
    { id: 0, name: "Bitcoin", symbol: "BTC", amount: 0, sales: 0, purchases: 0, amountInMoney: 0, result: 0 },
    { id: 1, name: "Ethereum", symbol: "ETH", amount: 0, sales: 0, purchases: 0, amountInMoney: 0, result: 0 },
    { id: 2, name: "Theter", symbol: "USDT", amount: 0, sales: 0, purchases: 0, amountInMoney: 0, result: 0 },
    { id: 3, name: "Binance Coin", symbol: "BNB", amount: 0, sales: 0, purchases: 0, amountInMoney: 0, result: 0 },
    { id: 4, name: "Binance UDS", symbol: "BUSD", amount: 0, sales: 0, purchases: 0, amountInMoney: 0, result: 0 },
],
}