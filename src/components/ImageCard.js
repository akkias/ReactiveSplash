import React from 'react'
import { Link } from 'react-router-dom';
import { unsplashWithToken } from '../utils/Utils';
import { toJson } from "unsplash-js";


const ImageCard = (props) => {
    const likePhoto = (id)  => {
        unsplashWithToken(props.token).photos.likePhoto(id)
        .then(toJson)
        .then(json => {
            console.log(json)
          });
    }
    return (
        <figure className="text-xs image-card w-1/1 sm:w-1/2 md:w-1/3 lg:w-1/4 m-0 p-4 d-block" key={props.image.id}>
            <Link to={`/photo/${props.image.id}`}>
                <img className="w-full block" 
                    src={props.image.urls.small}  
                    sizes="(min-width: 1335px) 416px, (min-width: 992px) calc(calc(100vw - 72px) / 3), (min-width: 768px) calc(calc(100vw - 48px) / 2), 100vw"
                    srcSet={`${props.image.urls.thumb} 200w, ${props.image.urls.small} 400w, ${props.image.urls.regular} 1080w, ${props.image.urls.full}`}
                    alt={props.image.alt_description} />
            </Link>
            <div className="mt-1 flex items-center font-semibold">
                <Link to={`/${props.image.user.username}`} className="p-1 text-gray-900 hover:text-blue-600">{props.image.user.name}</Link>
                <button onClick={() => likePhoto(props.image.id)} className="bg-transparent hover:bg-gray-200 flex items-center rounded cursor-pointer font-semibold p-1 ml-auto border-0">
                    <ion-icon class={`align-middle mr-1 ${props.image.liked_by_user && `text-red-600`}`} name={props.image.liked_by_user ? `heart` : `heart-empty`}></ion-icon>{props.image.likes}
                </button>
            </div>
        </figure>
    )
}
export default ImageCard;