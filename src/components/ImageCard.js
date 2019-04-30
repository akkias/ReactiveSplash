import React from 'react'
import { Link } from 'react-router-dom';

const ImageCard = (props) => {
    return (
        <figure className="text-xs image-card w-1/1 sm:w-1/2 md:w-1/3 lg:w-1/4 m-0 p-4 d-block" key={props.image.id}>
            <Link to={`/photo/${props.image.id}`}>
                <img className="w-full block" src={props.image.urls.regular} alt={props.image.alt_description} />
            </Link>
            <div className="mt-1 flex items-center font-semibold">
                <Link to="/" className="p-1 text-gray-900 hover:text-blue-600">{props.image.user.name}</Link>
                {props.image.id}
                <button className="bg-transparent hover:bg-gray-200 flex items-center rounded cursor-pointer font-semibold p-1 ml-auto border-0">
                    <ion-icon class="align-middle mr-1" name="heart-empty"></ion-icon>{props.image.likes}
                </button>
            </div>
        </figure>
    )
}
export default ImageCard;