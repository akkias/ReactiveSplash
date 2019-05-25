import React, { Component } from 'react';
import { toJson } from "unsplash-js";
import Masonry from 'react-masonry-component';
import { unsplash, masonryOptions } from '../../../utils/Utils';
import Spinner from '../../../assets/images/oval.svg';
import { ProfileTabs } from '../profile/ProfileTabs';
import ImageCard from '../../ImageCard';
import {connect} from 'react-redux';
import ProfileHeader from './ProfileHeader';


class UserLikes extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            isProfileLoading: true,
            areLikesLoading: true,
            profile: [],
            likes: []
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.fetchProfile();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    fetchLikes = () => {
        unsplash.users.likes(this.state.profile.username, 1, 12)
        .then(toJson)
        .then(json => {
            this.setState ({
                likes: json,
                areLikesLoading: false
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
            }, () => this.fetchLikes())
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
                    {this.state.areLikesLoading ?
                        <img alt="Loading" className="mx-auto spinner fixed" src={Spinner} />
                        :
                        <Masonry
                        className={'images-container p-0 mb-24 -mx-4'}
                        options={masonryOptions}
                        disableImagesLoaded={false}
                        updateOnEachImageLoad={false}
                        >
                            {this.state.likes.map(image => {
                                return(
                                    <ImageCard token={this.props.auth.token} key={image.id} image={image} />
                                    )
                                    })
                        }
                       </Masonry>
                    }
                </section>
            </main>
        )
    }
}
const mapStateToProps = state => ({
    ...state
});
export default connect(mapStateToProps)(UserLikes);