import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsProvider';
import Card from '../components/Card';
import Header from '../components/Header';

function Category() {
  const { category } = useParams();

  const { getProductsOfCategory, loading, error } = useProducts();

  const [products, setProducts] = useState(getProductsOfCategory(category));
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    if (!checked) getPriceSortedProducts();
    else setProducts(getProductsOfCategory(category));
  };

  const getPriceSortedProducts = () => {
    products.sort(function (a, b) {
      return parseFloat(a.price) - parseFloat(b.price);
    });
    setProducts(products);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!products && products.length === 0) {
    // Check if products is null
    return <div>No products found.</div>;
  }

  return (
    <>
      <Header />
      <div className="grid grid-cols-5">
        <div className="p-2">
          <div className="font-semibold mb-3">Filters</div>
          <label>
            <input type="checkbox" checked={checked} onChange={handleChange} />
            Sort Price: Low to High
          </label>
        </div>
        <div className="col-span-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 p-2 overflow-y-scroll">
          {products?.map(product => (
            <Card title={product.title} products={[product]}></Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default Category;
