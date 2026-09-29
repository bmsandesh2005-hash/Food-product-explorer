import type { Product, ProductFilters } from "../types/product";

export function getFoodCategory(product: Product): string {
  const tags = new Set(product.tags.map((tag) => tag.toLowerCase()));

  if (tags.has("fruits")) return "Fruits";
  if (tags.has("vegetables")) return "Vegetables";
  if (tags.has("meat") || tags.has("seafood")) return "Non-Veg";
  if (tags.has("dairy")) return "Dairy & Eggs";
  if (tags.has("beverages") || tags.has("coffee")) return "Beverages";
  if (tags.has("grains") || tags.has("cooking essentials") || tags.has("condiments")) {
    return "Pantry";
  }
  if (tags.has("desserts")) return "Desserts";
  if (tags.has("health supplements")) return "Health & Wellness";
  if (tags.has("pet supplies")) return "Pet Food";
  if (tags.has("household essentials")) return "Household";

  return "Other";
}

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  const query = filters.query.trim().toLowerCase();

  return products.filter((product) => {
    const matchesTitle = product.title.toLowerCase().includes(query);
    const matchesCategory =
      filters.category === "all" || getFoodCategory(product) === filters.category;
    const matchesRating = product.rating >= filters.minRating;
    const matchesMinPrice = filters.minPrice === null || product.price >= filters.minPrice;
    const matchesMaxPrice = filters.maxPrice === null || product.price <= filters.maxPrice;

    return matchesTitle && matchesCategory && matchesRating && matchesMinPrice && matchesMaxPrice;
  });
}

export function getCategories(products: Product[]): string[] {
  return [...new Set(products.map(getFoodCategory))].sort();
}
