import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';

/**
 * Beer Card Component
 *
 * Render a beer card which shows some summary information
 */
function BeerCard(props) {
    const { beer, onOpenBeerDetail } = props;

    const handleClick = (event) => {
        event.preventDefault();

        onOpenBeerDetail(beer);
    };

    const handleKeyPress = (event) => {
        event.preventDefault();

        if (event.key === 'Enter') {
            onOpenBeerDetail(beer);
        }
    };

    return (
        <Card centered link onClick={e => handleClick(e)} onKeyPress={e => handleKeyPress(e)} tabIndex='0'>
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
                { `${beer.abv} %${beer.ibu ? ` - ${beer.ibu} IBU` : ''}` }
            </Card.Content>
        </Card>
    );
}

BeerCard.propTypes = {
    beer: PropTypes.shape({
        name: PropTypes.string.isRequired,
        tagline: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
        food_pairing: PropTypes.arrayOf(PropTypes.string).isRequired,
        brewers_tips: PropTypes.string.isRequired,
    }).isRequired,
    onOpenBeerDetail: PropTypes.func.isRequired,
};

export default BeerCard;
