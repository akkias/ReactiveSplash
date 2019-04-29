import React, { Component } from 'react';
import ImageCard from '../ImageCard';
import Masonry from 'react-masonry-component';
import {withRouter} from 'react-router-dom';
import Unsplash, { toJson } from "unsplash-js";
import Spinner from '../../assets/images/oval.svg'



const masonryOptions = {
    transitionDuration: 0,
    columnWidth: '.image-card'
};
 
const unsplash = new Unsplash({
    applicationId: '79ed20d847b11284f0c086533621e0635180afc296773f5aa6a180377afe7f5c',
    secret: '0a205b1a20b781e844b43baf3e9f4027cb07b8dfd0fa80fbb4d93b6e8133ed69'
});

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            results: []
        }
    }
    componentDidMount() {
        unsplash.search.photos(this.props.match.params.query, 1, 12)
        .then(toJson)
        .then(json => {
            this.setState ({
                results: json,
                isLoading: false
            })
            console.log(json)
        });
    }
    render() {
        
        return(
            <main className="mt-24 m-6">
            <section className="px-12">
                {!this.state.isLoading ?
                    <>
                        <div className="mb-8">
                            <h1 className="text-3xl mb-2">
                                {this.props.match.params.query}
                            </h1>
                        </div>
                        <Masonry
                        className={'images-container p-0 -mx-4'} // default ''
                        options={masonryOptions} // default {}
                        disableImagesLoaded={false} // default false
                        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                        >
                            {this.state.results.results.map(image => {
                                return(
                                    <ImageCard key={image.id} image={image} />
                                )
                            })
                        }
                        </Masonry>
                    </>
                    : <img alt="Loading" className="mx-auto spinner fixed" src={Spinner} />
                }
            </section>
        </main>
    )
}
}
export default withRouter(Search);