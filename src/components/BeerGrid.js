import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, Image } from 'semantic-ui-react';
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
                <Grid stackable columns={4}>
                    {
                        beers.map(beer => (
                            <Grid.Column key={beer.id} stretched>
                                <Card centered link onClick={e => this.handleClick(e, beer)}>
                                    <div className="card-image-wrapper">
                                        <Image centered style={{ maxHeight: 200 }} src={beer.image_url} />
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
