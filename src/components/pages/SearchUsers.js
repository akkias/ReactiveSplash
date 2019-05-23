import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { unsplash } from '../../utils/Utils';
import { toJson } from "unsplash-js";
import Spinner from '../../assets/images/oval.svg'
import { UserCard } from './UserCard';
import { SearchTabs } from './SearchTabs';

class SearchUsers extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            isLoading: true,
            users: []
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
        unsplash.search.users(this.props.match.params.query, 1, 12)
        .then(toJson)
        .then(json => {
            this.setState ({
                users: json,
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
                {!this.state.isLoading ?
                <>
                    <h1 className="text-3xl">
                        {this.props.match.params.query}
                    </h1>
                    {this.state.users.results &&
                        <SearchTabs query={this.props.match.params.query} total={this.state.users.total} />
                    }
                    <div className="flex flex-wrap -mx-4">
                        {this.state.users.results.map(user => {
                            return(
                                <UserCard key={user.id} followUser={(id) => this.followUser(id)} user={user} />
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
export default withRouter(SearchUsers);