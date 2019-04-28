import React, { Component } from 'react';
import ImageCard from '../ImageCard';
import Masonry from 'react-masonry-component';
import Unsplash, { toJson } from "unsplash-js";
import Spinner from '../../assets/images/oval.svg'
require('dotenv').config();



const masonryOptions = {
    transitionDuration: 0,
    columnWidth: '.image-card'
};
 
const unsplash = new Unsplash({
    applicationId: '79ed20d847b11284f0c086533621e0635180afc296773f5aa6a180377afe7f5c',
    secret: '0a205b1a20b781e844b43baf3e9f4027cb07b8dfd0fa80fbb4d93b6e8133ed69'
});

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            images: []
        }
    }
    componentDidMount() {
        unsplash.photos.listPhotos(1, 15, "latest")
        .then(toJson)
        .then(json => {
            this.setState ({
                images: json,
                isLoading: false
            })
        });
    }
    render() {
        
        return(
            <main className="mt-24 m-6">
                <section className="px-12">
                    <h1 className="text-3xl">ReactSplash is built on the top of Unsplash APIs</h1>
                {!this.state.isLoading ?
                    <Masonry
                    className={'images--container p-0 -mx-4'} // default ''
                    options={masonryOptions} // default {}
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                    >
                        {this.state.images.map(image => {
                            return(
                                <ImageCard image={image} />
                            )
                        })
                    }
                    </Masonry>
                    : <img alt="Loading" className="mx-auto spinner fixed" src={Spinner} />
                }
            </section>
        </main>
    )
}
}
export default Home;