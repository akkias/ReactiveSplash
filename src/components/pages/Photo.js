import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { toJson } from "unsplash-js";
import { unsplash } from '../../utils/Utils';
import {connect} from 'react-redux';
import Spinner from '../../assets/images/oval.svg'
import { likePhoto } from '../../redux/actions/HomePhoto';
import CollectionCard from './collections/CollectionCard';
class Photo extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            isLoading: true,
            photoDetails: []
        }
    }
    componentDidMount() {
        this._isMounted = true;
        unsplash.photos.getPhoto(this.props.match.params.id)
        .then(toJson)
        .then(json => {
            this._isMounted && this.setState ({
                photoDetails: json,
                isLoading: false
            });
        }) 
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    likeCurrentPhoto = (token, id)  => {
        this.props.likePhoto(token, id)
    }
    render() {
        return(
            <main className="pt-12 mb-0 m-6">
                {!this.state.isLoading ?
                    <>
                    <section className="photo-details flex">
                            <>
                                <div className="w-3/4 h-full pr-6 overflow-y-auto photo-details-viewer">
                                    <figure className="m-0">
                                        <img alt={this.state.photoDetails.alt_description} src={this.state.photoDetails.urls.regular} className="max-h-full mx-auto block" />
                                        {this.state.photoDetails.description && <figcaption className="my-4 mx-auto text-sm">{this.state.photoDetails.description}</figcaption>}
                                    </figure>
                                </div>
                                <div className="w-1/4 pb-4 pl-3 overflow-y-auto photo-details-sidebar">
                                    <Link to={`/${this.state.photoDetails.user.username}`} className="text-sm text-gray-900 flex">
                                        <div>
                                            <img className="align-middle mr-2 rounded-full h-8 w-8" alt={this.state.photoDetails.user.name} src={this.state.photoDetails.user.profile_image.medium} />
                                        </div>
                                        <div>
                                            <span className="font-semibold">{this.state.photoDetails.user.name}</span>
                                            <span className="block text-gray-600">&copy; {this.state.photoDetails.user.username}</span>
                                        </div>
                                    </Link>
                                    <div className="border border-l-0 border-r-0 border-solid border-gray-300 py-4 mt-4 flex justify-center">
                                        <button onClick={() => this.likeCurrentPhoto(this.props.auth.token, this.state.photoDetails.id)} className="w-1/3 bg-white hover:text-blue-600 border-0 text-sm px-4 py-2 leading-none rounded cursor-pointer shadow">
                                            <ion-icon class={`align-middle mr-1 ${this.state.photoDetails.liked_by_user && `text-red-600`}`} name={this.state.photoDetails.liked_by_user ? `heart` : `heart-empty`}></ion-icon>{this.state.photoDetails.likes}
                                        </button>
                                        <button className="w-1/3 bg-white hover:text-blue-600 border-0 text-sm px-4 py-2 leading-none rounded mx-4 cursor-pointer shadow">
                                            <ion-icon class="align-middle mr-1" name="add"></ion-icon>Collect
                                        </button>
                                        <button className="w-1/3 bg-white hover:text-blue-600 border-0 text-sm px-4 py-2 leading-none rounded cursor-pointer shadow">
                                            <ion-icon class="align-middle mr-1" name="arrow-round-down"></ion-icon>Download
                                        </button>
                                    </div>
                                    <div className="border-b border-l-0 border-t-0 border-r-0 border-solid border-gray-300 py-4">
                                        <h4 className="mb-3 mt-0 text-xs font-normal text-gray-700">PHOTO STATISTICS</h4>
                                        <div className="flex">
                                            <div className="w-1/3">
                                                <h5 className="mb-2 mt-0 font-normal"><ion-icon class="align-middle mr-1" name="eye"></ion-icon>Views</h5>
                                                <h3 className="m-0 font-normal">{this.state.photoDetails.views}</h3>
                                            </div>
                                            <div className="w-1/3">
                                                <h5 className="mb-2 mt-0 font-normal"><ion-icon class="align-middle mr-1" name="arrow-round-down"></ion-icon>Downloads</h5>
                                                <h3 className="m-0 font-normal">{this.state.photoDetails.downloads}</h3>

                                            </div>
                                            <div className="w-1/3">
                                                <h5 className="mb-2 mt-0 font-normal"><ion-icon class="align-middle mr-1" name="heart-empty"></ion-icon>Likes</h5>
                                                <h3 className="m-0 font-normal">{this.state.photoDetails.likes}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <h4 className="mb-3 mt-0 text-xs font-normal text-gray-700">EXIF DATA</h4>
                                        <div className="flex flex-wrap">
                                            <div className="w-1/3 mb-4">
                                                <h5 className="mb-2 mt-0 font-normal">Camera Make</h5>
                                                <h3 className="text-sm m-0 font-semibold">{this.state.photoDetails.exif.make || `--`}</h3>
                                            </div>
                                            <div className="w-1/3 mb-4">
                                                <h5 className="mb-2 mt-0 font-normal">Camera Model</h5>
                                                <h3 className="text-sm m-0 font-semibold">{this.state.photoDetails.exif.model || `--`}</h3>
                                            </div>
                                            <div className="w-1/3 mb-4">
                                                <h5 className="mb-2 mt-0 font-normal">Focal Length</h5>
                                                <h3 className="text-sm m-0 font-semibold">{this.state.photoDetails.exif.focal_length || `--`}{this.state.photoDetails.exif.focal_length && `mm`}</h3>
                                            </div>
                                            <div className="w-1/3 mb-4">
                                                <h5 className="mb-2 mt-0 font-normal">Aperture</h5>
                                                <h3 className="text-sm m-0 font-semibold">{this.state.photoDetails.exif.aperture && `ƒ/`}{this.state.photoDetails.exif.aperture || `--`}</h3>
                                            </div>
                                            <div className="w-1/3 mb-4">
                                                <h5 className="mb-2 mt-0 font-normal">Shutter Speed</h5>
                                                <h3 className="text-sm m-0 font-semibold">{this.state.photoDetails.exif.exposure_time || `--`}</h3>
                                            </div>
                                            <div className="w-1/3 mb-4">
                                                <h5 className="mb-2 mt-0 font-normal">ISO</h5>
                                                <h3 className="text-sm m-0 font-semibold">{this.state.photoDetails.exif.iso || `--`}</h3>
                                            </div>
                                            <div className="w-1/3 mb-4">
                                                <h5 className="mb-2 mt-0 font-normal">Dimensions</h5>
                                                <h3 className="text-sm m-0 font-semibold">{this.state.photoDetails.width} x {this.state.photoDetails.height}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                    </section>
                    <section className="mt-12">
                        <h3 className="font-normal m-0">Featured in {this.state.photoDetails.related_collections.total} collections</h3>
                        <div className="flex flex-wrap -mx-4">
                            {this.state.photoDetails.related_collections.results.map(collection => 
                                <CollectionCard collection={collection} key={collection.id} />
                            )}
                        </div>
                    </section>
                    <section className="my-8">
                        <h3 className="font-normal mb-5">Related tags</h3>
                        {this.state.photoDetails.tags.map(tag => 
                            <Link to={`/search/photos/${tag.title}`} className="capitalize mb-2 text-sm text-gray-700 bg-gray-200 hover:text-gray-1000 hover:bg-gray-300 py-1 px-2 rounded mr-2" key={tag.title}>{tag.title}</Link>
                        )}
                    </section>
                    </>
                    : <img alt="Loading" className="mx-auto spinner fixed" src={Spinner} />
                }
            </main>
        )
    }
}
const mapStateToProps = state => ({
    ...state
})
const mapDispatchToProps = dispatch => ({
    likePhoto: (token, id) => dispatch(likePhoto(token, id))
})
export default connect(mapStateToProps, mapDispatchToProps)(Photo);