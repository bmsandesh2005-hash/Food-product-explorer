import { useMemo, useState } from "react";
import { CategoryFilter } from "../components/CategoryFilter";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { PriceFilter } from "../components/PriceFilter";
import { ProductList } from "../components/ProductList";
import { RatingFilter } from "../components/RatingFilter";
import { SearchBar } from "../components/SearchBar";
import { useProducts } from "../hooks/useProducts";
import { filterProducts, getCategories } from "../utils/filterProducts";

export function ProductsPage() {
  const { products, loading, error, retry } = useProducts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const categories = useMemo(() => getCategories(products), [products]);
  const availablePriceRange = useMemo(() => {
    if (products.length === 0) return null;

    return {
      min: Math.min(...products.map((product) => product.price)),
      max: Math.max(...products.map((product) => product.price)),
    };
  }, [products]);
  const visibleProducts = useMemo(
    () =>
      filterProducts(products, {
        query,
        category,
        minRating,
        minPrice: minPrice === "" ? null : Number(minPrice),
        maxPrice: maxPrice === "" ? null : Number(maxPrice),
      }),
    [products, query, category, minRating, minPrice, maxPrice],
  );

  const hasActiveFilters =
    query !== "" || category !== "all" || minRating !== 0 || minPrice !== "" || maxPrice !== "";

  const clearFilters = () => {
    setQuery("");
    setCategory("all");
    setMinRating(0);
    setMinPrice("");
    setMaxPrice("");
  };

  const renderContent = () => {
    if (loading) return <LoadingState message="Loading products..." />;
    if (error) return <ErrorState message="Unable to load products." onRetry={retry} />;
    if (visibleProducts.length === 0) {
      return (
        <EmptyState
          message="No products found."
          actionLabel="Clear filters"
          onAction={clearFilters}
        />
      );
    }
    return (
      <>
        <p className="result-count">
          Showing {visibleProducts.length} of {products.length} products
        </p>
        <ProductList products={visibleProducts} />
      </>
    );
  };

  return (
    <section className="catalog-page">
      <div className="catalog-heading">
        <div>
          <p className="eyebrow">GROCERY EDITION</p>
          <h1 className="page-title">The pantry</h1>
        </div>
        <span className="heading-stamp" aria-hidden="true">GOOD THINGS<br />IN STORE</span>
      </div>
      <div className="controls">
        <SearchBar value={query} onChange={setQuery} />
        <CategoryFilter categories={categories} value={category} onChange={setCategory} />
        <RatingFilter value={minRating} onChange={setMinRating} />
        <PriceFilter
          minPrice={minPrice}
          maxPrice={maxPrice}
          availableRange={availablePriceRange}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
        />
        {hasActiveFilters && (
          <button type="button" className="btn btn-outline" onClick={clearFilters}>
            Clear filters
          </button>
        )}
      </div>
      {renderContent()}
    </section>
  );
}
