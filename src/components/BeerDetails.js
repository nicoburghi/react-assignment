import React from 'react';
import PropTypes from 'prop-types';
import { Header, Image, Modal } from 'semantic-ui-react';
import '../styles/BeerDetails.css';

/**
 * Beer Detail Component
 *
 * Shows more information about a particular beer
 */
function BeerDetails(props) {
    const { beer, onCloseDetail } = props;

    return (
        <Modal className='beer-details' open closeIcon onClose={onCloseDetail}>
            <Modal.Header>{beer.name}</Modal.Header>
            <Modal.Content image scrolling>
                <Image wrapped size='medium' src={beer.image_url} alt={beer.name} />
                <Modal.Description>
                    <Header>{beer.tagline}</Header>
                    <Header as='h4'>Description</Header>
                    <p>{beer.description}</p>
                    <Header as='h4'>Food Pairing</Header>
                    <ul>
                        {
                            beer.food_pairing.map((food, i) => {
                                const key = `${i}food`;
                                return <li key={key}>{food}</li>;
                            })
                        }
                    </ul>
                    <Header as='h4'>Brewers Tips</Header>
                    <p>{beer.brewers_tips}</p>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
}

BeerDetails.propTypes = {
    beer: PropTypes.shape({
        name: PropTypes.string.isRequired,
        tagline: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
        food_pairing: PropTypes.arrayOf(PropTypes.string).isRequired,
        brewers_tips: PropTypes.string.isRequired,
    }).isRequired,
    onCloseDetail: PropTypes.func.isRequired,
};

export default BeerDetails;
