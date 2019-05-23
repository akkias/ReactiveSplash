import Unsplash from "unsplash-js";
import {createBrowserHistory} from 'history';

export const history = createBrowserHistory();

export const masonryOptions = {
    transitionDuration: 0,
    columnWidth: '.image-card'
};


export const unsplash = new Unsplash({
    applicationId: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
    secret: process.env.REACT_APP_UNSPLASH_SECRET_KEY,
    callbackUrl: process.env.REACT_APP_CALLBACK_URL
});
export const unsplashWithToken = (token) => new Unsplash({
    applicationId: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
    secret: process.env.REACT_APP_UNSPLASH_SECRET_KEY,
    callbackUrl: process.env.REACT_APP_CALLBACK_URL,
    bearerToken: token
});

export const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    "public",
    "read_user",
    "write_user",
    "read_photos",
    "write_photos",
    "write_likes",
    "read_collections",
    "write_collections"
  ]);

export const getQueryStringValue = (key) => {  
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace("\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}