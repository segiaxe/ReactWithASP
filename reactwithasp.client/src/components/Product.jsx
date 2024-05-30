import { Component } from 'react';
import { Button, Table, Modal, Form, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class Product extends Component {
    state = {
        products: [],
        modalOpen: false,
        name: '',
        price: '',
        editingProduct: null,
        deleteModalOpen: false,
        deletingProduct: null,
    };

    addr = 'https://localhost:6266/';

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = async () => {
        try {
            const response = await fetch(`${this.addr}api/products`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ products: data });
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    handleOpen = () => this.setState({ modalOpen: true, name: '', price: '', editingProduct: null });
    handleClose = () => this.setState({ modalOpen: false });

    handleDeleteOpen = (product) => this.setState({ deleteModalOpen: true, deletingProduct: product });
    handleDeleteClose = () => this.setState({ deleteModalOpen: false, deletingProduct: null });

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

    handleSubmit = async () => {
        const { name, price, editingProduct } = this.state;
        const productData = { id: editingProduct?.id || 0, name, price: parseFloat(price) };

        const url = editingProduct
            ? `${this.addr}api/products/${editingProduct.id}`
            : `${this.addr}api/products`;
        const method = editingProduct ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            this.fetchProducts();
            this.handleClose();
        } catch (error) {
            console.error('Failed to save product:', error);
        }
    };

    handleEdit = (product) => {
        this.setState({
            modalOpen: true,
            name: product.name,
            price: product.price,
            editingProduct: product,
        });
    };

    /*handleDelete = async (id) => {
        try {
            const response = await fetch(`${this.addr}api/products/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            this.fetchProducts();
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };*/
    handleDeleteConfirm = async () => {
        const { deletingProduct } = this.state;
        try {
            const response = await fetch(`${this.addr}api/products/${deletingProduct.id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            this.fetchProducts();
            this.handleDeleteClose();
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    render() {
        const { products, modalOpen, name, price, deleteModalOpen } = this.state;

        return (
            <div>
                <Button primary onClick={this.handleOpen}>New Product</Button>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {products.map((product) => (
                            <Table.Row key={product.id}>
                                <Table.Cell>{product.name}</Table.Cell>
                                <Table.Cell>{product.price}</Table.Cell>
                                <Table.Cell>
                                    <Button color='yellow' onClick={() => this.handleEdit(product)}>
                                        <Icon name='edit' /> EDIT
                                    </Button>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button color='red' onClick={() => this.handleDeleteOpen(product)}>
                                        <Icon name='trash' /> DELETE
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

                <Modal open={modalOpen} onClose={this.handleClose}>
                    <Modal.Header>{this.state.editingProduct ? 'Edit' : 'Create'} Product</Modal.Header>
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
                                <label>Price</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="price"
                                    value={price}
                                    onChange={this.handleChange}
                                    required
                                />
                            </Form.Field>
                            <Button type='submit' color='green'>
                                <Icon name='checkmark' /> {this.state.editingProduct ? 'Update' : 'Create'}
                            </Button>
                            <Button type='button' onClick={this.handleClose} color='black'>
                                Cancel
                            </Button>
                        </Form>
                    </Modal.Content>
                </Modal>

                <Modal open={deleteModalOpen} onClose={this.handleDeleteClose} size='small'>
                    <Modal.Header>Delete Product</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete this product?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.handleDeleteClose} color='black'>
                            Cancel
                        </Button>
                        <Button onClick={this.handleDeleteConfirm} color='red'>
                            <Icon name='trash' /> Delete
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default Product;
