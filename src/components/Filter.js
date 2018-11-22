import React from 'react';
import PropTypes from 'prop-types';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.beerNameField = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        const { onFilter } = this.props;
        const filters = {
            beer_name: this.beerNameField.current.value,
        };
        onFilter(filters);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="beer_name">
                    Name:
                    <input type="text" id="beer_name" ref={this.beerNameField} />
                </label>
                <input type="submit" value="Filter" />
            </form>
        );
    }
}

Filter.propTypes = {
    onFilter: PropTypes.func.isRequired,
};

export default Filter;
