import { unsplashWithToken } from "../../utils/Utils";
import { toJson } from "unsplash-js";

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