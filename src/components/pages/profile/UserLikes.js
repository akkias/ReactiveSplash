import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { toJson } from "unsplash-js";
import Masonry from 'react-masonry-component';
import { unsplash, masonryOptions } from '../../../utils/Utils';
import Spinner from '../../../assets/images/oval.svg';
import Badge from '../../../assets/images/verified.svg'
import { ProfileTabs } from '../profile/ProfileTabs';
import ImageCard from '../../ImageCard';
import {connect} from 'react-redux';


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
        const profile = this.state.profile;
        return(
            <main className="mx-6" style={wrapper}>
                <section className="px-12">
                    {this.state.isProfileLoading ?
                        <img alt="Loading" className="mx-auto spinner fixed" src={Spinner} />
                        :
                        <header className="py-12 md:flex">
                            <div className="md:mr-12">
                                <img className="rounded-full" alt={profile.name} src={profile.profile_image.large} />
                            </div>
                            <div>
                                <h1 className="m-0">
                                    {profile.name}
                                    {profile.badge && 
                                        <img alt="Loading" className="badge rounded-full ml-1" src={Badge} />
                                    }
                                    </h1>
                                <p className="mt-2 text-gray-600">@{profile.username}</p>
                                {profile.bio && <p>{profile.bio}</p>}
                                <div className="mt-2">
                                    <small className="text-gray-600">Interests</small>
                                    <div className="flex flex-wrap mt-4">
                                        {profile.tags.custom && profile.tags.custom.map(tag => 
                                            <Link to={`/search/photos/${tag.title}`} className="capitalize mb-2 text-sm text-gray-700 bg-gray-200 hover:text-gray-1000 hover:bg-gray-300 py-1 px-2 rounded mr-2" key={tag.title}>{tag.title}</Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </header>
                    }
                    <ProfileTabs username={profile.username} photosCount={profile.total_photos} likesCount={profile.total_likes} collectionCount={profile.total_collections} />
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