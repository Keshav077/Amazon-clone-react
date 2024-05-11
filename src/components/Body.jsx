import Card from './Card';
import Footer from './Footer';
import { useProducts } from '../contexts/ProductsProvider';
import ReactPlayer from 'react-player';
import CardSlider from './CardSlider';

function Body() {
  const { getRandomProducts } = useProducts();

  return (
    <div className="flex items-center w-full flex-col">
      <div className="p-5 bg-gradient-to-b from-black to-slate-900 w-full 2xl:w-11/12 h-full">
        <div className="grid gap-4 justify-items-center grid-flow-dense grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-full">
          <div className="col-span-full h-80 ">
            {' '}
            <img
              className="object-cover h-80"
              alt="banner"
              src="https://imgs.search.brave.com/8RbW0pRhM7BEUCZJ7d71Qk9Mk0yELUimH2p8Jxj6gyQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFFdi1E/SHBFUjQvMS8wLzE2/MDB3L2NhbnZhLWJs/YWNrLXNpbXBsZS13/YXRjaC1wcm9tb3Rp/b24tYWR2ZXJ0LXdl/Yi1iYW5uZXItZXhT/bFVsT0VUdWcuanBn"
            ></img>
          </div>
          <Card
            title={'Keep Shopping For'}
            products={getRandomProducts(4)}
          ></Card>
          <Card
            title={'Pick up where you left off'}
            products={getRandomProducts(4)}
          ></Card>
          <Card
            title={'Continue shopping deals'}
            products={getRandomProducts(4)}
          ></Card>
          <Card title={'Buy again'} products={getRandomProducts(4)}></Card>

          <div className="bg-white h-96 w-full col-span-2 items-center">
            {' '}
            <ReactPlayer
              className="react-player"
              url="https://youtu.be/uX3FmtvBbN8"
              width="100%"
              height="100%"
              controls={true}
            />
          </div>
          <CardSlider products={getRandomProducts(10)} title={'Todays deals'} />
          <CardSlider
            products={getRandomProducts(10)}
            title={'Your browsing history'}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Body;
