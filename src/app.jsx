import PropTypes from "prop-types";
import { useState } from "react";
import { products } from "../data/products";
import { FilterType, InStockOnlyType, ProductType } from "./types";

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

SearchBar.propTypes = {
  filter: FilterType.isRequired,
  inStockOnly: InStockOnlyType.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onInStockOnlyChange: PropTypes.func.isRequired,
};

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

ProductCategoryRow.propTypes = {
  category: PropTypes.string.isRequired,
};

function ProductRow({ product }) {
  return (
    <tr className={product.stocked ? undefined : "out-of-stock"}>
      <td>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

ProductRow.propTypes = {
  product: ProductType.isRequired,
};

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

ProductTable.propTypes = {
  products: PropTypes.arrayOf(ProductType.isRequired).isRequired,
  filter: FilterType.isRequired,
  inStockOnly: InStockOnlyType.isRequired,
};

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

FilterableProductTable.propTypes = {
  products: PropTypes.arrayOf(ProductType.isRequired).isRequired,
};

export function App() {
  return <FilterableProductTable products={products} />;
}
