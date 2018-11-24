import React from 'react';
import { shallow } from 'enzyme';
import Filter from '../components/Filter';

describe('Filter Unit Test', () => {
    let props;
    let shallowedFilter;

    const getFilter = () => {
        if (!shallowedFilter) {
            shallowedFilter = shallow(<Filter {...props} />);
        }
        return shallowedFilter;
    };

    beforeEach(() => {
        props = {
            onFilter: jest.fn()
        };
    });

    test('Component should render without crashing', () => {
        expect(getFilter()).toBeDefined();
    });

    test('Component should render correctly', () => {
        expect(getFilter()).toMatchSnapshot();
    });
});
