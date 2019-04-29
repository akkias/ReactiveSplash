import React, { Component } from 'react';
import ImageCard from '../ImageCard';
import Masonry from 'react-masonry-component';
import { toJson } from "unsplash-js";
import {connect} from 'react-redux';
import { unsplash, masonryOptions } from '../../utils/Utils';
import Spinner from '../../assets/images/oval.svg';



class Home extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            isLoading: true,
            images: []
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.fetchLatestPhotos();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    fetchLatestPhotos = () => {
        unsplash.photos.listPhotos(1, 15, "latest")
        .then(toJson)
        .then(json => {
            this._isMounted && this.setState ({
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
                    : <img alt="Loading" className="mx-auto spinner fixed" src={Spinner} />
                }
            </section>
        </main>
    )
}
}
const mapStateToProps = state => ({
    ...state
})
export default connect(mapStateToProps)(Home);