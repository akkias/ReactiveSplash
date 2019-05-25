import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import { masonryOptions } from '../../utils/Utils';
import Spinner from '../../assets/images/oval.svg';
import { ProfileTabs } from './profile/ProfileTabs';
import ImageCard from '../ImageCard';
import {connect} from 'react-redux';
import { fetchUserDetails, fetchUserUploads } from '../../redux/actions/Profile'
import ProfileHeader from './profile/ProfileHeader';


class Profile extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            isProfileLoading: true,
            user: [],
            uploads: []
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.fetchProfile();
        this.fetchUserUploads();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    
    fetchProfile = () => {
        let username = this.props.match.params.username;
        this.props.fetchUserDetails(username);
    }
    fetchUserUploads = () => {
        let username = this.props.match.params.username;
        this.props.fetchUserUploads(username);
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
                    {!this.props.user.areUploadsLoading && this.props.user.userUploads?
                        <Masonry
                        className={'images-container p-0 mb-24 -mx-4'}
                        options={masonryOptions}
                        disableImagesLoaded={false}
                        updateOnEachImageLoad={false}
                        >
                            {this.props.user.userUploads.map(image => {
                                return(
                                    <ImageCard token={this.props.auth.token} key={image.id} image={image} />
                                    )
                                    })
                        }
                       </Masonry>
                        :
                        <img alt="Loading" className="mx-auto spinner fixed" src={Spinner} />
                    }
                </section>
            </main>
        )
    }
}
const mapStateToProps = state => ({
    ...state
});
const mapDispatchToProps = dispatch => ({
    fetchUserDetails: (username) => dispatch(fetchUserDetails(username)),
    fetchUserUploads: (username) => dispatch(fetchUserUploads(username))
})
export default connect(mapStateToProps, mapDispatchToProps)(Profile);