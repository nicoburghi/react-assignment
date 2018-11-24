import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Segment, Header } from 'semantic-ui-react';
import '../styles/Filter.css';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.beerNameField = React.createRef();
        this.ibuGtField = React.createRef();
        this.abvGtField = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        const { onFilter } = this.props;
        const filters = {
            beer_name: this.beerNameField.current.inputRef.value,
            ibu_gt: this.ibuGtField.current.inputRef.value,
            abv_gt: this.abvGtField.current.inputRef.value,
        };
        onFilter(filters);
    }

    handleKeyPress(event) {
        const re = /[0-9]/g;
        console.log(event.key);
        if (!re.test(event.key) && event.key !== 'Enter') {
            event.preventDefault();
        }
    }

    render() {
        return (
            <Segment className="filters-wrapper">
                <Header as='h3'>Filters</Header>
                <Form onSubmit={this.handleSubmit} role="search">
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label htmlFor='beerName'>Name</label>
                            <Input placeholder='Name' id='beerName' ref={this.beerNameField} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor='beerIbuGt'>IBU Greater Than</label>
                            <Input type='number' placeholder='IBU Greater Than' id='beerIbuGt' ref={this.ibuGtField} onKeyPress={this.handleKeyPress} />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor='beerAbvGt'>ABV Greater Than</label>
                            <Input type='number' placeholder='ABV Greater Than' id='beerAbvGt' ref={this.abvGtField} onKeyPress={this.handleKeyPress} />
                        </Form.Field>
                        <Form.Field className='form-action-container'>
                            <Button primary>Filter</Button>
                        </Form.Field>
                    </Form.Group>
                </Form>
            </Segment>
        );
    }
}

Filter.propTypes = {
    onFilter: PropTypes.func.isRequired,
};

export default Filter;
