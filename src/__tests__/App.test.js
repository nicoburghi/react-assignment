import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import beersMock from './__mocks__/beers.mock';

const mockResponse = (status, statusText, response) => new window.Response(response, {
    status,
    statusText,
    headers: {
        'Content-type': 'application/json',
    },
});

describe('App Unit Test', () => {
    let props;
    let shallowedApp;

    const getApp = () => {
        if (!shallowedApp) {
            shallowedApp = shallow(<App {...props} />);
        }
        return shallowedApp;
    };

    beforeEach(() => {
        props = {};
        shallowedApp = undefined;
    });

    test('Component should render without crashing', () => {
        expect(getApp()).toBeDefined();
    });

    test('Component should render correctly', () => {
        expect(getApp()).toMatchSnapshot();
    });

    test('Should mount and call componentDidMount and getBeers without crashing', () => {
        global.fetch = jest.fn().mockImplementation(
            () => Promise.resolve(mockResponse(200, null, JSON.stringify(beersMock))),
        );
        const componentDidMount = jest.spyOn(App.prototype, 'componentDidMount');
        const getBeersSpy = jest.spyOn(App.prototype, 'getBeers');
        const wrapper = mount(<App />);
        expect(wrapper).toBeDefined();
        expect(componentDidMount).toHaveBeenCalled();
        expect(getBeersSpy).toHaveBeenCalled();
    });

    test('Should call getBeers without crashing', () => {
        const wrapper = getApp();
        wrapper.instance().getBeers = jest.fn();
        wrapper.instance().onFilter();
        expect(wrapper.instance().getBeers).toHaveBeenCalled();
    });

    test('Should render Loader without crashing', () => {
        const wrapper = getApp();
        wrapper.setState({ isFetching: true });
        expect(wrapper.find('Loader')).toBeDefined();
    });

    test('Should render BeerGrid without crashing', () => {
        const wrapper = getApp();
        wrapper.setState({ isFetching: true });
        wrapper.setState({ data: beersMock });
        expect(wrapper.find('BeerGrid')).toBeDefined();
    });

    test('Should render Message without crashing', () => {
        const wrapper = getApp();
        wrapper.setState({ hasError: true });
        expect(wrapper.find('Message')).toBeDefined();
    });

    test('Should set correct state when API response OK', async () => {
        global.fetch = jest.fn().mockImplementation(
            () => Promise.resolve(mockResponse(200, null, JSON.stringify(beersMock))),
        );
        const wrapper = getApp();
        await wrapper.instance().getBeers({ testFilter: 'test' });
        expect(wrapper.state('hasError')).toEqual(false);
        expect(wrapper.state('isFetching')).toEqual(false);
        expect(wrapper.state('data')).toEqual(beersMock);
    });

    test('Should set correct state when API response Error', async () => {
        global.fetch = jest.fn().mockImplementation(
            () => Promise.resolve(mockResponse(400, null, JSON.stringify({ error: 'Bad Request' }))),
        );
        const wrapper = getApp();
        await wrapper.instance().getBeers();
        expect(wrapper.state('hasError')).toEqual(true);
        expect(wrapper.state('isFetching')).toEqual(false);
        expect(wrapper.state('data')).toEqual(null);
    });

    test('Should set correct state when API response cannot be parsed ', async () => {
        global.fetch = jest.fn().mockImplementation(
            () => Promise.resolve(mockResponse(400, null, 'Bad JSON')),
        );
        const wrapper = getApp();
        await wrapper.instance().getBeers();
        expect(wrapper.state('hasError')).toEqual(true);
        expect(wrapper.state('isFetching')).toEqual(false);
        expect(wrapper.state('data')).toEqual(null);
    });
});
