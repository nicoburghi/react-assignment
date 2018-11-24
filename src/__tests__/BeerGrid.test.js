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
        props = {};
    });

    test('Component should render without crashing', () => {
        expect(getBeerGrid()).toBeDefined();
    });

    test('Component should render correctly', () => {
        expect(getBeerGrid()).toMatchSnapshot();
    });
});
