export default (state = {results:{}, isLoading: true}, action) => {
    switch(action.type) {
        case 'SEARCH_ALL':
            const SearchResults = {...state, results: action.payload, isLoading: false}
        return SearchResults;
        default: 
        return state;
    }
}