export default ( state= {userDetails: [], uploads: [], collections: [], isLoading: true, areUploadsLoading: true}, action ) => {
    switch(action.type){
        case 'FETCH_USER_DETAILS':
            const userDetails = {...state, userDetails: action.payload, isLoading: false}
        return userDetails
        case 'FETCH_USER_UPLOADS':
            const userUploads = {...state, uploads: action.payload, areUploadsLoading: false }
        return userUploads
        case 'FETCH_USER_COLLECTIONS':
            const userCollections = {...state, collections: action.payload, isLoading: false }
        return userCollections
    default:
        return state
    }
}