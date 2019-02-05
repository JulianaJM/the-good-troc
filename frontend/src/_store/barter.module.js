import { barterService } from '../_services/barters';

const state = {
    all: {}
};

const actions = {
    getAll({ commit }) {
        commit('getAllRequest');
        barterService.getAll()
            .then(
                barters => commit('getAllSuccess', barters),
                error => commit('getAllFailure', error)
            );
    },

    createBarter({commit}, data) {
        commit('createBarterRequest');
        barterService.createBarter(data).then(
            barters => commit('createBarterSuccess', barters),
            error => commit('createBarterFailure', error)
        );

    }
};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, barters) {
        state.barters = { barters };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    createBarterRequest(state) {
        state.all = { loading: true };
    },
    createBarterSuccess(state, barters) {
        state.barters = { barters };
    },
    createBarterFailure(state, error) {
        state.all = { error };
    }
};

export const barters = {
    namespaced: true,
    state,
    actions,
    mutations
};