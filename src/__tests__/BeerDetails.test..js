import React from 'react';
import { shallow } from 'enzyme';
import BeerDetails from '../components/BeerDetails';

describe('BeerDetails Unit Test', () => {
    let props;
    let shallowedBeerDetails;

    const getBeerDetails = () => {
        if (!shallowedBeerDetails) {
            shallowedBeerDetails = shallow(<BeerDetails {...props} />);
        }
        return shallowedBeerDetails;
    };

    beforeEach(() => {
        props = {
            beer: {
                name: 'Test Beer',
                tagline: 'A beer for testing',
                description: 'Just a mock beer for testing',
                image_url: 'https://testurl.com/beer/image.png',
                food_pairing: 'Every snack you can imagine',
                brewers_tips: 'Drink carefully',
            },
            onCloseDetail: jest.fn()
        };
    });

    test('Component should render without crashing', () => {
        expect(getBeerDetails()).toBeDefined();
    });

    test('Component should render correctly', () => {
        expect(getBeerDetails()).toMatchSnapshot();
    });
});
