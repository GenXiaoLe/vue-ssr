import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        modules: {
            'counter': {
                state: {
                    counter: 108
                },
                mutations: {
                    ADD: (state) => {
                        state.counter += 1;
                    },
                    INIT: (state, counter) => {
                        state.counter = counter;
                    }
                },
                actions: {
                    getCounter({ commit }) {
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                commit('INIT', Math.random() * 100);
                                resolve();
                            }, 1000)
                        })
                    }
                }
            },
        },
    })
}