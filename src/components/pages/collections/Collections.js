import React, { Component } from 'react';
import Spinner from '../../../assets/images/oval.svg'
import CollectionCard from './CollectionCard';
import {connect} from 'react-redux';
import { fetchCollections } from '../../../redux/actions/Collections'

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
        this.fetchAllCollections();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    fetchAllCollections = () => {
        this.props.fetchCollections();
    }
    render() {
        return(
            <main className="mt-24 m-6">
                <section className="px-12">
                    <h1 className="text-3xl">Collections</h1>
                    <div className="flex flex-wrap -mx-4">
                        {!this.props.areCollectionsLoadings ?
                        this.props.collections.collections.map(collection => {
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
const mapStateToProps = state => ({
    ...state
})
const mapDispatchToProps = dispatch => ({
    fetchCollections: () => dispatch(fetchCollections())
})
export default connect(mapStateToProps,mapDispatchToProps)(Collections);