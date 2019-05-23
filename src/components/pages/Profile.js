import React, { Component } from 'react';
import { toJson } from "unsplash-js";
import {connect} from 'react-redux';
import { unsplash } from '../../utils/Utils';
import Spinner from '../../assets/images/oval.svg';



class Profile extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            isLoading: true,
            profile: []
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.fetchProfile();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    fetchProfile = () => {
        unsplash.users.profile(this.props.match.params.user)
        .then(toJson)
        .then(json => {
            this._isMounted && this.setState ({
                profile: json,
                isLoading: false
            })
        });
    } 
    render() {
        return(
            <main className="mt-24 m-6">
                <section className="px-12">
                
            </section>
        </main>
    )
}
}
const mapStateToProps = state => ({
    ...state
})
export default connect(mapStateToProps)(Profile);