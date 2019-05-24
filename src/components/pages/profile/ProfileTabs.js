import React from 'react'
import { NavLink } from 'react-router-dom';

export const ProfileTabs = (props) => {
    return (
        <div className="flex font-medium mb-4">
            <NavLink to={`/${props.username}`} activeClassName="text-gray-900" className="text-gray-600 mr-6">{props.photosCount} Photos</NavLink>
            <NavLink to={`/${props.username}/likes`} activeClassName="text-gray-900" className="text-gray-600 mr-6">{props.likesCount} Liked</NavLink>
            <NavLink to={`/${props.username}/collections`} activeClassName="text-gray-900" className="text-gray-600">{props.collectionCount} Collections</NavLink>
        </div>
    )
}