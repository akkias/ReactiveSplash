import React from 'react'
import {Link} from 'react-router-dom'

export const UserCard = (props) => {
    return(
        <div className="p-4 w-1/4">
            <div className="h-full relative hover:shadow-lg rounded overflow-hidden border border-solid border-gray-300 user-card">
                <Link className="p-4 block" to={`/${props.user.username}`}>
                    <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full mr-4" src={props.user.profile_image.medium} alt="Avatar of Jonathan Reinink" />
                        <div className="text-sm">
                            <h4 className="text-gray-900 leading-none m-0">{props.user.name}</h4>
                            <p className="text-gray-600 mt-1 mb-0">@{props.user.username}</p>
                        </div>
                    </div>
                    <div className="flex pt-4 -mx-1 user-card--uploads">
                    {props.user.photos.map(photo => {
                        return (
                            <div className="w-1/3 h-20 mx-1 overflow-hidden relative" key={photo.id}>
                                <img className="w-full h-full absolute object-cover"
                                src={photo.urls.small}
                                sizes="(min-width: 1335px) 416px, (min-width: 992px) calc(calc(100vw - 72px) / 3), (min-width: 768px) calc(calc(100vw - 48px) / 2), 100vw"
                                srcSet={`${photo.urls.thumb} 200w, ${photo.urls.small} 400w, ${photo.urls.regular} 1080w, ${photo.urls.full}`}
                                alt={photo.alt_description} />
                            </div>
                            )
                        })}
                    </div>
                </Link>
                <button onClick={() => props.followUser(props.user.id)} className="cursor-pointer absolute right-0 top-0 mt-4 mr-4 border border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white font-bold py-1 px-2 rounded">
                    <ion-icon  class={`align-middle mr-1`} name="person-add"></ion-icon>Follow
                </button>
            </div>
        </div>
    )
}