import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, Image, Message } from 'semantic-ui-react';
import BeerDetails from './BeerDetails';
import '../styles/BeerGrid.css';

class BeerGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpened: false,
        };

        this.beerDetailData = null;
        this.onCloseDetail = this.onCloseDetail.bind(this);
    }

    onCloseDetail() {
        this.beerDetailData = null;
        this.setState({
            isModalOpened: false,
        });
    }

    handleClick(event, beer) {
        event.preventDefault();

        this.openBeerDetail(beer);
    }

    handleKeyPress(event, beer) {
        event.preventDefault();

        if (event.key === 'Enter') {
            this.openBeerDetail(beer);
        }
    }

    openBeerDetail(beer) {
        this.beerDetailData = beer;
        this.setState({
            isModalOpened: true,
        });
    }

    render() {
        const { beers } = this.props;
        const { isModalOpened } = this.state;

        return (
            <React.Fragment>
                {
                    beers.length > 0
                        ? (
                            <Grid stackable columns={4}>
                                {
                                    beers.map(beer => (
                                        <Grid.Column key={beer.id} stretched>
                                            <Card centered link onClick={e => this.handleClick(e, beer)} onKeyPress={e => this.handleKeyPress(e, beer)} tabIndex='0'>
                                                <div className="card-image-wrapper">
                                                    <Image
                                                        centered
                                                        style={{ maxHeight: 200 }}
                                                        src={beer.image_url}
                                                        alt={beer.name}
                                                    />
                                                </div>
                                                <Card.Content>
                                                    <Card.Header>{beer.name}</Card.Header>
                                                    <Card.Meta>
                                                        <span className='date'>{`Since ${beer.first_brewed}`}</span>
                                                    </Card.Meta>
                                                    <Card.Description>{beer.tagline}</Card.Description>
                                                </Card.Content>
                                                <Card.Content extra>
                                                    { `${beer.abv} % - ${beer.ibu} IBU` }
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    ))
                                }
                            </Grid>
                        )
                        : <Message color='orange'>{'We didn\'t find beers that match your taste!'}</Message>
                }
                {
                    isModalOpened
                    && <BeerDetails beer={this.beerDetailData} onCloseDetail={this.onCloseDetail} />
                }
            </React.Fragment>
        );
    }
}

BeerGrid.defaultProps = {
    beers: [],
};

BeerGrid.propTypes = {
    beers: PropTypes.arrayOf(PropTypes.shape({})),
};

export default BeerGrid;
