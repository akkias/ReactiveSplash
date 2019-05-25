export default (state = {collections: [], areCollectionsLoading: true}, action) => {
    switch(action.type) {
        case 'FETCH_COLLECTIONS': 
            const collections =  {...state, collections: action.payload, areCollectionsLoading: false}
        return collections
        default:
        return state
    }
}