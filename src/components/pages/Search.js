import React, { Component } from 'react';
import ImageCard from '../ImageCard';
import Masonry from 'react-masonry-component';
import {withRouter} from 'react-router-dom';
import { unsplash, masonryOptions } from '../../utils/Utils';
import { toJson } from "unsplash-js";
import Spinner from '../../assets/images/oval.svg'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            results: []
        }
    }
    componentDidMount() {
        this.triggerSearch();
    }
    componentDidUpdate(prevProps) {
        if(prevProps.match.params.query !== this.props.match.params.query) {
            this.triggerSearch()
        }
    }
    triggerSearch = () => {
        unsplash.search.photos(this.props.match.params.query, 1, 12)
        .then(toJson)
        .then(json => {
            this.setState ({
                results: json,
                isLoading: false
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