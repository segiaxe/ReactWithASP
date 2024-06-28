
import EntityTable from './EntityTable';

const StorePage = () => (
    <EntityTable
        //apiBaseUrl='https://localhost:6266/'
        apiBaseUrl='https://boarding-reactwithasp.azurewebsites.net/'
        entityName='stores'
        entityFields={['name', 'address']}
    />
);

export default StorePage;
