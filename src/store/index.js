import { createStore } from "vuex";
import ServicesAxios from "@/services/ServicesAxios";

export default createStore({
  state: {
    username: "",
    balanceAmount: 0,
    transactions: [],
    cryptos: ServicesAxios.cryptos,
  },
  getters: {},
  mutations: {
    newUser(state, username){
      state.username = username;
    },
    newSale(state, sale){
      var money = parseFloat(sale.money);
      var amount = parseFloat(sale.crypto_amount);
      state.cryptos.find(x => x.symbol === sale.crypto_code).sales += money;
      state.cryptos.find(x => x.symbol === sale.crypto_code).amount -= amount;
    },
    newPurchase(state, sale){
      var money = parseFloat(sale.money)
      var amount = parseFloat(sale.crypto_amount);
      state.cryptos.find(x => x.symbol === sale.crypto_code).purchases += money;
      state.cryptos.find(x => x.symbol === sale.crypto_code).amount += amount;
    },
    deleteMovement(state, movement){
      var amount = parseFloat(movement.crypto_amount);
      state.cryptos.find(x => x.symbol === movement.crypto_code).amount -= amount;
    }
  },
  actions: {},
  modules: {},
});
