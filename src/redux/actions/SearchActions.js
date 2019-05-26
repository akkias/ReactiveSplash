import { unsplash } from "../../utils/Utils";
import { toJson } from "unsplash-js";

export const searchAll = (query) => dispatch => {
    unsplash.search.all(query, 1, 12)
    .then(toJson)
    .then(json => {
        dispatch({
            type: "SEARCH_ALL",
            payload: json,
            isLoading: true
        })
    });
}