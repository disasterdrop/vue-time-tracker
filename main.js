import Vue from 'vue';
import Vuex from 'vuex'
import App from './src/App.vue';
import './styles/main.scss';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
    },
    mutations: {
    }
});

const app = new Vue({
    render: createElement => createElement(App),
    store,
}).$mount('#app');

