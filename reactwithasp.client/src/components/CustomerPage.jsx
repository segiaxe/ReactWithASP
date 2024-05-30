import Customer from './Customer';
import EntityTable from './EntityTable';

const CustomerPage = () => (
    /*<div>
        <Customer />
    </div>*/
    <EntityTable
        apiBaseUrl='https://localhost:6266/'
        entityName='customers'
        entityFields={['name', 'address']}
    />
);

export default CustomerPage;
