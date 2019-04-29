export default (state = [{isAuthenticated: false, token: ''}], action) => {
    switch (action.type) {
     case 'AUTHENTICATE_USER':
        return {...state, isAuthenticated: action.payload.isAuthenticated, token: action.payload.token}
      case 'LOGOUT_USER':
        return {...state, isAuthenticated: false, token: ''}
     default:
      return state
    }
}