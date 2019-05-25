export default ( state= {userDetails: [], uploads: [], isLoading: true, areUploadsLoading: true}, action ) => {
    switch(action.type){
        case 'FETCH_USER_DETAILS':
            const userDetails = {...state, userDetails: action.payload, isLoading: false}
        return userDetails
        case 'FETCH_USER_UPLOADS':
            const userUploads = {...state, uploads: action.payload, areUploadsLoading: false }
        return userUploads
    default:
        return state
    }
}