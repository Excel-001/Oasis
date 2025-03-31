import React, { useEffect, useState } from "react";
import faux from '../assets/faux-leather.svg';
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "./button-strate";
import { useCart } from "./cartContext";
function Top() {
  const cart = useCart()
  const ITEMS_PER_PAGE = 20;
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setDisplayedProducts(data.slice(0, ITEMS_PER_PAGE));
      });
  }, []);

  const handleNext = () => {
    const newIndex = currentIndex + ITEMS_PER_PAGE;
    setCurrentIndex(newIndex);
    setDisplayedProducts(products.slice(newIndex, newIndex + ITEMS_PER_PAGE));
  };

  const itemVariants = {
    closed: { opacity: 0, y: 30 },
    open: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  };

  const categories = [
    { name: "Most Recent", code: "NY" },
    { name: "Old", code: "Old" },
    { name: "Trending", code: "Trending" },
    { name: "Morden", code: "Morden" },
    { name: "Classic", code: "Classic" },
  ];

  const defaultCity = categories[0];
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (city) => {
    setSelectedCity(city);
    setIsOpen(false);
  };

  // Calculate percentage of items shown
  const totalItems = products.length;
  const displayedItems = currentIndex + ITEMS_PER_PAGE > totalItems ? totalItems : currentIndex + ITEMS_PER_PAGE;
  const percentage = (displayedItems / totalItems) * 100;

  return (
    <section className="space-y-2 lg:space-y-9">
      <div className="flex flex-col md:flex-row md:items-center items-start justify-between">
        <p className="text-xl font-bold md:text-4xl md:font-semibold">
          Top Products
        </p>
        <div className="w-60 relative flex gap-2 flex-col-reverse">
          <motion.button
            onClick={toggleDropdown}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10, duration: 0.5, ease: 'easeInOut' }}
            className="dropdown-button flex relative justify-between p-2 order-last col-start-4 w-full rounded-lg items-center lg:px-5 border text-[#2E2F33] gap-4 lg:rounded-2xl lg:py-3"
          >
            <p className="font-[inter] font-normal">
              {selectedCity ? selectedCity.name : ""}
            </p>
            <span className={`${isOpen ? "rotate-180 duration-400 transition-all" : "rotate-[360deg]"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 16.8C11.3 16.8 10.6 16.53 10.07 16L3.55002 9.48C3.26002 9.19 3.26002 8.71 3.55002 8.42C3.84002 8.13 4.32002 8.13 4.61002 8.42L11.13 14.94C11.61 15.42 12.39 15.42 12.87 14.94L19.39 8.42C19.68 8.13 20.16 8.13 20.45 8.42C20.74 8.71 20.74 9.19 20.45 9.48L13.93 16C13.4 16.53 12.7 16.8 12 16.8Z" fill="#292D32" />
              </svg>
            </span>
          </motion.button>
          <AnimatePresence>
            {isOpen && (
              <motion.ul
                className="absolute z-20 w-full border rounded-xl py-2 bg-white shadow-lg"
                initial={{ opacity: 0, y: -20, scale: 0 }}
                animate={{ opacity: 1, y: 220, scale: 1, transition: { staggerChildren: 0.2 } }}
                exit={{ opacity: 0, y: 90 }}
              >
                {categories.map((category) => (
                  <motion.li
                    variants={itemVariants}
                    key={category.code}
                    onClick={() => handleSelect(category)}
                    className="hover:bg-gray-100 cursor-pointer px-4 py-2"
                  >
                    {category.name}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
      <section className="grid font-[inter] gap-8 grid-cols-4 md:grid-cols-3 lg:grid-cols-4">
        {displayedProducts.map((product) => (
          <div key={product.id} className="col-span-2  md:col-span-1 space-y-2">
            <div className="bg-[#F3F4F7] group relative grid grid-rows-4 lg:h-[18rem] h-[12rem] rounded justify-center self-center items-center">
              <img src={product.images[0]} className="row-span-4 max-w-full self-center w-[85%] m-auto " alt={product.name} />
              <div className="justify-center absolute bottom-4 right-4 group-hover:duration-500 ease-in-out group-hover:origin-bottom group-hover:transition-all group-hover:flex hidden row-span-1">
                <button className=" w-fit">
                <AnimatedButton onClick={()=>(
                  cart.addToCart(product)
                )} buttonClass="bg-[#7C71DF]  border-0" textColor="text-white" className=" bg-slate-600" text="Show more" /> 
                </button>
              </div>
            </div>
            <div>
              <span className="flex items-center justify-between">
                <p className="col-span-4 text-ellipsis text-sm font-semibold lg:font-medium lg:text-lg overflow-hidden">{product.name}</p>
                <p className="text-base w-fit rounded-3xl p-1 text-center bg-[#F8F7FB]">${product.price}</p>
              </span>
              <div>
                <div className="min-w-4 min-h-4 w-fit h-fit rounded-full bg-gradient-to-bl from-green-700 from-50% to-50% to-blue-700"></div>
              </div>
            </div>
          </div>
        ))}
      </section>
      <div className="flex justify-center space-y-5 flex-col items-center m-auto">
        <p className="font-[inter] text-[#2E2F33] text-sm">
          Showing {Math.min(currentIndex + ITEMS_PER_PAGE, products.length)} of {products.length} results
        </p>
        <div className="w-2/4 h-1 bg-[#c0c0c2]">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: [1, 0.7, 0.8, 0.9, 0.6, 1] }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="bg-[#2E2F33] origin-left h-full rounded-e"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        
        {currentIndex + ITEMS_PER_PAGE < products.length && (
          <div >

         
          <AnimatedButton onClick={handleNext} text="Show more" /> </div>
        )}
      </div>
    </section>
  );
}

export default Top;
