import React, { Component } from 'react';
import { toJson } from "unsplash-js";
import { unsplash } from '../../utils/Utils';
import Spinner from '../../assets/images/oval.svg'
import CollectionCard from './components/CollectionCard';


class Collections extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            isLoading: true,
            collections: []
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.fetchCollections();
    }
    componentWillUnmount() {
        this._isMounted = false;
     }
    fetchCollections = () => {
        unsplash.collections.listCollections(1, 15, "latest")
        .then(toJson)
        .then(json => {
            this._isMounted &&
            this.setState ({
                collections: json,
                isLoading: false
            })
        });
    }
    render() {
        return(
            <main className="mt-24 m-6">
                <section className="px-12">
                    <h1 className="text-3xl">Collections</h1>
                    <div className="flex flex-wrap -mx-4">
                        {!this.state.isLoading ?
                        this.state.collections.map(collection => {
                            return (
                                <CollectionCard collection={collection} key={collection.id} />
                                )
                            })
                            : <img alt="Loading" className="mx-auto spinner fixed" src={Spinner} />
                        }
                    </div>
                </section>
            </main>
        )
    }
}
export default Collections;