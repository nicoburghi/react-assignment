import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Message } from 'semantic-ui-react';
import BeerCard from './BeerCard';
import BeerDetails from './BeerDetails';
import '../styles/BeerGrid.css';

/**
 * Beer Grid Component
 *
 * Render a grid of beers cards.
 * It manage the action of opening a beer detail
 */
class BeerGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpened: false,
        };

        this.beerDetailData = null;
        this.onCloseDetail = this.onCloseDetail.bind(this);
        this.onOpenBeerDetail = this.onOpenBeerDetail.bind(this);
    }

    onCloseDetail() {
        this.beerDetailData = null;
        this.setState({
            isModalOpened: false,
        });
    }

    onOpenBeerDetail(beer) {
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
                                            <BeerCard beer={beer} onOpenBeerDetail={this.onOpenBeerDetail} />
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
    beers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        tagline: PropTypes.string.isRequired,
        first_brewed: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
        abv: PropTypes.number,
        ibu: PropTypes.number,
    })),
};

export default BeerGrid;
