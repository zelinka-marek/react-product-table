import { useState } from "react";
import { products } from "../data/products";

function SearchBar({
  filter,
  inStockOnly,
  onFilterChange,
  onInStockOnlyChange,
}) {
  return (
    <form className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={(event) => onFilterChange(event.target.value)}
        aria-label="Search"
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(event) => onInStockOnlyChange(event.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  return (
    <tr className={product.stocked ? undefined : "out-of-stock"}>
      <td>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filter, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filter.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          key={product.category}
          category={product.category}
        />
      );
    }
    rows.push(<ProductRow key={product.name} product={product} />);
    lastCategory = product.category;
  });

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function FilterableProductTable({ products }) {
  const [filter, setFilter] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filter={filter}
        inStockOnly={inStockOnly}
        onFilterChange={setFilter}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filter={filter}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

export function App() {
  return <FilterableProductTable products={products} />;
}
