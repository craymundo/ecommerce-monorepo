import React from "react";
import { Product } from "../../types/Product";
import { useCartStore } from "../../store/useCartStore";
import imageNotFound from "../../assets/image-not-found-icon.svg";
import { Button } from "ui-ecommerce";
import "ui-ecommerce/style.css";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    console.log('Button clicked');
    try {
      addToCart(product.id);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image || imageNotFound}
          alt={product.name}
          className="product-image"
        />
        {product.stock === 0 && (
          <span className="out-of-stock-badge">Agotado</span>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-details">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span className="product-stock" data-testid="product-stock">
            Stock: {product.stock}
          </span>
        </div>

        <Button variant="primary" size="md" onClick={handleAddToCart}  disabled={product.stock === 0}>
          Agregar al Carrito
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
