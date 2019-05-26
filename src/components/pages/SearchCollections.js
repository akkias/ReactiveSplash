import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Spinner from '../../assets/images/oval.svg'
import { SearchTabs } from './SearchTabs';
import CollectionCard from './collections/CollectionCard';
import { connect } from 'react-redux';
import { searchAll } from '../../redux/actions/SearchActions';

class SearchCollections extends Component {
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
        this.props.searchAll(this.props.match.params.query);
    }
    followUser = (id) => {
        alert(id)
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
                        <div className="flex flex-wrap -mx-4">
                            {this.props.search.results.collections.results.map(collection => {
                                return(
                                    <CollectionCard key={collection.id} collection={collection} />
                                )
                            })}
                        </div>
                    </>
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
const mapDispatchToProps = dispatch => ({
    searchAll: (query) => dispatch(searchAll(query))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchCollections));