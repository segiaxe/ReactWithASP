import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file for custom styles

const NavBar = () => (
    <Menu inverted style={{
        backgroundColor: 'black', position: 'absolute', padding: '10px 0', width: '100%',
        top: 0, }}>
        <Menu.Item header style={{ color: 'white' }}>
            React
        </Menu.Item>

        <Menu.Item
            name="customers"
            as={NavLink}
            to="/customers"
            style={{ color: 'white' }}
        >
            Customers
        </Menu.Item>

        <Menu.Item
            name="products"
            as={NavLink}
            to="/products"
            style={{ color: 'white' }}
        >
            Products
        </Menu.Item>
        <Menu.Item
            name="stores"
            as={NavLink}
            to="/stores"
            style={{ color: 'white' }}
        >
            Stores
        </Menu.Item>
        <Menu.Item
            name="sales"
            as={NavLink}
            to="/sales"
            style={{ color: 'white' }}
        >
            Sales
        </Menu.Item>
    </Menu>
);

export default NavBar;
