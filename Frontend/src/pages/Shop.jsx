import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import Message from "../components/Message";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!filteredProductsQuery.isLoading && filteredProductsQuery.data) {
      const filteredProducts = filteredProductsQuery.data.filter(
        (product) => {
          const matchesPrice = product.price <= parseInt(priceFilter, 10) || priceFilter === "";
          const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
          return matchesPrice && matchesSearch;
        }
      );
      dispatch(setProducts(filteredProducts));
    }
  }, [filteredProductsQuery.data, dispatch, priceFilter, searchTerm]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...new Set(
      filteredProductsQuery.data
        ?.map((product) => product.brand)
        .filter((brand) => brand)
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setPriceFilter("");
    dispatch(setChecked([]));
    // Consider a more graceful state reset instead of a full page reload
    // For now, keeping the original behavior:
    window.location.reload();
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Filter Section */}
        <div className="col-span-1 rounded-lg bg-neutral-100 p-4">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border-neutral-400 px-3 py-2 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
          </div>

          <div className="mb-6">
            <h2 className="mb-2 rounded-full bg-pink-500 py-2 text-center font-bold text-white">
              Category Filter
            </h2>
            {categories?.map((c) => (
              <div key={c._id} className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  id={`category-${c._id}`}
                  checked={checked.includes(c._id)}
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                  className="h-4 w-4 cursor-pointer rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor={`category-${c._id}`} className="ml-2 text-sm text-neutral-700">
                  {c.name}
                </label>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="mb-2 rounded-full bg-pink-500 py-2 text-center font-bold text-white">
              Brand Filter
            </h2>
            {uniqueBrands?.map((brand) => (
              <div key={brand} className="mb-2 flex items-center">
                <input
                  type="radio"
                  id={brand}
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="h-4 w-4 cursor-pointer border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor={brand} className="ml-2 text-sm text-neutral-700">
                  {brand}
                </label>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="mb-2 rounded-full bg-pink-500 py-2 text-center font-bold text-white">
              Price Filter
            </h2>
            <input
              type="text"
              placeholder="Max Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full rounded-lg border-neutral-400 px-3 py-2 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
          </div>

          <button
            onClick={resetFilters}
            className="w-full rounded-lg bg-black py-2 font-bold text-white transition-colors hover:bg-red-700"
          >
            Reset Filters
          </button>
        </div>

        {/* Products Section */}
        <div className="md:col-span-3">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-neutral-800">
              Shop <span className="text-primary">({products?.length} Products)</span>
            </h2>
            <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-primary"></div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.length === 0 ? (
              <div className="col-span-full">
                <Message variant="info">No products found matching your criteria.</Message>
              </div>
            ) : (
              products.map((p) => (
                <ProductCard key={p._id} p={p} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
