import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ImageCard from '../../ImageCard';
import Masonry from 'react-masonry-component';
import { toJson } from "unsplash-js";
import { unsplash, masonryOptions } from '../../../utils/Utils';
import Spinner from '../../../assets/images/oval.svg'
import CollectionCard from './CollectionCard';




class Collection extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            isLoading: true,
            collectionDetails: [],
            images: [],
            relatedCollections: []
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.fetchCollection();
        this.fetchCollectionPhotos();
        this.fetchRelatedCollections();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    fetchCollection = () => {
        unsplash.collections.getCollection(this.props.match.params.id)
        .then(toJson)
        .then(json => {
            this._isMounted && this.setState ({
                collectionDetails: json
            });
        })
    }
    fetchCollectionPhotos = () => {
        unsplash.collections.getCollectionPhotos(this.props.match.params.id, 1, 12, 'latest')
        .then(toJson)
        .then(json => {
            this._isMounted && this.setState ({
                images: json,
                isLoading: false
            })
        });
    }
    fetchRelatedCollections = () => {
        unsplash.collections.listRelatedCollections(this.props.match.params.id, 20)
        .then(toJson)
        .then(json => {
            this._isMounted && this.setState ({
                relatedCollections: json
            })
        });
    }
    render() {
        return(
            <main className="mt-24 m-6">
            <section className="px-12">
                {!this.state.isLoading ?
                    <>
                        <div className="mb-8">
                            <h1 className="text-3xl mb-2">{this.state.collectionDetails.title} <small className="font-normal text-sm text-gray-600">({this.state.collectionDetails.total_photos} photos)</small></h1>
                            {this.state.collectionDetails.description && <p>{this.state.collectionDetails.description}</p>}
                            {this.state.collectionDetails.user &&
                                <Link to={`/${this.state.collectionDetails.user.username}`} className="text-sm text-gray-900">
                                    <img className="align-middle mr-2 rounded-full h-8 w-8" alt={this.state.collectionDetails.user.name} src={this.state.collectionDetails.user.profile_image.medium} />
                                    {this.state.collectionDetails.user.name}
                                </Link>
                            }
                        </div>
                        <Masonry
                        className={'images-container p-0 -mx-4'} // default ''
                        options={masonryOptions} // default {}
                        disableImagesLoaded={false} // default false
                        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                        >
                            {this.state.images.map(image => {
                                return(
                                    <ImageCard key={image.id} image={image} />
                                )
                            })
                        }
                        </Masonry>
                    </>
                    : <img alt="Loading" className="mx-auto spinner fixed" src={Spinner} />
                }
                {this.state.relatedCollections.length > 0 &&
                    <section className="mt-12">
                        <h3 className="font-normal mb-5">You might also like</h3>
                        <div className="flex flex-wrap -mx-4">
                            {this.state.relatedCollections.map(collection => 
                                <CollectionCard collection={collection} key={collection.id} />
                                )}
                        </div>
                    </section>
                }
            </section>
        </main>
    )
}
}
export default Collection;