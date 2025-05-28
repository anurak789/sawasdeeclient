import Grid2 from "@mui/material/Grid2";
import ProductList from "./ProductList";
import { useFetchProductQuery } from "./catalogApi";
import Filters from "./Filters";

export default function Catalog() {
  // const [products, setProducts] = useState<Product[]>([]);

  //   useEffect(() => {
  //     fetch('https://localhost:7037/api/products')
  //     .then(response => response.json())
  //     .then(data => setProducts(data))
  //   }, [])

     const {data, isLoading} = useFetchProductQuery();

     if(isLoading || !data) return <div>Loading...</div>
    
  return (
    <Grid2 container spacing={4}>
      <Grid2 size={3}>
        <Filters/>
      </Grid2>
      <Grid2 size={9}>
        <ProductList products={data}/>
      </Grid2>
    </Grid2>
  )
}
