
import {  useProductStore } from "../../store/";
import ProductCard from "./ProductCard";

import "./ProductCatalog.css";


const ProductCatalog = () => {
  const products = useProductStore(state => state.products);

  return (
    <div className="catalog-container">
      <div className="product-grid">
        {products.map((product) => (
        <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;