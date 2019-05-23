import React from 'react'
import { NavLink } from 'react-router-dom';

export const SearchTabs = (props) => {
    return (
        <div className="flex font-medium mb-4">
            <NavLink to={`/search/photos/${props.query}`} activeClassName="text-gray-900" className="text-gray-600 mr-6"><strong>{props.total}</strong> Photos</NavLink>
            <NavLink to={`/search/collections/${props.query}`} activeClassName="text-gray-900" className="text-gray-600 mr-6"><strong>{props.total}</strong> Collections</NavLink>
            <NavLink to={`/search/users/${props.query}`} activeClassName="text-gray-900" className="text-gray-600"><strong>{props.total}</strong> Users</NavLink>
        </div>
    )
}