import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toJson } from "unsplash-js";
import { unsplash } from '../../utils/Utils';
import Spinner from '../../assets/images/oval.svg'


class Collections extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            isLoading: true,
            collections: []
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.fetchCollections();
    }
    componentWillUnmount() {
        this._isMounted = false;
     }
    fetchCollections = () => {
        unsplash.collections.listCollections(1, 15, "latest")
        .then(toJson)
        .then(json => {
            this._isMounted &&
            this.setState ({
                collections: json,
                isLoading: false
            })
        });
    }
    render() {
        return(
            <main className="m-6">
                <section className="px-12">
                    <h1 className="text-3xl">Collections</h1>
                    <div className="flex flex-wrap -mx-4">
                        {!this.state.isLoading ?
                        this.state.collections.map(collection => {
                            return (
                                <div key={collection.id} className="w-1/1 sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/4 p-4 collection-card">
                                    <Link to={`/collections/${collection.id}`} className="text-gray-700 hover:text-blue-600 hover:opacity-75">
                                        <figure className="m-0 flex flex-wrap rounded overflow-hidden collection-card-images">
                                            {collection.preview_photos.map((photo, i) => {
                                                return (
                                                    <img alt={collection.title} className={`${i === 0 ? `w-full h-56` : `w-1/3 h-32`} object-cover`} src={photo.urls.small} key={photo.id} />
                                                )
                                            })}
                                        </figure>
                                    </Link>
                                    <div className="mt-2">
                                        <Link to={`/collections/${collection.id}`} className="text-gray-900">
                                            <h4 className="m-0">{collection.title}</h4>
                                        </Link>
                                        <p className="text-sm text-gray-700 mt-1 mb-0">
                                        {collection.total_photos} photos
                                        <span className="mx-2">&middot;</span>
                                        Curated by <Link to={`/collections/${collection.id}`} className="text-gray-700 hover:text-blue-600">{collection.user.name}</Link>
                                        </p>
                                    </div>
                                </div>
                                )
                            })
                            : <img alt="Loading" className="mx-auto spinner fixed" src={Spinner} />
                        }
                    </div>
                </section>
            </main>
        )
    }
}
export default Collections;