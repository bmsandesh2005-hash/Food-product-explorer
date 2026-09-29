import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { getFoodCategory } from "../utils/filterProducts";
import { formatPrice, formatRating } from "../utils/format";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <img src={product.thumbnail} alt={product.title} loading="lazy" />
      <div className="product-card-body">
        <h2>{product.title}</h2>
        <span className="badge">{getFoodCategory(product)}</span>
        <div className="product-meta">
          <span className="price">{formatPrice(product.price)}</span>
          <span className="rating">&#9733; {formatRating(product.rating)}</span>
        </div>
        <Link to={`/products/${product.id}`} className="btn">
          View Details
        </Link>
      </div>
    </article>
  );
}
