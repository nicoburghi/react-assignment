import React from 'react';
import { shallow, mount } from 'enzyme';
import BeerCard from '../components/BeerCard';

describe('BeerCard Unit Test', () => {
    let props;
    let shallowedBeerCard;

    const getBeerCard = () => {
        if (!shallowedBeerCard) {
            shallowedBeerCard = shallow(<BeerCard {...props} />);
        }
        return shallowedBeerCard;
    };

    beforeEach(() => {
        props = {
            beer: {
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
            onOpenBeerDetail: jest.fn(),
        };
        shallowedBeerCard = undefined;
    });

    test('Component should render without crashing', () => {
        expect(getBeerCard()).toBeDefined();
    });

    test('Component should render correctly', () => {
        expect(getBeerCard()).toMatchSnapshot();
    });

    test('Component should render beer card IBU data when ibu property is defined', () => {
        const wrapper = mount(<BeerCard {...props} />);
        const firstCard = wrapper.find('Card');
        const expected = expect.stringMatching(/^.*IBU/);
        expect(firstCard.find('CardContent[extra=true]').text()).toEqual(expected);
    });

    test('Component should not render beer card IBU data when ibu property is null', () => {
        props.beer.ibu = null;
        const wrapper = mount(<BeerCard {...props} />);
        const card = wrapper.find('Card');
        const expected = expect.stringMatching(/^.*IBU/);
        expect(card.find('CardContent[extra=true]').text()).not.toEqual(expected);
    });

    test('Component should call onOpenBeerDetail function on click in a beer card', () => {
        const wrapper = getBeerCard();
        const card = wrapper.find('Card');
        card.simulate('click', { preventDefault: jest.fn() });
        expect(props.onOpenBeerDetail).toHaveBeenCalled();
    });

    test('Component should call onOpenBeerDetail function on keypress Enter in a beer card', () => {
        const wrapper = getBeerCard();
        const card = wrapper.find('Card');
        card.simulate('focus');
        card.simulate('keypress', { preventDefault: jest.fn(), key: 'Enter' });
        expect(props.onOpenBeerDetail).toHaveBeenCalled();
    });

    test('Component should not call openBeerDetail function on keypress different from Enter', () => {
        const wrapper = getBeerCard();
        const card = wrapper.find('Card');
        card.simulate('focus');
        card.simulate('keypress', { preventDefault: jest.fn(), key: 'a' });
        expect(props.onOpenBeerDetail).not.toHaveBeenCalled();
    });
});
