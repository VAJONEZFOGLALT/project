import ProductsPage from './ProductsPage';
import CheckoutPage from './CheckoutPage';
import CartPage from './CartPage';
import { CartProvider } from '../contexts/CartContext';
import Layout from '../components/layout/Layout';
import { useState } from 'react';

function Shell() {
  const [page, setPage] = useState<'products' | 'cart' | 'checkout'>('products');

  const handleSetCheckout = () => {
    setPage('checkout');
  };

  let content: JSX.Element | null = null;
  if (page === 'products') {
    content = <ProductsPage />;
  } else if (page === 'cart') {
    content = <CartPage goCheckout={handleSetCheckout} />;
  } else if (page === 'checkout') {
    content = <CheckoutPage />;
  }
  return (
    <Layout>
      {content}
    </Layout>
  );
}

export default function UserApp() {
  return (
    <CartProvider>
      <Shell />
    </CartProvider>
  );
}
