# Food Product Explorer

A React and TypeScript app for browsing grocery products. Search the catalog, filter by food group, rating, and price, and open a product to see more details.

## Getting Started

Requirements: Node.js and npm.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite in your browser.

## Features

- Browse grocery products with images, prices, ratings, and food-group labels.
- Search products by title.
- Filter by food group, minimum rating, and minimum or maximum price.
- See the catalog's available price range and validation when the minimum exceeds the maximum.
- Open a product details page with its description, price, discount, rating, and stock information.
- Clear active filters to restore the full catalog.

Food groups are derived from product tags and include Fruits, Vegetables, Non-Veg, Dairy & Eggs, Beverages, Pantry, Desserts, Health & Wellness, Pet Food, and Household.

## Data Source

Products are loaded from the [DummyJSON groceries endpoint](https://dummyjson.com/products/category/groceries?limit=0). The app needs an internet connection to load products. The price filter uses each product's listed price.

## Other Commands

```bash
npm run build
npm run lint
```