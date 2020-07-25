import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from 'axios'

export default new Vuex.Store({
    state: {
        condition: '',
        conditionId: '',
        criteria: '',
        criteriaId: '',
    },
    mutations: {
        updateCondition(state, value) {
            state.condition = value;
        },
        updateConditionID(state, value) {
            state.conditionId = value;
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
        updateCondID({commit}, condid) {
            commit('updateConditionID', condid)
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
        getConditionID(state) {
            return state.conditionId
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
