import { formatPrice } from "../utils/format";

interface PriceFilterProps {
  minPrice: string;
  maxPrice: string;
  availableRange: { min: number; max: number } | null;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}

export function PriceFilter({
  minPrice,
  maxPrice,
  availableRange,
  onMinPriceChange,
  onMaxPriceChange,
}: PriceFilterProps) {
  const hasInvalidRange =
    minPrice !== "" && maxPrice !== "" && Number(minPrice) > Number(maxPrice);

  return (
    <div className="field field-price">
      <label>Price range</label>
      {availableRange && (
        <span className="price-hint">
          Available: {formatPrice(availableRange.min)} to {formatPrice(availableRange.max)}
        </span>
      )}
      <div className="price-range">
        <input
          type="number"
          min="0"
          step="0.01"
          aria-label="Minimum price"
          aria-invalid={hasInvalidRange}
          aria-describedby={hasInvalidRange ? "price-range-error" : undefined}
          placeholder="Min $"
          value={minPrice}
          onChange={(event) => onMinPriceChange(event.target.value)}
        />
        <span>to</span>
        <input
          type="number"
          min="0"
          step="0.01"
          aria-label="Maximum price"
          aria-invalid={hasInvalidRange}
          aria-describedby={hasInvalidRange ? "price-range-error" : undefined}
          placeholder="Max $"
          value={maxPrice}
          onChange={(event) => onMaxPriceChange(event.target.value)}
        />
      </div>
      {hasInvalidRange && (
        <span className="price-error" id="price-range-error" role="alert">
          Minimum price must not exceed maximum price.
        </span>
      )}
    </div>
  );
}