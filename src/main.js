import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
// import store from './store'
// import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import {createWebHistory, createRouter} from 'vue-router';
axios.defaults.baseURL = 'http://localhost:8000/api'

import Grade from './components/Grade.vue';
import Student from './components/Student.vue';
import Officer from './components/Officer.vue';
import Payment from './components/Payment.vue';
import Transaction from './components/Transaction.vue';
import Detail from './components/Detail.vue';
import Home from './components/Home.vue';

const router = createRouter({
    history : createWebHistory(),
    routes : [
        {path : '/', name : "Home", component : Home},
        {path : '/grade', name : "Grade", component : Grade},
        {path : '/student', name : "Student", component : Student},
        {path : '/officer', name : "Officer", component : Officer},
        {path : '/payment', name : "Payment", component : Payment},
        {path : '/transaction', name : "Transaction", component : Transaction},
        {path : '/detail', name : "Detail", component : Detail},
    ],
    base : "/"
})

const app = createApp(App)
// app.use(store)
app.use(router)
// app.use(VueAxios, axios)
app.config.globalProperties.axios = axios
app.use(VueSweetalert2)
app.config.globalProperties.$url = 'http://localhost:8000'
app.mount('#app')