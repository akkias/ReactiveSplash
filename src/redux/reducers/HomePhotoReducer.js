export default(state = {photos: [], isLoading: true}, action) => {
    switch (action.type) {
        case 'GET_HOME_PHOTOS':
        const newState = {...state, photos: action.payload.photos, isLoading: false};
        return newState;
     default:
      return state
    }
  }