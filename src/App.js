import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import BeerGrid from './components/BeerGrid'

const API_URL = 'https://api.punkapi.com/v2/beers';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      isFetching: false,
      data: null,
      hasError: false
    }
  }

  componentDidMount(){
    this.getBeers({});
  }

  getBeers(filters){
    
    this.setState({
      isFetching: true
    });

    fetch(API_URL).then((response) => {
      return response.json();
    }).then((data) => {
      console.log('parsed json', data);

      this.setState({
        data,
        isFetching: false,
        hasError: false
      });

    }).catch((ex) => {
      console.log('parsing failed', ex);

      this.setState({
        isFetching: false,
        hasError: true
      });

    });

  }

  render() {

    const { data, isFetching, hasError } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {
          isFetching
          && <span>Loading</span>
        }
        {
          !isFetching && data
          && <BeerGrid beers={data} />
        }
        {
          hasError
          && <span>Error</span>
        }
        
      </div>
    );
  }
}

export default App;
