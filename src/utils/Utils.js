import Unsplash from "unsplash-js";


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
    applicationId: "ddf391f505f5baf951c083a727e15fee2df41e21f8b7829ed62c5427572cb610",
    secret: "eab18c9cfe44a97ae3b5b17c43b5b4fd12b4d98ca75479f9d229181180000be9",
    callbackUrl: process.env.REACT_APP_CALLBACK_URL,
    bearerToken: token
});

export const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    "public",
    "read_user",
    "write_user",
    "read_photos",
    "write_photos"
  ]);

export const getQueryStringValue = (key) => {  
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace("\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}