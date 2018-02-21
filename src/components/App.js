import React, { Component } from 'react';
import API from '../api/api.js';
import SelectLanguage from './SelectLanguage';
import ReposGrid from './ReposGrid';

class App extends Component {

    constructor() {
        super();
        this.state = {
            selectedLanguage: 'All',
            repos: null
        }
    };

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    };

    updateLanguage = (language) => {

        this.setState(() => ({
            selectedLanguage: language,
            repos: null
        }))


        API.fetchPopularRepositories(language)
            .then((data) => {
                this.setState({
                    selectedLanguage: language,
                    repos: data
                })
            })

    };

    render() {
        return (
            <div>
                <SelectLanguage updateLanguage={this.updateLanguage}
                                selectedLanguage={this.state.selectedLanguage} />
                {!this.state.repos
                    ? <p>LOADING</p>
                    : <ReposGrid repos={this.state.repos.items} />}
            </div>
        )
    };

};

export default App;