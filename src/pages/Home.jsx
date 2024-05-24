import Body from '../components/Body';
import Header from '../components/Header';
import { useProducts } from '../contexts/ProductsProvider';

function Home() {
  const { loading } = useProducts();
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col overflow-y-scroll h-screen ">
      <Header isHome={true} />
      <Body />
    </div>
  );
}

export default Home;
