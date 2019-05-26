import React, { Component } from 'react';
import ImageCard from '../ImageCard';
import Masonry from 'react-masonry-component';
import { masonryOptions } from '../../utils/Utils';
import {withRouter} from 'react-router-dom';
import Spinner from '../../assets/images/oval.svg'
import { SearchTabs } from './SearchTabs';
import { connect } from 'react-redux';
import { searchAll } from '../../redux/actions/SearchActions';

class Search extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            isLoading: true,
            results: {}
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.triggerSearchAll();
    }
    componentDidUpdate(prevProps) {
        if(prevProps.match.params.query !== this.props.match.params.query) {
            this.triggerSearchAll()
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    triggerSearchAll = () => {
        this.props.searchAll(this.props.match.params.query);
    }
    render() {
        return(
            <main className="mt-24 m-6">
            <section className="px-12">
            <h1 className="text-3xl">
                {this.props.match.params.query}
            </h1>
            {!this.props.search.isLoading && this.props.search &&
                <SearchTabs 
                    query={this.props.match.params.query} 
                    totalPhotos={this.props.search.results.photos.total}
                    totalUsers={this.props.search.results.users.total}
                    totalCollections={this.props.search.results.collections.total} />
            }
            {!this.props.search.isLoading ?
                <>
                    <Masonry
                    className={'images-container p-0 -mx-4'} // default ''
                    options={masonryOptions} // default {}
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                    >
                        {this.props.search.results.photos.results.map(image => {
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
}const mapStateToProps = state => ({
    ...state
})
const mapDispatchToProps = dispatch => ({
    searchAll: (query) => dispatch(searchAll(query))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));