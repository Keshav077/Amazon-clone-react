import { Link } from 'react-router-dom';

function CardSlider({ products, title }) {
  return (
    <div className="col-span-full h-64 bg-white p-2 w-full">
      <span className="font-bold">{title}</span>
      <div className="flex overflow-x-auto ">
        {products?.map(product => {
          return (
            <Link to={'/product/' + product.id}>
              <div className=" min-w-48 h-full object-contain mx-2 shadow-sm">
                <img
                  src={product.thumbnail}
                  className="h-48 object-cover"
                  alt=""
                />
                <span className="line-clamp-1 font-semibold">
                  {product.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default CardSlider;
