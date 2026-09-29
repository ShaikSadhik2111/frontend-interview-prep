import React, { useCallback, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: 1, name: "Keyboard", price: 2500 },
  { id: 2, name: "Mouse", price: 1200 },
  { id: 3, name: "Monitor", price: 18000 },
];

type ProductListProps = {
  items: Product[];
  onSelect: (id: number) => void;
};

// React.memo can skip this component when its props are unchanged
// by shallow comparison.
const ProductList = React.memo(function ProductList({
  items,
  onSelect,
}: ProductListProps) {
  return (
    <ul>
      {items.map((product) => (
        <li key={product.id}>
          <button onClick={() => onSelect(product.id)}>
            {product.name} — ₹{product.price}
          </button>
        </li>
      ))}
    </ul>
  );
});

export default function Basics() {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);

  // useMemo caches the filtered array until query or products changes.
  // In this small example it is mainly for learning the API.
  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.toLowerCase();

    return products.filter((product) =>
      product.name.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  // useCallback keeps the function reference stable between renders.
  // This is useful here because ProductList is memoized.
  const handleSelect = useCallback((id: number) => {
    console.log("Selected product:", id);
  }, []);

  return (
    <section>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search products"
      />

      <button onClick={() => setCount((current) => current + 1)}>
        Count: {count}
      </button>

      <ProductList items={filteredProducts} onSelect={handleSelect} />
    </section>
  );
}
