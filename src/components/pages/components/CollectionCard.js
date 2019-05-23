import React from 'react'
import { Link } from 'react-router-dom'

const CollectionCard = (props) => {
    return(
        <div className="w-1/1 p-4 collection-card sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4">
            <Link to={`/collections/${props.collection.id}`} className="text-gray-700 hover:text-blue-600 hover:opacity-75">
                <figure className="m-0 flex flex-wrap overflow-hidden collection-card-images">
                    {props.collection.preview_photos.map((photo, i) => {
                        return (
                            <img alt={props.collection.title} className={`${i === 0 ? `w-full h-56` : `w-1/3 h-32`} object-cover`} src={photo.urls.small} key={photo.id} />
                        )
                    })}
                </figure>
            </Link>
            <div className="mt-2">
                <Link to={`/collections/${props.collection.id}`} className="text-gray-900">
                    <h4 className="m-0">{props.collection.title}</h4>
                </Link>
                <p className="text-sm text-gray-700 mt-1 mb-0">
                {props.collection.total_photos} photos
                <span className="mx-2">&middot;</span>
                Curated by <Link to={`/${props.collection.user.username}`} className="text-gray-700 hover:text-blue-600">{props.collection.user.name}</Link>
                </p>
            </div>
        </div>
    )
}
export default CollectionCard;