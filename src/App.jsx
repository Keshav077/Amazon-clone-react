import Category from './pages/Category';
import Home from './pages/Home';
import { ProductsProvider } from './contexts/ProductsProvider.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';

function App() {
  return (
    <ProductsProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="category/:category" element={<Category />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </ProductsProvider>
  );
}

export default App;
