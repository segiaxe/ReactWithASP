import React from 'react';
import EntityTable from './EntityTable';

const StorePage = () => (
    <EntityTable
        apiBaseUrl='https://localhost:6266/'
        entityName='stores'
        entityFields={['name', 'address']}
    />
);

export default StorePage;
