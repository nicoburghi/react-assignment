import React from 'react';
import PropTypes from 'prop-types';
import { Header, Image, Modal } from 'semantic-ui-react';

function BeerDetails(props) {
    const { beer, onCloseDetail } = props;

    return (
        <Modal open closeIcon onClose={onCloseDetail}>
            <Modal.Header>{beer.name}</Modal.Header>
            <Modal.Content image scrolling>
                <Image wrapped size='medium' src={beer.image_url} />
                <Modal.Description>
                    <Header>{beer.tagline}</Header>
                    <p>{beer.description}</p>
                    <p>{beer.food_pairing}</p>
                    <p>{beer.brewers_tips}</p>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
}

BeerDetails.propTypes = {
    beer: PropTypes.shape({}).isRequired,
    onCloseDetail: PropTypes.func.isRequired,
};

export default BeerDetails;
