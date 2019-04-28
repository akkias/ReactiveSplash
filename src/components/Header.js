import React from 'react';
import Logo from '../assets/images/logo.svg'
import {Link, NavLink} from 'react-router-dom';

const Header = (props) => {
    return(
        <nav className="bg-white z-10 top-0 w-full flex items-center justify-between flex-wrap px-6 py-4 fixed">
            <div className="flex items-center flex-shrink-0 absolute">
                <Link to="/">
                    <img className="logo" src={Logo} alt="Reactive Unsplash" height="20" />
                    <span className="hidden font-semibold text-xl tracking-tight">Tailwind CSS</span>
                </Link>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto ml-12">
                <div className="text-sm font-medium flex-one">
                    <NavLink activeClassName="text-gray-900" to="/" className="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:underline mr-4">
                        Home
                    </NavLink>
                    <NavLink activeClassName="text-gray-900" to="/collections" className="block mt-4 lg:inline-block lg:mt-0 text-gray-600  hover:underline mr-4">
                        Collections
                    </NavLink>
                </div>
                <form className="lg:flex-grow mx-8">
                    <div className="flex items-center border-0 border-b border-solid border-gray-600 pb-1">
                        <ion-icon name="search"></ion-icon>                   
                        <input className="text-sm border-none w-full text-gray-900 mr-3 py-1 px-2 focus:outline-none" type="text" placeholder="Search free high-resolution photos" aria-label="Full name" />
                    </div>
                </form>
                {!props.isAuthenticated &&
                    <button className="bg-gray-300 border-0 inline-block text-sm px-4 py-2 leading-none rounded mt-4 lg:mt-0">Signin</button>
                }
            </div>
        </nav>
    )
}
export default Header;