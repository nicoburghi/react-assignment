import React from 'react';
import { Loader, Segment } from 'semantic-ui-react';
import logo from './logo.svg';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import BeerGrid from './components/BeerGrid';
import Filter from './components/Filter';

const API_URL = 'https://api.punkapi.com/v2/beers';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isFetching: false,
            data: null,
            hasError: false,
        };

        this.onFilter = this.onFilter.bind(this);
        this.getBeers = this.getBeers.bind(this);
    }

    componentDidMount() {
        this.getBeers({});
    }

    onFilter(filters) {
        this.getBeers(filters);
    }

    getBeers(filters = {}) {
        const getQueryParams = () => {
            const queryParams = Object.keys(filters)
                .filter(key => filters[key] !== '')
                .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`)
                .join('&');
            return queryParams ? `?${queryParams}` : '';
        };

        const requestUrl = `${API_URL}${getQueryParams()}`;

        this.setState({
            isFetching: true,
            hasError: false,
        });

        window.fetch(requestUrl)
            .then(response => response.json())
            .then((data) => {
                if (data.error) {
                    this.setState({
                        isFetching: false,
                        hasError: true,
                    });
                } else {
                    this.setState({
                        data,
                        isFetching: false,
                    });
                }
            }).catch(() => {
                this.setState({
                    isFetching: false,
                    hasError: true,
                });
            });
    }

    render() {
        const { data, isFetching, hasError } = this.state;

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit
                    {' '}
                    <code>src/App.js</code>
                    {' '}
                    and save to reload.
                </p>
                <Filter onFilter={this.onFilter} />
                {
                    isFetching
                    && <Loader active inline='centered' />
                }
                {
                    !isFetching && data
                    && <BeerGrid beers={data} />
                }
                {
                    hasError
                    && (
                        <Segment inverted color='red'>
                            Oops there was a problem serving the beer! Please try again in a few minutes.
                        </Segment>
                    )
                }
            </div>
        );
    }
}

export default App;
