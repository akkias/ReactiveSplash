import React from 'react'
import { Link } from 'react-router-dom'
import Badge from '../../../assets/images/verified.svg'

const ProfileHeader = (props) => {
    return(
        <header className="py-12 md:flex">
            <div className="md:mr-12">
                <img className="rounded-full" alt={props.user.name} src={props.user.profile_image.large} />
            </div>
            <div>
                <h1 className="m-0">
                    {props.user.name}
                    {props.user.badge && 
                        <img alt="Loading" className="badge rounded-full ml-1" src={Badge} />
                    }
                    </h1>
                <p className="mt-2 text-gray-600">@{props.user.username}</p>
                {props.user.bio && <p>{props.user.bio}</p>}
                <div className="mt-2">
                    <small className="text-gray-600">Interests</small>
                    <div className="flex flex-wrap mt-4">
                        {props.user.tags.custom && props.user.tags.custom.map(tag => 
                            <Link to={`/search/photos/${tag.title}`} className="capitalize mb-2 text-sm text-gray-700 bg-gray-200 hover:text-gray-1000 hover:bg-gray-300 py-1 px-2 rounded mr-2" key={tag.title}>{tag.title}</Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
export default ProfileHeader;