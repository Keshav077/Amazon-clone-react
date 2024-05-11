import { useProducts } from '../contexts/ProductsProvider';
import Header from '../components/Header';

function Cart() {
  const { cart, deleteFromCart } = useProducts();

  return (
    <>
      <Header />
      <div className="grid grid-cols-4 p-2">
        <div className="p-2 col-span-3">
          <div className="font-bold, text-xl">Your Cart</div>
          <div className="border m-2"></div>
          <div className="flex flex-col">
            {cart.map(product => (
              <div className="flex w-full h-36 my-1">
                <img
                  src={product.thumbnail}
                  className=" h-36 w-36 object-cover rounded-lg"
                  alt={product.title}
                ></img>
                <div className="flex font-semibold flex-col p-2 justify-evenly">
                  <div className="line-clamp-1">{product.description}</div>
                  <div>{product.rating}⭐</div>
                  <div>${product.price}</div>
                  <div className="flex items-center gap-2">
                    <div>Quantity: {product.quantity}</div>
                    <button
                      onClick={() => {
                        deleteFromCart(product);
                      }}
                      className="p-2 bg-slate-300 shadow-sm rounded-lg"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col p-2 items-start justify-evenly w-full bg-slate-200 h-36">
          <button className="w-full  h-10 rounded-full text-blue-500">
            Select Address...
          </button>
          <button className="w-full bg-orange-400 font-semibold h-10 rounded-full">
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;
