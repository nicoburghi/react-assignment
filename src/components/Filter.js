import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Segment, Header } from 'semantic-ui-react';
import '../styles/Filter.css';

/**
 * Key Press handler
 *
 * Prevents the user to insert not Digit characters in number inputs
 * This is because the API only accepts Integer numbers
 */
const handleKeyPress = (event) => {
    const re = /[0-9]/g;
    if (!re.test(event.key) && event.key !== 'Enter') {
        event.preventDefault();
    }
};

/**
 * Filter Component
 *
 * Render a form that executes the onFilter action (received by props) in the onSubmit event
 * This action may cause the App Component to retrieve filtered data from the API
 */
function Filter(props) {
    const { onFilter } = props;

    const beerNameField = React.createRef();
    const ibuGtField = React.createRef();
    const abvGtField = React.createRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const filters = {
            beer_name: beerNameField.current.inputRef.value,
            ibu_gt: ibuGtField.current.inputRef.value,
            abv_gt: abvGtField.current.inputRef.value,
        };
        onFilter(filters);
    };

    return (
        <Segment className="filters-wrapper">
            <Header as='h3'>Filters</Header>
            <Form onSubmit={handleSubmit} role="search">
                <Form.Group widths='equal'>
                    <Form.Field>
                        <label htmlFor='beerName'>Name</label>
                        <Input placeholder='Name' id='beerName' ref={beerNameField} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor='beerIbuGt'>IBU Greater Than</label>
                        <Input type='number' placeholder='IBU Greater Than' id='beerIbuGt' ref={ibuGtField} onKeyPress={handleKeyPress} />
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor='beerAbvGt'>ABV Greater Than</label>
                        <Input type='number' placeholder='ABV Greater Than' id='beerAbvGt' ref={abvGtField} onKeyPress={handleKeyPress} />
                    </Form.Field>
                    <Form.Field className='form-action-container'>
                        <Button primary>Filter</Button>
                    </Form.Field>
                </Form.Group>
            </Form>
        </Segment>
    );
}

Filter.propTypes = {
    onFilter: PropTypes.func.isRequired,
};

export default Filter;
