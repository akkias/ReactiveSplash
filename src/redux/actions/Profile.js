import { unsplash } from "../../utils/Utils";
import { toJson } from "unsplash-js";

export const fetchUserDetails = (username) => dispatch => {
    unsplash.users.profile(username)
    .then(toJson)
    .then(json => {
        dispatch({
            type: 'FETCH_USER_DETAILS',
            payload: json
        })
    });
}
export const fetchUserUploads = (username) => dispatch => {
    unsplash.users.photos(username, 1, 12)
    .then(toJson)
    .then(json => {
        dispatch({
            type: 'FETCH_USER_UPLOADS',
            payload: json
        })
    })
}
export const fetchUserCollections = (username) => dispatch => {
    unsplash.users.photos(username, 1, 12)
        .then(toJson)
        .then(json => {
            dispatch({
                type: 'FETCH_USER_COLLECTIONS',
                payload: json,
            })
        })
}