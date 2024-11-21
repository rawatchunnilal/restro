import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import HomeCard from "../component/HomeCard";
import { GrPrevious, GrNext } from "react-icons/gr";
import FilterProduct from "../component/FilterProduct";
import AllProduct from "../component/AllProduct";

const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(20, 25);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable",
    []
  );
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4 bg-gray-50 min-h-screen">
      <div className="md:flex gap-6 py-6">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-indigo-300 w-40 px-3 py-1 items-center rounded-full">
            <p className="text-sm font-semibold text-indigo-900">Fast Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-8"
              alt="Delivery Icon"
            />
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold py-4 text-gray-800">
            Quick and Reliable Delivery of{" "}
            <span className="text-indigo-700">Electronics & Gadgets</span>
          </h2>
          <p className="py-3 text-lg text-gray-600">
            Discover a smooth shopping experience, with easy navigation and secure payments. From
            electronics to essentials, get what you need with a single click and experience our swift
            delivery, making shopping simple and enjoyable!
          </p>
          <button className="font-semibold bg-indigo-500 text-white px-5 py-2 mt-4 rounded-md hover:bg-indigo-600 transition">
            Shop Now
          </button>
        </div>

        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return (
                  <HomeCard key={index + "loading"} loading={"Loading..."} />
                );
              })}
        </div>
      </div>

      <div className="my-6">
        <div className="flex w-full items-center mb-4">
          <h2 className="font-bold text-2xl text-gray-800">Gadgets</h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-gray-300 hover:bg-gray-400 text-lg p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-gray-300 hover:bg-gray-400 text-lg p-1 rounded"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-x-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListVegetables[0]
            ? homeProductCartListVegetables.map((el) => {
                return (
                  <CardFeature
                    key={el._id + "vegetable"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => (
                <CardFeature loading="Loading..." key={index + "cartLoading"} />
              ))}
        </div>
      </div>

      <AllProduct heading={"Explore More Products"} />
    </div>
  );
};

export default Home;
