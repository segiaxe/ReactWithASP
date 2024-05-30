import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import NavBar from './components/NavBar';
import CustomerPage from './components/CustomerPage';
import ProductPage from './components/ProductPage';
import StorePage from './components/StorePage';
import SalesPage from './components/SalesPage';
import 'semantic-ui-css/semantic.min.css';

function App() {
    return (
        <Router>
            <div>
                <NavBar />
                <Container >
                    <Routes>
                        <Route path="/customers" element={<CustomerPage />} />
                        <Route path="/products" element={<ProductPage />} />
                        <Route path="/stores" element={<StorePage />} />
                        <Route path="/sales" element={<SalesPage />} />
                        <Route path="/" element={<CustomerPage />} />
                    </Routes>
                </Container>
            </div>
            
        </Router>
    );
}

export default App;
