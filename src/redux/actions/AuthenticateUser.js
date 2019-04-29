export const AuthenticateUser = (token) => dispatch => {
    dispatch({
        type: 'AUTHENTICATE_USER',
        payload: {
            isAuthenticated: true,
            token: token
        }
    })
}

export const LogoutUser = () => dispatch => {
    dispatch({
        type: 'LOGOUT_USER'
    })
}