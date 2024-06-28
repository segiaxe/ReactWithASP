import { Component } from 'react';
import { Button, Table, Modal, Form, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class Customer extends Component {
    state = {
        customers: [],
        modalOpen: false,
        name: '',
        address: '',
        editingCustomer: null,
    };

    addr = 'https://localhost:6266/';
    apiBaseUrl = 'https://boarding-reactwithasp.azurewebsites.net/';
    componentDidMount() {
        this.fetchCustomers();
    }

    fetchCustomers = async () => {
        //const response = await fetch(`${this.addr}api/customers`);
        const response = await fetch(`${this.apiBaseUrl}api/customers`);
        const data = await response.json();
        this.setState({ customers: data });
    };

    handleOpen = () => this.setState({ modalOpen: true, name: '', address: '', editingCustomer: null });
    handleClose = () => this.setState({ modalOpen: false });

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleSubmit = async () => {
        const { name, address, editingCustomer } = this.state;
        const customerData = {
            id: editingCustomer
                ? editingCustomer.id : 0, name, address
        };
        const url = editingCustomer
            ? `${this.addr}api/customers/${editingCustomer.id}`
            : `${this.addr}api/customers`;
        const method = editingCustomer ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customerData),
        });

        if (response.ok) {
            this.fetchCustomers();
            this.handleClose();
        } else {
            // Handle errors
            console.error('Failed to save customer');
        }
    };

    handleEdit = (customer) => {
        this.setState({
            modalOpen: true,
            name: customer.name,
            address: customer.address,
            editingCustomer: customer,
        });
    };

    handleDelete = async (id) => {
        await fetch(`${this.addr}api/customers/${id}`, { method: 'DELETE' });
        this.fetchCustomers();
    };

    render() {
        const { customers, modalOpen, name, address } = this.state;

        return (
            <div>
                <Button primary onClick={this.handleOpen}>New Customer</Button>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {customers.map((customer) => (
                            <Table.Row key={customer.id}>
                                <Table.Cell>{customer.name}</Table.Cell>
                                <Table.Cell>{customer.address}</Table.Cell>
                                <Table.Cell>
                                    <Button color='yellow' onClick={() => this.handleEdit(customer)}>
                                        <Icon name='edit' /> EDIT
                                    </Button>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button color='red' onClick={() => this.handleDelete(customer.id)}>
                                        <Icon name='trash' /> DELETE
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

                <Modal open={modalOpen} onClose={this.handleClose}>
                    <Modal.Header>{this.state.editingCustomer ? 'Edit' : 'Create'} Customer</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Name</label>
                                <input
                                    name="name"
                                    value={name}
                                    onChange={this.handleChange}
                                    required
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input
                                    name="address"
                                    value={address}
                                    onChange={this.handleChange}
                                    required
                                />
                            </Form.Field>
                            <Button type='submit' color='green'>
                                <Icon name='checkmark' /> {this.state.editingCustomer ? 'Update' : 'Create'}
                            </Button>
                            <Button type='button' onClick={this.handleClose} color='black'>
                                Cancel
                            </Button>
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default Customer;
