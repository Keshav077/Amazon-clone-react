import { Link } from 'react-router-dom';
import { useProducts } from '../contexts/ProductsProvider';

function Header({ isHome }) {
  const { categories, loading, getCartItemCount } = useProducts();

  return (
    <header className="">
      <nav className="flex justify-between  bg-slate-800 h-12 w-full items-center p-2 min-w-96">
        <div className="p-2">
          <Link to={'/'}>
            <img
              className="h-8 w-26  object-cover"
              src="https://imgs.search.brave.com/Dl_5ErhspoaxZ87aZdIGDmplqcvQJF-LVYj4rAdrE4g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTUvQW1h/em9uLUxvZ28tV2hp/dGUtVHJhbnNwYXJl/bnQucG5n"
              alt="amazon-logo"
            ></img>
          </Link>
        </div>
        <div className="p-2 flex flex-col text-white justify-center items-center h-full">
          <span className="text-xs/[14px] font-thin">Deliver to User</span>{' '}
          <span className="font-bold">Hyderbad</span>
        </div>
        <div className="p-2 flex grow">
          <input className="w-full p-1 rounded-sm" />
          <button className="bg-orange-400 p-1 font-bold rounded-sm">
            Search
          </button>
        </div>
        <div className="p-2 flex flex-col justify-center text-white items-start h-full">
          <span className="text-xs/[14px] font-thin">Hello, User</span>{' '}
          <span className="text-sm font-bold hidden lg:block">
            Account & Lists
          </span>
        </div>
        <div className="p-2 flex flex-col justify-center text-white items-start h-full ">
          <span className="text-xs/[14px] font-thin hidden lg:block">
            Returns &
          </span>{' '}
          <span className="text-sm font-bold">Orders</span>
        </div>
        <Link to={'/cart'}>
          <div className="flex items-center p-2 text-white font-bold text-sm md:text-normal">
            <img
              className="h-5 invert"
              src="https://cdn-icons-png.flaticon.com/128/3514/3514491.png"
              alt="Cart"
            />
            <span className="text-sm bg-orange-500 mx-1 px-1  rounded-full ">
              {getCartItemCount()}
            </span>
          </div>
        </Link>
      </nav>
      {loading ? (
        <div>Loading...</div>
      ) : isHome ? (
        <div className=" line-clamp-1 h-6 text-slate-200 bg-slate-700">
          <select className="w-12  bg-slate-700">
            <option className="px-2 " id={'all'} key={'all'}>
              All
            </option>
            {categories?.map(category => (
              <option className="px-2 " id={category} key={category}>
                {category}
              </option>
            ))}
          </select>
          {categories?.map(str => (
            <Link className="px-2 " id={str} key={str} to={'/category/' + str}>
              {str.charAt(0).toUpperCase() + str.slice(1)}
            </Link>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </header>
  );
}

export default Header;
