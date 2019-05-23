import React, {useState} from 'react';
import Logo from '../assets/images/logo.svg'
import {Link, NavLink, withRouter} from 'react-router-dom';
import { authenticationUrl } from '../utils/Utils'

const Header = (props) => {
    const [query, setQuery] = useState();
    
    const handleChange = (event) => {
        setQuery(event.target.value);
    }
    const handleSearch = (event) => {
        event.preventDefault();
        props.history.push(`/search/photos/${query}`);
    }
    const navigateToAuth = () => {
        window.location.assign(authenticationUrl);
    }

    return(
        <nav className="bg-white z-10 top-0 w-full flex items-center justify-between flex-wrap px-6 py-4 fixed">
            <div className="flex items-center flex-shrink-0 absolute">
                <Link to="/" className="cursor-pointer">
                    <img className="logo" src={Logo} alt="Reactive Unsplash" height="20" />
                    <span className="hidden font-semibold text-xl tracking-tight">Tailwind CSS</span>
                </Link>
            </div>
            <div className="w-full flex-wrap block flex-grow flex items-center ml-12">
                <div className="text-sm font-medium">
                    <NavLink activeClassName="text-gray-900" to="/" className="block inline-block mt-0 text-gray-500 hover:underline mr-4">
                        Home
                    </NavLink>
                    <NavLink activeClassName="text-gray-900" to="/collections" className="block inline-block mt-0 text-gray-600  hover:underline mr-4">
                        Collections
                    </NavLink>
                </div>
                <div className="flex flex-1 w-full">
                    <form className="flex-grow md:mx-8" onSubmit={handleSubmit}>
                        <div className="flex items-center border-0 border-b border-solid border-gray-600 pb-1">
                            <ion-icon name="search"></ion-icon>                   
                            <input value={query || props.match.params.query} onChange={handleChange} className="text-sm border-none w-full text-gray-900 mr-3 py-1 px-2 focus:outline-none" type="text" placeholder="Search free high-resolution photos" />
                        </div>
                    </form>
                    {!props.isAuthenticated ?
                        <button onClick={navigateToAuth} className="bg-green-300 border-0 inline-block text-sm px-4 py-2 leading-none rounded mt-0 cursor-pointer">Sign In</button>
                        :
                        <button onClick={() => props.logout()} className="bg-gray-300 border-0 inline-block text-sm px-4 py-2 leading-none rounded mt-0 cursor-pointer">Sign Out</button>
                    }
                </div>
            </div>
        </nav>
    )
}
export default withRouter(Header);
