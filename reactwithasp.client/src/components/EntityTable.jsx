import { Component } from 'react';
import { Button, Table, Modal, Form, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class EntityTable extends Component {
    state = {
        entities: [],
        modalOpen: false,
        deleteModalOpen: false,
        currentEntity: {},
        editingEntity: null,
        deletingEntity: null,
    };

    componentDidMount() {
        this.fetchEntities();
    }

    fetchEntities = async () => {
        try {
            const response = await fetch(`${this.props.apiBaseUrl}api/${this.props.entityName}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this.setState({ entities: data });
        } catch (error) {
            console.error(`Failed to fetch ${this.props.entityName}:`, error);
        }
    };

    handleOpen = () => this.setState({ modalOpen: true, currentEntity: {}, editingEntity: null });
    handleClose = () => this.setState({ modalOpen: false });

    handleDeleteOpen = (entity) => this.setState({ deleteModalOpen: true, deletingEntity: entity });
    handleDeleteClose = () => this.setState({ deleteModalOpen: false, deletingEntity: null });

    handleChange = (e) => this.setState({ currentEntity: { ...this.state.currentEntity, [e.target.name]: e.target.value } });

    handleSubmit = async () => {
        const { currentEntity, editingEntity } = this.state;
        const url = editingEntity ? `${this.props.apiBaseUrl}api/${this.props.entityName}/${editingEntity.id}` : `${this.props.apiBaseUrl}api/${this.props.entityName}`;
        const method = editingEntity ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentEntity),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            this.fetchEntities();
            this.handleClose();
        } catch (error) {
            console.error(`Failed to save ${this.props.entityName}:`, error);
        }
    };

    handleEdit = (entity) => {
        this.setState({
            modalOpen: true,
            currentEntity: entity,
            editingEntity: entity,
        });
    };

    handleDeleteConfirm = async () => {
        const { deletingEntity } = this.state;
        try {
            const response = await fetch(`${this.props.apiBaseUrl}api/${this.props.entityName}/${deletingEntity.id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            this.fetchEntities();
            this.handleDeleteClose();
        } catch (error) {
            console.error(`Failed to delete ${this.props.entityName}:`, error);
        }
    };

    render() {
        const { entities, modalOpen, deleteModalOpen, currentEntity } = this.state;
        const { entityFields, entityName } = this.props;

        return (
            <div>
                <Button primary onClick={this.handleOpen}>New {entityName}</Button>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            {entityFields.map(field => (
                                <Table.HeaderCell key={field}>{field}</Table.HeaderCell>
                            ))}
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {entities.map((entity) => (
                            <Table.Row key={entity.id}>
                                {entityFields.map(field => (
                                    <Table.Cell key={field}>{entity[field]}</Table.Cell>
                                ))}
                                <Table.Cell>
                                    <Button color='yellow' onClick={() => this.handleEdit(entity)}>
                                        <Icon name='edit' /> EDIT
                                    </Button>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button color='red' onClick={() => this.handleDeleteOpen(entity)}>
                                        <Icon name='trash' /> DELETE
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>

                <Modal open={modalOpen} onClose={this.handleClose}>
                    <Modal.Header>{this.state.editingEntity ? `Edit ${entityName}` : `Create ${entityName}`}</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            {entityFields.map(field => (
                                <Form.Field key={field}>
                                    <label>{field}</label>
                                    <input
                                        name={field}
                                        value={currentEntity[field] || ''}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </Form.Field>
                            ))}
                            <Button type='submit' color='green'>
                                <Icon name='checkmark' /> {this.state.editingEntity ? 'Update' : 'Create'}
                            </Button>
                            <Button type='button' onClick={this.handleClose} color='black'>
                                Cancel
                            </Button>
                        </Form>
                    </Modal.Content>
                </Modal>

                <Modal open={deleteModalOpen} onClose={this.handleDeleteClose} size='small'>
                    <Modal.Header>Delete {entityName}</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete this {entityName}?</p>
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

export default EntityTable;
