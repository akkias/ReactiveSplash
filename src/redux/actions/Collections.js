import { unsplash } from "../../utils/Utils";
import { toJson } from "unsplash-js";

export const fetchCollections = () => dispatch => {
    unsplash.collections.listCollections(1, 15, "latest")
    .then(toJson)
    .then(json => {
        dispatch({
            type: 'FETCH_COLLECTIONS',
            payload: json
        })
    })
}