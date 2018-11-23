import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'semantic-ui-react';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Field>
                        <Input placeholder='Name' ref={this.beerNameField} />
                    </Form.Field>
                    <Form.Field>
                        <Input placeholder='IBU Greater Than' ref={this.ibuGtField} />
                    </Form.Field>
                    <Form.Field>
                        <Input placeholder='ABV Greater Than' ref={this.abvGtField} />
                    </Form.Field>
                    <Form.Field>
                        <Button>Filter</Button>
                    </Form.Field>
                </Form.Group>
            </Form>
        );
    }
}

Filter.propTypes = {
    onFilter: PropTypes.func.isRequired,
};

export default Filter;
