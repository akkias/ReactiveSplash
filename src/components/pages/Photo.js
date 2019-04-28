import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Unsplash, { toJson } from "unsplash-js";
import Spinner from '../../assets/images/oval.svg'
require('dotenv').config();

 
const unsplash = new Unsplash({
    applicationId: '79ed20d847b11284f0c086533621e0635180afc296773f5aa6a180377afe7f5c',
    secret: '0a205b1a20b781e844b43baf3e9f4027cb07b8dfd0fa80fbb4d93b6e8133ed69'
});
class Photo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            photoDetails: []
        }
    }
    componentDidMount() {
        unsplash.photos.getPhoto(this.props.match.params.id)
        .then(toJson)
        .then(json => {
            this.setState ({
                photoDetails: json,
                isLoading: false
            });
        }) 
    }
    render() {
        return(
            <main className="pt-12 mb-0 m-6">
                <section className="photo-details">
                    <div className="flex">
                    {!this.state.isLoading ?
                        <>
                            <div className="w-3/4 pr-6 pb-6 overflow-y-auto photo-details-viewer">
                                <img alt={this.state.photoDetails.alt_description} src={this.state.photoDetails.urls.regular} className="w-full" />
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
                                    <button className="w-1/3 bg-white hover:text-blue-600 border-0 text-sm px-4 py-2 leading-none rounded cursor-pointer shadow">
                                        <ion-icon class="align-middle mr-1" name="heart-empty"></ion-icon>{this.state.photoDetails.likes}
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
                                <div className="border-b border-l-0 border-t-0 border-r-0 border-solid border-gray-300 pt-4">
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
                        : <img alt="Loading" className="mx-auto spinner fixed" src={Spinner} />
                    }
                    </div>
                </section>
            </main>
        )
    }
}
export default Photo;