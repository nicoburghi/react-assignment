import React from 'react';
import { shallow, mount } from 'enzyme';
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

    const getMountedFilter = () => {
        return mount(<Filter {...props} />);;
    };

    beforeEach(() => {
        props = {
            onFilter: jest.fn(),
        };
    });

    test('Component should render without crashing', () => {
        expect(getFilter()).toBeDefined();
    });

    test('Component should render correctly', () => {
        expect(getFilter()).toMatchSnapshot();
    });

    test('Component should call onFilter function on form submit', () => {
        const wrapper = getMountedFilter();
        const form = wrapper.find('Form');
        form.simulate('submit', { preventDefault: jest.fn(), key: 'Enter' });
        expect(props.onFilter).toHaveBeenCalled();
    });

    test('Component should call preventDefault function on keypress different from Integer', () => {
        const wrapper = getMountedFilter();
        const input = wrapper.find('input[type="number"]').at(0);
        const preventDefault = jest.fn();
        input.simulate('keypress', { preventDefault, key: 'a' });
        expect(preventDefault).toHaveBeenCalled();
    });

    test('Component should not call preventDefault function on keypress Integer', () => {
        const wrapper = getMountedFilter();
        const input = wrapper.find('input[type="number"]').at(0);
        const preventDefault = jest.fn();
        input.simulate('keypress', { preventDefault, key: '1' });
        expect(preventDefault).not.toHaveBeenCalled();
    });
});
