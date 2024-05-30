/*import Product from './Product';

const ProductPage = () => (
    <div>
        <Product />
    </div>
);

export default ProductPage;
*/

import React from 'react';
import EntityTable from './EntityTable';

const Product = () => {
    const apiBaseUrl = 'https://localhost:6266/';
    const entityName = 'products';
    const entityFields = ['name', 'price'];

    return (
        <EntityTable
            apiBaseUrl={apiBaseUrl}
            entityName={entityName}
            entityFields={entityFields}
        />
    );
};

export default Product;
