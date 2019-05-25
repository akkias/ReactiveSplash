import React, { Component } from 'react';
import ImageCard from '../ImageCard';
import Masonry from 'react-masonry-component';
import { unsplash, masonryOptions } from '../../utils/Utils';
import {withRouter} from 'react-router-dom';
import { toJson } from "unsplash-js";
import Spinner from '../../assets/images/oval.svg'
import { SearchTabs } from './SearchTabs';

class Search extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            isLoading: true,
            results: []
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.triggerSearch();
    }
    componentDidUpdate(prevProps) {
        if(prevProps.match.params.query !== this.props.match.params.query) {
            this.triggerSearch()
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
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
            <h1 className="text-3xl">
                {this.props.match.params.query}
            </h1>
            {this.state.results &&
                <SearchTabs query={this.props.match.params.query} total={this.state.results.total} />
            }
                {!this.state.isLoading ?
                    <>
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