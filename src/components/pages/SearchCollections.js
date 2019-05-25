import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { unsplash } from '../../utils/Utils';
import { toJson } from "unsplash-js";
import Spinner from '../../assets/images/oval.svg'
import { SearchTabs } from './SearchTabs';
import CollectionCard from './collections/CollectionCard';

class SearchCollections extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            isLoading: true,
            collections: []
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
        unsplash.search.collections(this.props.match.params.query, 1, 12)
        .then(toJson)
        .then(json => {
            this.setState ({
                collections: json,
                isLoading: false
            })
        });
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
                    {this.state.collections &&
                        <SearchTabs query={this.props.match.params.query} total={this.state.collections.total} />
                    }
                {!this.state.isLoading ?
                <>
                    <div className="flex flex-wrap -mx-4">
                        {this.state.collections.results.map(collection => {
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
export default withRouter(SearchCollections);