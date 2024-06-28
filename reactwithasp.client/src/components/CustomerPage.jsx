
import EntityTable from './EntityTable';

const CustomerPage = () => (
    /*<div>
        <Customer />
    </div>*/
    <EntityTable
        //apiBaseUrl='https://localhost:6266/'
        apiBaseUrl='https://boarding-reactwithasp.azurewebsites.net/'
        entityName='customers'
        entityFields={['name', 'address']}
    />
);

export default CustomerPage;
