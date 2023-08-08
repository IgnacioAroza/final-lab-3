import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import TradeView from "@/views/TradeView.vue";
import CurrentStatusView from "@/views/CurrentStatusView.vue";
import TradeHistoryView from "@/views/TradeHistoryView.vue"

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path:"/login",
    name: "Login",
    component: LoginView
  },
  {
    path: "/",
    name: "Register",
    component: RegisterView
  },
  {
    path: "/trade",
    name: "Trade",
    component: TradeView
  },
  {
    path: "/currentStatus",
    name: "CurrentStatus",
    component: CurrentStatusView
  },
  {
    path: "/tradeHistory",
    name: "TradeHistory",
    component: TradeHistoryView
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
