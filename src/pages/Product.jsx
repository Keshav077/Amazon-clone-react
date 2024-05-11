import { useParams } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsProvider';
import { useRef, useState } from 'react';
import Header from '../components/Header';
import CardSlider from '../components/CardSlider';

function Product() {
  const { id } = useParams();
  const { loading, getProductBasedOnId, getMRP, addToCart, getRandomProducts } =
    useProducts();
  const product = getProductBasedOnId(id)[0];
  const [imageIndex, setImageIndex] = useState(0);
  const maxImagesLength = product.images.length;
  const quantityRef = useRef(1);

  //   console.log(product.title);
  return loading ? (
    'Loading..'
  ) : (
    <>
      <Header />
      <div className="grid grid-cols-2 p-3">
        <div>
          <img
            className="h-96 w-full p-2  rounded-md object-contain"
            src={product.images[imageIndex]}
            alt={imageIndex}
          ></img>
          <div className="flex mt-4 justify-evenly">
            <button
              className="font-black text-blue-400 px-1 rounded-full h-8 w-8 text-2xl"
              onClick={() => {
                if (imageIndex > 0) setImageIndex(imageIndex - 1);
              }}
            >
              {'<'}
            </button>
            {product.images.map((image, index) => {
              var style = 'h-10 w-10 object-cover rounded-md';
              if (index === imageIndex)
                style += ' border-solid border-2 border-blue-400';
              return (
                <button
                  onClick={() => {
                    setImageIndex(index);
                  }}
                >
                  <img className={style} alt={index} src={image}></img>
                </button>
              );
            })}

            <button
              className="font-black text-blue-400 px-1 text-2xl rounded-full h-8 w-8"
              onClick={() => {
                setImageIndex((imageIndex + 1) % maxImagesLength);
              }}
            >
              {'>'}
            </button>
          </div>
        </div>
        <div className="p-3">
          <div className="text-3xl font-semibold">{product.description}</div>
          <div className="font-bold text-sm">
            {product.rating.toFixed(1)}⭐ |{' '}
            <span className="font-normal ">{product.stock} reviews</span>
          </div>
          <div className="border  m-2"></div>
          <div className="text-3xl font-thin text-red-500">
            -{product.discountPercentage}%{' '}
            <span className="font-medium text-black">${product.price}</span>
          </div>
          <div className="text-sm font-thin ">
            M.R.P:{' '}
            <span className="line-through">
              {' '}
              {getMRP(product.price, product.discountPercentage)}
            </span>
          </div>
          <div>Inclusive of all taxes</div>
          <div>
            With Amazon Business, you would have saved ₹12,414.97 in the last
            year. Create a free account and save up to 15% today.
          </div>
          <div className="border  m-2"></div>
          <div className="font-bold">Offers</div>
          <div className="h-22 flex">
            <div className="w-40 mx-2 border-2 border-solid shadow-md p-1 line-clamp-4 rounded-md text-sm">
              <div className="font-semibold">Cashback</div>
              With Amazon Business, you would have saved ₹12,414.97 in the last
              year. Create a free account and save up to 15% today.
            </div>
            <div className="w-40 border-2 border-solid shadow-md p-1 line-clamp-4 rounded-md text-sm">
              <div className="font-semibold">No Cost EMI</div>
              With Amazon Business, you would have saved ₹12,414.97 in the last
              year. Create a free account and save up to 15% today.
            </div>
          </div>
          <div className="border m-4"></div>
          <div className="flex flex-col justify-evenly mt-4">
            <div className="text-xl text-green-600">In Stock</div>
            <div className="text-sm">Ships from: Amazon</div>
            <div className="text-sm">Sold by: Amazon</div>
            <div>
              Quantity:{' '}
              <select ref={quantityRef}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(quantity => (
                  <option value={quantity}>{quantity}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-evenly mt-4">
              <button className="bg-orange-400 w-44 hover:bg-orange-500 h-14 rounded-full font-bold">
                Buy Now
              </button>
              <button
                onClick={() => {
                  console.log('quantity', quantityRef?.current.value);
                  addToCart({
                    ...product,
                    quantity: parseInt(quantityRef?.current.value),
                  });
                }}
                className="bg-yellow-400 hover:bg-yellow-500 w-44 h-14 rounded-full font-bold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <CardSlider
          products={getRandomProducts(10)}
          title={'People Also Buy'}
        />
      </div>
    </>
  );
}

export default Product;
