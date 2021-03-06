import React, { Component } from 'react';
import ImageCard from '../ImageCard';
import Masonry from 'react-masonry-component';
import {connect} from 'react-redux';
import { masonryOptions } from '../../utils/Utils';
import Spinner from '../../assets/images/oval.svg';
import { getPhotos } from '../../redux/actions/HomePhoto';



class Home extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            isLoading: true,
            images: []
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.fetchLatestPhotos();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    fetchLatestPhotos = () => {
        this.props.getPhotos();
    }
    render() {
        return(
            <main className="mt-24 m-6">
                <section className="px-12">
                    <h1 className="text-3xl">ReactSplash is built on the top of Unsplash APIs</h1>
                    {!this.props.home.isLoading ?
                       <Masonry
                       className={'images-container p-0 -mx-4'}
                       options={masonryOptions}
                       disableImagesLoaded={false}
                       updateOnEachImageLoad={false}
                       >
                           {this.props.home.photos.map(image => {
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
    getPhotos: () => dispatch(getPhotos())
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);