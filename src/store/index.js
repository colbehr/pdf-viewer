import { createStore } from 'vuex'

export default createStore({
    state: {
        url: "",
    },
    getters: {},
    mutations: {
        setUrl(state, url) {
            state.url = url;
        }
    },
    actions: {
        async setUrl(context, url) {
            context.commit("setUrl", url);
        },
    },
    modules: {}
})