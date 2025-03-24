import React from 'react';
import { Product } from '../../types/Product';
import { useCartStore } from '../../store/useCartStore';

import  imageNotFound  from "../../assets/image-not-found-icon.svg"


interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    try {
      addToCart(product.id);
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      // Aquí podrías mostrar una notificación de error
    }
  };

  return (
    <div className="product-card" key={product.id}>
    <img
      src={imageNotFound}
      alt={product.name}
      className="product-image"
    />
    <div className="product-info">
      <h3>{product.name}</h3>
      <p>Precio: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <button
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className="add-to-cart-button"
      >
        {product.stock > 0 ? "Agregar al Carrito" : "Agotado"}
      </button>
    </div>
  </div>
  );
};

export default ProductCard; 