import { Link } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsProvider';

function Card({ title, products }) {
  const { getMRP } = useProducts();

  if (products.length === 1) {
    const product = products[0];
    return (
      <Link to={'/product/' + product.id}>
        <div className="h-96 shadow-md mx-1 my-1">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-1/2 object-cover"
          />
          <div className="p-2">
            <div className="line-clamp-3 font-medium">
              {product.description}
            </div>
            <div className="font-bold">
              {product.rating}⭐<span>{product.stock}</span>
            </div>
            <div className="text-2xl">${product.price}</div>
            <div className="font-light text-sm">
              M.R.P:{' '}
              <span className="line-through">
                {' '}
                {getMRP(product.price, product.discountPercentage)}
              </span>{' '}
              ({product.discountPercentage} off)
            </div>
            <div className="font-light text-sm">5% off on IMDB bank</div>
          </div>
        </div>
      </Link>
    );
  }
  return (
    <div className="bg-white h-96 w-full p-2">
      <div className="font-bold mb-1">{title}</div>
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        {products.slice(0, 4).map(product => (
          <Link to={'/product/' + product.id} key={product.id}>
            <div>
              <div className="w-full font-medium text-sm line-clamp-1 items-center ">
                {product.title}
              </div>
              <div>
                <img
                  className="h-36 w-full object-cover shadow-md"
                  src={product.thumbnail}
                  alt={product.title}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Card;
