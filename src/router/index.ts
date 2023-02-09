import {createRouter, createWebHistory} from "vue-router";
import home from "../Modules/Home/Pages/Home.vue"
import dashboard from "../Modules/Dashboard/Pages/Dashboard.vue"
import login from "../Modules/Auth/Pages/Login.vue"
import otp from '../Modules/OTP/Pages/OTP.vue'

const routes = [
    {
        path: "/",
        name: "register",
        component: home
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: dashboard,
    },
    {
        path: "/login/:phone",
        name: "Login",
        component: login
    },
    {
        path: "/otp",
        name: "otp",
        component: otp
    }
];
const router = createRouter({history: createWebHistory(), routes});
export default router;