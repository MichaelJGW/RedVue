export function combineStateAndGetters(state: {}, getters: object = {}): {} {
    Object.keys(getters).forEach(key => state[key] = getters[key](state))
    return state
}