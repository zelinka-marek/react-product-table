import PropTypes from "prop-types";

export const ProductType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  stocked: PropTypes.bool.isRequired,
});

export const FilterType = PropTypes.string;

export const InStockOnlyType = PropTypes.bool;
