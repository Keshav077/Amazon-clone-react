import { createContext, useContext, useEffect, useReducer } from 'react';

const ProductsContext = createContext();

const initialState = {
  loading: false,
  error: null,
  products: [],
  categories: [],
  cart: [],
};

function reducer(state, action) {
  // console.log(state);
  switch (action.type) {
    case 'loading':
      return { ...state, loading: true };
    case 'error':
      return { ...state, error: action.payload };
    case 'loadProducts':
      return { ...state, products: action.payload };
    case 'loaded':
      return { ...state, loading: false };
    case 'loadCategories':
      return { ...state, categories: action.payload };
    case 'addToCart':
      const newProduct = action.payload;
      const productList = state.cart;
      const existingProduct = productList.find(
        product => product.id === newProduct.id,
      );
      if (existingProduct) {
        existingProduct.quantity += newProduct.quantity;
      } else {
        productList.push(newProduct);
      }
      return { ...state, cart: productList };
    case 'deleteFromCart':
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.payload),
      };
    default:
      return state;
  }
}

function ProductsProvider({ children }) {
  const [{ loading, error, products, categories, cart }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    async function getProducts() {
      try {
        dispatch({ type: 'loading' });
        const productspayload = await fetch('https://dummyjson.com/products/');
        const res = await productspayload.json();
        const categorypayload = await fetch(
          'https://dummyjson.com/products/categories',
        );
        const cat = await categorypayload.json();
        dispatch({ type: 'loadCategories', payload: cat });
        dispatch({ type: 'loadProducts', payload: res.products });
      } catch (error) {
        dispatch({ type: 'error', payload: error.message });
      } finally {
        dispatch({ type: 'loaded' });
      }
    }
    getProducts();
  }, [dispatch]);

  const addToCart = product =>
    dispatch({ type: 'addToCart', payload: product });

  const deleteFromCart = product =>
    dispatch({ type: 'deleteFromCart', payload: product.id });

  const getProductBasedOnId = id => {
    console.log(id);
    // eslint-disable-next-line eqeqeq
    const pro = products.filter(product => product.id == id);

    return pro;
  };

  const getCartItemCount = () =>
    cart.reduce((count, item) => count + item.quantity, 0);

  const getMRP = (price, discount) => {
    const p = parseFloat(price);
    const d = parseFloat(discount);
    return ((p * d) / 100 + p).toFixed(2);
  };

  const getProductsOfCategory = category => {
    const pro = products.filter(product => product.category === category);
    return pro;
  };

  const getRandomProducts = numberOfElements => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numberOfElements);
  };

  return (
    <ProductsContext.Provider
      value={{
        loading,
        error,
        products,
        categories,
        cart,
        getProductBasedOnId,
        getProductsOfCategory,
        getMRP,
        addToCart,
        deleteFromCart,
        getRandomProducts,
        getCartItemCount,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('ProductsContext was used outside of the ProductsProvider');
  }
  return context;
}

export { useProducts, ProductsProvider };
