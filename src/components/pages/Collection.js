import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ImageCard from '../ImageCard';
import Masonry from 'react-masonry-component';
import Unsplash, { toJson } from "unsplash-js";
require('dotenv').config();



const masonryOptions = {
    transitionDuration: 0,
    columnWidth: '.image-card'
};
 
const unsplash = new Unsplash({
    applicationId: '79ed20d847b11284f0c086533621e0635180afc296773f5aa6a180377afe7f5c',
    secret: '0a205b1a20b781e844b43baf3e9f4027cb07b8dfd0fa80fbb4d93b6e8133ed69'
});

class Collection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collectionDetails: [],
            images: []
        }
    }
    componentDidMount() {
        unsplash.collections.getCollection(175083)
        .then(toJson)
        .then(json => {
            this.setState ({
                collectionDetails: json
            });
            console.log(json)
        }) 
        unsplash.collections.getCollectionPhotos(175083, 1, 12, 'latest')
        .then(toJson)
        .then(json => {
            this.setState ({
                images: json
            })
            console.log(json)
        });
    }
    render() {
        
        return(
            <main className="m-6">
            <section className="px-12">
                <div className="mb-8">
                    <h1 className="text-3xl mb-2">{this.state.collectionDetails.title} <small className="font-normal text-sm text-gray-600">({this.state.collectionDetails.total_photos} photos)</small></h1>
                    {this.state.collectionDetails && this.state.collectionDetails.user &&
                    <Link className="text-sm text-gray-900">
                        <img className="align-middle mr-2 rounded-full h-8 w-8" alt={this.state.collectionDetails.user.name} src={this.state.collectionDetails.user.profile_image.medium} />
                        {this.state.collectionDetails.user.name}
                    </Link>
                    }
                </div>
                {this.state.images && this.state.images.length > 0 &&
                <Masonry
                className={'images--container p-0 -mx-4'} // default ''
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
                }
            </section>
        </main>
    )
}
}
export default Collection;