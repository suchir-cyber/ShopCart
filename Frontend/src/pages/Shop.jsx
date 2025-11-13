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

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // New state for search input

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
      // Filter products based on price and search term
      const filteredProducts = filteredProductsQuery.data.filter(
        (product) => {
          return (
            (product.price <= parseInt(priceFilter, 10) || priceFilter === "") &&
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) // Search by name
          );
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
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="flex md:flex-row">
          <div className="bg-[#F8F9FA] mt-2 p-2 mb-2 ml-14">
            
            {/* Search Bar */}
            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
              />
            </div>

            <h2 className="h4 text-center font-bold py-2 bg-[#FF4081] rounded-full mb-2">
              Category Filter
            </h2>

            <div className="p-5 w-[15rem]">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 cursor-pointer"
                    />
                    <label className="ml-2 text-sm font-medium text-black">
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center font-bold py-2 bg-[#FF4081] rounded-full mb-2">
              Brand Filter
            </h2>

            <div className="p-5">
              {uniqueBrands?.map((brand) => (
                <div key={brand}>
                  <div className="flex items-center mr-4 mb-5">
                    <input
                      type="radio"
                      id={brand}
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 cursor-pointer"
                    />
                    <label className="ml-2 text-sm font-medium text-black">
                      {brand}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center font-bold py-2 bg-[#FF4081] rounded-full mb-2">
              Price Filter
            </h2>

            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
              />
            </div>

            <div className="p-5 pt-0">
              <button
                className="w-full border my-4"
                onClick={() => {
                  setSearchTerm("");
                  setPriceFilter("");
                  window.location.reload();
                }}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="p-3">
          <div className="text-center my-6">
              <h2 className="text-3xl font-bold text-gray-800">
                  Shop <span className="text-pink-500">({products?.length} Products)</span>
              </h2>
              <div className="w-24 h-1 mx-auto mt-2 bg-pink-500 rounded-full"></div>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length === 0 ? (
                <Loader />
              ) : (
                products.map((p) => (
                  <div className="p-3" key={p._id}>
                    <ProductCard p={p} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
