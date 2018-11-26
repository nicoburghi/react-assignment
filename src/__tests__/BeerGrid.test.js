import React from 'react';
import { shallow } from 'enzyme';
import BeerGrid from '../components/BeerGrid';

describe('BeerGrid Unit Test', () => {
    let props;
    let shallowedBeerGrid;

    const getBeerGrid = () => {
        if (!shallowedBeerGrid) {
            shallowedBeerGrid = shallow(<BeerGrid {...props} />);
        }
        return shallowedBeerGrid;
    };

    beforeEach(() => {
        props = {
            beers: [
                {
                    id: 1,
                    name: 'Test Beer',
                    tagline: 'A beer for testing',
                    description: 'Just a mock beer for testing',
                    first_brewed: 'Just a mock beer for testing',
                    image_url: 'https://testurl.com/beer/image.png',
                    food_pairing: ['Every snack you can imagine'],
                    brewers_tips: 'Drink carefully',
                    abv: 5.0,
                    ibu: 40,
                },
            ],
        };
        shallowedBeerGrid = undefined;
    });

    test('Component should render without crashing', () => {
        expect(getBeerGrid()).toBeDefined();
    });

    test('Component should render correctly', () => {
        expect(getBeerGrid()).toMatchSnapshot();
    });

    test('Component should render message when beers is empty', () => {
        props.beers = [];
        const wrapper = getBeerGrid();
        expect(wrapper.find('Message')).toBeDefined();
    });

    test('Component should render beers cards', () => {
        const wrapper = getBeerGrid();
        expect(wrapper.find('BeerCard')).toHaveLength(props.beers.length);
    });

    test('Component should render beer details when onOpenBeerDetail function is called', () => {
        const wrapper = getBeerGrid();
        wrapper.instance().onOpenBeerDetail(props.beers[0]);
        expect(wrapper.find('BeerDetails')).toBeDefined();
    });

    test('Component should close beer details when onCloseDetail function is called', () => {
        const wrapper = getBeerGrid();
        wrapper.instance().onOpenBeerDetail(props.beers[0]);
        expect(wrapper.find('BeerDetails')).toBeDefined();
        wrapper.instance().onCloseDetail();
        expect(wrapper.find('BeerDetails')).toHaveLength(0);
    });
});
