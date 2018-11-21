import React, { Component } from 'react';

class BeerGrid extends Component {

    constructor(props){
        super(props);

        this.state = {
            beers: null
        }
    }

    render(){

        const { beers } = this.props;

        return (
            <div className="beer-grid">
                <pre>{ JSON.stringify(beers) }</pre>
            </div>
        );
    }
}

export default BeerGrid;