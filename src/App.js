import React from 'react';
import { Header, Loader, Message, Icon, Container } from 'semantic-ui-react';
import BeerGrid from './components/BeerGrid';
import Filter from './components/Filter';
import './App.css';

const API_URL = 'https://api.punkapi.com/v2/beers';

/**
 * App Component
 *
 * Main component of the page.
 * It render the header and the main content.
 * It also get beer data from the API when component is mounted and when Filter executes onFilter action
 */
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
        this.getBeers();
    }

    onFilter(filters) {
        this.getBeers(filters);
    }

    /**
     * Get a list of beers from the API
     *
     * @param {Object} filters key value pairs that are send as query params in the API call
     */
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

        return window.fetch(requestUrl)
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
            <div>
                <header className="app-header">
                    <Header as='h1' inverted>
                        <Icon name='beer' />
                        <Header.Content>
                            Punk Beers
                            <Header.Subheader>by Nicolas Burghi</Header.Subheader>
                        </Header.Content>
                    </Header>
                </header>

                <Container>
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
                        && <Message color='red'>Oops there was a problem serving the beer! Please try again in a few minutes.</Message>
                    }
                </Container>
            </div>
        );
    }
}

export default App;
