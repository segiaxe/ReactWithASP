
import EntityTable from './EntityTable';
import { Form } from 'semantic-ui-react';

const Sales = () => {
    const apiBaseUrl = 'https://localhost:6266/';
    const entityName = 'sales';
    const entityFields = ['customerId', 'productId', 'storeId', 'dateSold'];

    return (
        <EntityTable
            apiBaseUrl={apiBaseUrl}
            entityName={entityName}
            entityFields={entityFields}
            renderField={(field, value, handleChange) => {
                if (field === 'dateSold') {
                    return (
                        <Form.Field key={field}>
                            <label>{field}</label>
                            <input
                                type="date"
                                name={field}
                                value={value ? new Date(value).toISOString().split('T')[0] : ''}
                                onChange={handleChange}
                                required
                            />
                        </Form.Field>
                    );
                }
                return (
                    <Form.Field key={field}>
                        <label>{field}</label>
                        <input
                            name={field}
                            value={value || ''}
                            onChange={handleChange}
                            required
                        />
                    </Form.Field>
                );
            }}
        />
    );
};

export default Sales;
