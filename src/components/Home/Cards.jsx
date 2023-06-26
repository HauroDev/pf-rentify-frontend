import { useSelector } from "react-redux";
import Card from "./Card";

const Cards = () => {
  const productsState = useSelector((state) => state.products);
  console.log(productsState)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {productsState.products.map((product) => (
        <Card key={product.idProd} product={product} />
      ))}
    </div>
  );
};

export default Cards;
