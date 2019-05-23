import { toJson } from "unsplash-js";
import { unsplash, unsplashWithToken } from '../../utils/Utils';

export const getPhotos = () => dispatch => {
    unsplash.photos.listPhotos(1, 15, "latest")
    .then(toJson)
    .then(json => {
        dispatch({
            type: 'GET_HOME_PHOTOS',
            payload: {
                photos: json
            }
        })
    });
}
export const likePhoto = (token, id) => dispatch => {
    unsplashWithToken(token).photos.likePhoto(id)
    .then(toJson)
    .then(json => {
        dispatch({
            type: "LIKE_PHOTO",
            payload: json
        })
    });
}