export default (state = {isAuthenticated: false, token: ''}, action) => {
  switch (action.type) {
   case 'AUTHENTICATE_USER':
   const newState = {...state, isAuthenticated: action.payload.isAuthenticated, token: action.payload.token};
    return newState;
    case 'LOGOUT_USER':
      return {...state, isAuthenticated: false, token: ''}
   default:
    return state
  }
}