import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from 'axios'

export default new Vuex.Store({
    state: {
        condition: '',
        conditions: [],
        criteria: '',
        criteriaId: '',
    },
    mutations: {

        updateCondition(state, value) {
            state.condition = value;
        },
        updateConditions(state, value) {
            state.conditions = value;
        },
        updateCriteria(state, value) {
            state.criteria = value;
        },
        updateCriteriaID(state, value) {
            state.criteriaId = value;
        },

    },
    actions: {
        updateCond({commit}, cond) {
            commit('updateCondition', cond)
        },
        updateConds({commit}, conds) {
            commit('updateConditions', conds)
        },
        updateCri({commit}, cri) {
            commit('updateCri', cri)
        },
        updateCriID({commit}, criid) {
            commit('updateCriID', criid)
        },
    },
    getters: {
        getCondition(state) {
            return state.condition
        },
        getSearchedConditions(state) {
            return state.conditions
        },
        getCriteria(state) {
            return state.criteria
        },
        getCriteriaID(state) {
            return state.criteriaId
        },
    },
    modules: {}
})
