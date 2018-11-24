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
        expect(wrapper.find('Card')).toHaveLength(props.beers.length);
    });

    test('Component should render beer details on click in a beer card', () => {
        const wrapper = getBeerGrid();
        const firstCard = wrapper.find('Card').at(0);
        firstCard.simulate('click', { preventDefault: jest.fn() });
        expect(wrapper.find('BeerDetails')).toBeDefined();
        wrapper.instance().onCloseDetail();
        expect(wrapper.find('BeerDetails')).toHaveLength(0);
    });

    test('Component should render beer details on keypress Enter in a beer card', () => {
        const wrapper = getBeerGrid();
        const firstCard = wrapper.find('Card').at(0);
        firstCard.simulate('focus');
        firstCard.simulate('keypress', { preventDefault: jest.fn(), key: 'Enter' });
        expect(wrapper.find('BeerDetails')).toBeDefined();
        wrapper.instance().onCloseDetail();
        expect(wrapper.find('BeerDetails')).toHaveLength(0);
    });

    test('Component should not call openBeerDetail function on keypress different from Enter', () => {
        const wrapper = getBeerGrid();
        wrapper.instance().openBeerDetail = jest.fn();
        const firstCard = wrapper.find('Card').at(0);
        firstCard.simulate('focus');
        firstCard.simulate('keypress', { preventDefault: jest.fn(), key: 'a' });
        expect(wrapper.instance().openBeerDetail).not.toHaveBeenCalled();
    });
});
