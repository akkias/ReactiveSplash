import React, { Component } from 'react';
import { toJson } from "unsplash-js";
import { unsplash } from '../../../utils/Utils';
import Spinner from '../../../assets/images/oval.svg';
import { ProfileTabs } from '../profile/ProfileTabs';
import {connect} from 'react-redux';
import CollectionCard from '../collections/CollectionCard';
import ProfileHeader from './ProfileHeader';


class UserCollections extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            isProfileLoading: true,
            areUploadsLoading: true,
            profile: [],
            collections: []
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.fetchProfile();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    fetchCollections = () => {
        unsplash.users.collections(this.state.profile.username, 1, 15)
        .then(toJson)
        .then(json => {
            this.setState ({
                collections: json,
                areUploadsLoading: false
            })
        })
    }
    fetchProfile = () => {
        unsplash.users.profile(this.props.match.params.username)
        .then(toJson)
        .then(json => {
            this._isMounted && this.setState ({
                profile: json,
                isProfileLoading: false
            }, () => this.fetchCollections())
        });
    }
    render() {
        const wrapper = {
            marginTop: 62
        }
        const user = this.props.user.userDetails;
        return(
            <main className="mx-6" style={wrapper}>
                <section className="px-12">
                    {!this.props.user.isLoading ?
                        <ProfileHeader user={user} />
                        :
                        <img alt="Loading" className="mx-auto spinner fixed" src={Spinner} />
                    }
                    <ProfileTabs username={user.username} photosCount={user.total_photos} likesCount={user.total_likes} collectionCount={user.total_collections} />
                    <div className="flex flex-wrap -mx-4">
                        {this.state.collections.map(collection => 
                            <CollectionCard collection={collection} key={collection.id} />
                        )}
                    </div>
                </section>
            </main>
        )
    }
}
const mapStateToProps = state => ({
    ...state
});
export default connect(mapStateToProps)(UserCollections);