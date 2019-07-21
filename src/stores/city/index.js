const state = {
    nm: '北京',
    id: 1
};
const actions = {

};
const mutations = {
    CITY_INFOR(state,payload){
        state.nm = payload.nm;
        state.id = payload.id;
    }
};
export default{
    namespaced: true,
    state,
    actions,
    mutations
}