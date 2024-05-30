import { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Icon } from 'semantic-ui-react';

const Sales = () => {
    const [sales, setSales] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [stores, setStores] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [currentSale, setCurrentSale] = useState({});
    const [editingSale, setEditingSale] = useState(null);
    const [deletingSale, setDeletingSale] = useState(null);

    const apiBaseUrl = 'https://localhost:6266/';

    useEffect(() => {
        fetchSales();
        fetchCustomers();
        fetchProducts();
        fetchStores();
    }, []);

    const fetchSales = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}api/sales`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setSales(data);
        } catch (error) {
            console.error('Failed to fetch sales:', error);
        }
    };

    const fetchCustomers = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}api/customers`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            console.error('Failed to fetch customers:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}api/products`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    const fetchStores = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}api/stores`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStores(data);
        } catch (error) {
            console.error('Failed to fetch stores:', error);
        }
    };

    const handleOpen = () => {
        setModalOpen(true);
        setCurrentSale({});
        setEditingSale(null);
    };

    const handleClose = () => setModalOpen(false);

    const handleDeleteOpen = (sale) => {
        setDeleteModalOpen(true);
        setDeletingSale(sale);
    };

    const handleDeleteClose = () => setDeleteModalOpen(false);

    const handleChange = (e) => setCurrentSale({ ...currentSale, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        const saleData = {
            ...currentSale,
            dateSold: new Date(currentSale.dateSold).toISOString(),
        };

        const url = editingSale ? `${apiBaseUrl}api/sales/${editingSale.saleId}` : `${apiBaseUrl}api/sales`;
        const method = editingSale ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(saleData),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            fetchSales();
            handleClose();
        } catch (error) {
            console.error('Failed to save sale:', error.message);
        }
    };

    const handleEdit = (sale) => {
        setModalOpen(true);
        setCurrentSale({
            dateSold: sale.dateSold.split('T')[0],
            customerId: sale.customerId,
            productId: sale.productId,
            storeId: sale.storeId,
        });
        setEditingSale(sale);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}api/sales/${deletingSale.saleId}`, { method: 'DELETE' });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            fetchSales();
            handleDeleteClose();
        } catch (error) {
            console.error('Failed to delete sale:', error.message);
        }
    };

    return (
        <div>
            <Button primary onClick={handleOpen}>New Sale</Button>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Customer</Table.HeaderCell>
                        <Table.HeaderCell>Product</Table.HeaderCell>
                        <Table.HeaderCell>Store</Table.HeaderCell>
                        <Table.HeaderCell>Date Sold</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {sales.map((sale) => (
                        <Table.Row key={sale.saleId}>
                            <Table.Cell>{sale.customerName}</Table.Cell>
                            <Table.Cell>{sale.productName}</Table.Cell>
                            <Table.Cell>{sale.storeName}</Table.Cell>
                            <Table.Cell>{new Date(sale.dateSold).toLocaleDateString()}</Table.Cell>
                            <Table.Cell>
                                <Button color='yellow' onClick={() => handleEdit(sale)}>
                                    <Icon name='edit' /> EDIT
                                </Button>
                            </Table.Cell>
                            <Table.Cell>
                                <Button color='red' onClick={() => handleDeleteOpen(sale)}>
                                    <Icon name='trash' /> DELETE
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <Modal open={modalOpen} onClose={handleClose}>
                <Modal.Header>{editingSale ? 'Edit Sale' : 'Create Sale'}</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={handleSubmit}>
                        <Form.Field>
                            <label>Date Sold</label>
                            <input
                                type="date"
                                name="dateSold"
                                value={currentSale.dateSold || ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Customer</label>
                            <select name="customerId" value={currentSale.customerId || ''} onChange={handleChange} required>
                                <option value="">Select Customer</option>
                                {customers.map(customer => (
                                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                                ))}
                            </select>
                        </Form.Field>
                        <Form.Field>
                            <label>Product</label>
                            <select name="productId" value={currentSale.productId || ''} onChange={handleChange} required>
                                <option value="">Select Product</option>
                                {products.map(product => (
                                    <option key={product.id} value={product.id}>{product.name}</option>
                                ))}
                            </select>
                        </Form.Field>
                        <Form.Field>
                            <label>Store</label>
                            <select name="storeId" value={currentSale.storeId || ''} onChange={handleChange} required>
                                <option value="">Select Store</option>
                                {stores.map(store => (
                                    <option key={store.id} value={store.id}>{store.name}</option>
                                ))}
                            </select>
                        </Form.Field>
                        <Button type='submit' color='green'>
                            <Icon name='checkmark' /> {editingSale ? 'Update' : 'Create'}
                        </Button>
                        <Button type='button' onClick={handleClose} color='black'>
                            Cancel
                        </Button>
                    </Form>
                </Modal.Content>
            </Modal>

            <Modal open={deleteModalOpen} onClose={handleDeleteClose} size='small'>
                <Modal.Header>Delete Sale</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete this sale?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={handleDeleteClose} color='black'>
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color='red'>
                        <Icon name='trash' /> Delete
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default Sales;
