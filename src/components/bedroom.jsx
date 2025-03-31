import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AnimatedButton from "./button-strate";
import RevealText from "./text-animation";
import { useCart } from "./cartContext";
function Bedroom() {
  const cart = useCart();
    const tabs = [
        { id: "All", title: "All", subcategory: "all" },
        { id: "coffee table", title: "Coffee Table", subcategory: "coffee table" },
        { id: "flower pot", title: "Flower Pot", subcategory: "flower pot" },
        { id: "lamp", title: "Lamp", subcategory: "lamp" },
        { id: "home office", title: "Home Office", subcategory: "home office" },
        { id: "room accessories", title: "Room Accessories", subcategory: "room accessories" },
      ];
    
      const itemVariants = {
        closed: { opacity: 0, y: 30 },
        open: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 }
      };
    
      const ITEMS_PER_PAGE = 20;
      const [selectedTab, setSelectedTab] = useState('All');
      const [allProducts, setAllProducts] = useState([]);
      const [displayedProducts, setDisplayedProducts] = useState([]);
      const [startIndex, setStartIndex] = useState(0);
      const [endIndex, setEndIndex] = useState(ITEMS_PER_PAGE);
      const [isOpen, setIsOpen] = useState(false);
      const [currentIndex, setCurrentIndex] = useState(0);
      const sliderRef = useRef(null);
      const [filteredProducts, setFilteredProducts] = useState([]);
      const categories = [
        { name: "Most Recent", code: "NY" },
        { name: "Old", code: "Old" },
        { name: "Trending", code: "Trending" },
        { name: "Modern", code: "Modern" },
        { name: "Classic", code: "Classic" },
      ];
      const defaultCity = categories[0];
      const [selectedCity, setSelectedCity] = useState(defaultCity);
    
      useEffect(() => {
        fetch("/products.json")
          .then((response) => response.json())
          .then((data) => {
            const sittingRoomProducts = data.filter(
              (product) => product.category === "Sitting Room"
            );
            setAllProducts(sittingRoomProducts);
            
            // Set initial filtered products to all
            const initialFiltered = sittingRoomProducts;
            setFilteredProducts(initialFiltered);
            setDisplayedProducts(initialFiltered.slice(0, ITEMS_PER_PAGE));
          })
          .catch((error) => console.error("Error fetching products:", error));
      }, []);
    
      const handleTabClick = (id) => {
        setSelectedTab(id);
        setCurrentIndex(0);
        
        const selectedSubcategory = tabs.find((tab) => tab.id === id).subcategory;
        const filtered = selectedSubcategory === "all" 
          ? allProducts 
          : allProducts.filter(p => p.subsection === selectedSubcategory);
        
        setFilteredProducts(filtered);
        setDisplayedProducts(filtered.slice(0, ITEMS_PER_PAGE));
      };
    
      const handleNext = () => {
        const newIndex = currentIndex + ITEMS_PER_PAGE;
        setCurrentIndex(newIndex);
        const selectedSubcategory = tabs.find(
          (tab) => tab.id === selectedTab
        ).subcategory;
        const filteredProducts =
          selectedSubcategory === "all"
            ? allProducts
            : allProducts.filter(
                (product) => product.subsection === selectedSubcategory
              );
        setDisplayedProducts(
          filteredProducts.slice(newIndex, newIndex + ITEMS_PER_PAGE)
        );
    
        const percentage = Math.min((newIndex + ITEMS_PER_PAGE) / filteredProducts.length * 100, 100);
        console.log(`Tab: ${selectedTab}, Number of products: ${filteredProducts.length}, Percentage displayed: ${percentage}%`);
      };
    
      const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          { breakpoint: 1300, settings: { slidesToShow: 6, slidesToScroll: 1 } },
          { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 1 } },
          { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
          { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
          { breakpoint: 180, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
      };
    
      const toggleDropdown = () => setIsOpen(!isOpen);
      const handleSelect = (category) => setSelectedCity(category);
    
      const paths = ["Home", "Categories", "Bedroom"];
  return (
    <>
      <main className="space-y-2 lg:space-y-9">
        <section className="text-center space-y-2 lg:space-y-3">
          <h1 className="font-semibold lg:font-bold text-lg lg:text-5xl md:text-3xl m-auto lg:w-9/12">
          Bedroom
          </h1>
          <p className="text-[#5F6980] font-normal text-base md:text-xl lg:w-6/12 m-auto">
          <RevealText text='Create your perfect sanctuary with our exquisite bedroom furniture collection. Whether you’re looking for a luxurious bed frame, cozy nightstands, or stylish dressers, our pieces combine comfort and elegance to help you unwind and rest in style.'/>
         
          </p>
          <nav aria-label="breadcrumb">
            <ol className="flex justify-center space-x-2">
              {paths.map((path, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">{">"}</span>}
                  <span>{path}</span>
                </li>
              ))}
            </ol>
          </nav>
          <div className="relative lg:w-[40.2rem] m-auto mt-1">
            <input
              type="text"
              id="search"
              className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Search..."
            />
            <button className="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
                  fill="#292D32"
                />
                <path
                  d="M22 22.7499C21.81 22.7499 21.62 22.6799 21.47 22.5299L19.47 20.5299C19.18 20.2399 19.18 19.7599 19.47 19.4699C19.76 19.1799 20.24 19.1799 20.53 19.4699L22.53 21.4699C22.82 21.7599 22.82 22.2399 22.53 22.5299C22.38 22.6799 22.19 22.7499 22 22.7499Z"
                  fill="#292D32"
                />
              </svg>
            </button>
          </div>
        </section>
        <div className="relative grid justify-center items-center grid-cols-12 mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-white col-span-1 hidden backtop shadow-lg w-14 h-14 sm:flex justify-center items-center rounded-full"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <svg
              className="-rotate-90"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18.07 10.3199C17.88 10.3199 17.69 10.2499 17.54 10.0999L12 4.55994L6.46 10.0999C6.17 10.3899 5.69 10.3899 5.4 10.0999C5.11 9.80994 5.11 9.32994 5.4 9.03994L11.47 2.96994C11.76 2.67994 12.24 2.67994 12.53 2.96994L18.6 9.03994C18.89 9.32994 18.89 9.80994 18.6 10.0999C18.46 10.2499 18.26 10.3199 18.07 10.3199Z"
                fill="#101010"
              />
              <path
                d="M12 21.2499C11.59 21.2499 11.25 20.9099 11.25 20.4999V3.66992C11.25 3.25992 11.59 2.91992 12 2.91992C12.41 2.91992 12.75 3.25992 12.75 3.66992V20.4999C12.75 20.9099 12.41 21.2499 12 21.2499Z"
                fill="#101010"
              />
            </svg>
          </motion.button>

          <Slider
            ref={sliderRef}
            {...settings}
            className="space-x-2 col-span-10 overflow-hidden"
          >
            {tabs.map((tab) => (
              <div key={tab.id} className="w-fit h-fit px-2">
                <button
                  onClick={() => handleTabClick(tab.id)}
                  className={`py-2 px-4 rounded-3xl text-base font-semibold transition-colors ${
                    selectedTab === tab.id
                      ? "bg-[#7C71DF] text-white"
                      : "bg-[#F8F7FB]"
                  }`}
                >
                  {tab.title}
                </button>
              </div>
            ))}
          </Slider>

          <div className="col-span-2 sm:col-span-1 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="bg-white backtop shadow-lg w-14 h-14 flex justify-center items-center rounded-full"
              onClick={() => sliderRef.current.slickNext()}
            >
              <svg
                className="rotate-90"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18.07 10.3199C17.88 10.3199 17.69 10.2499 17.54 10.0999L12 4.55994L6.46 10.0999C6.17 10.3899 5.69 10.3899 5.4 10.0999C5.11 9.80994 5.11 9.32994 5.4 9.03994L11.47 2.96994C11.76 2.67994 12.24 2.67994 12.53 2.96994L18.6 9.03994C18.89 9.32994 18.89 9.80994 18.6 10.0999C18.46 10.2499 18.26 10.3199 18.07 10.3199Z"
                  fill="#101010"
                />
                <path
                  d="M12 21.2499C11.59 21.2499 11.25 20.9099 11.25 20.4999V3.66992C11.25 3.25992 11.59 2.91992 12 2.91992C12.41 2.91992 12.75 3.25992 12.75 3.66992V20.4999C12.75 20.9099 12.41 21.2499 12 21.2499Z"
                  fill="#101010"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        <section className="space-y-2 lg:space-y-9">
          <div className="flex flex-col md:flex-row md:items-center items-start justify-between">
            <p className="text-xl font-bold md:text-4xl md:font-semibold">
              Top Products
            </p>
            <div className="w-60 relative flex gap-2 flex-col-reverse">
              <motion.button
                onClick={toggleDropdown}
                whileHover={{ scale: 1.1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                className="dropdown-button flex relative justify-between p-2 order-last col-start-4 w-full rounded-lg items-center lg:px-5 bordertext-[#2E2F33] gap-4 lg:rounded-2xl lg:py-3"
              >
                <p className="font-[inter] font-normal">
                  {selectedCity ? selectedCity.name : ""}
                </p>
                <span
                  className={`${
                    isOpen
                      ? "rotate-180 duration-400 transition-all"
                      : "rotate-[360deg]"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 16.8C11.3 16.8 10.6 16.53 10.07 16L3.55002 9.48C3.26002 9.19 3.26002 8.71 3.55002 8.42C3.84002 8.13 4.32002 8.13 4.61002 8.42L11.13 14.94C11.61 15.42 12.39 15.42 12.87 14.94L19.39 8.42C19.68 8.13 20.16 8.13 20.45 8.42C20.74 8.71 20.74 9.19 20.45 9.48L13.93 16C13.4 16.53 12.7 16.8 12 16.8Z"
                      fill="#292D32"
                    />
                  </svg>
                </span>
              </motion.button>
              <AnimatePresence>
                {isOpen && (
                  <motion.ul
                    className="absolute z-20 w-full border rounded-xl py-2 bg-white shadow-lg"
                    initial={{ opacity: 0, y: -20, scale: 0 }}
                    animate={{
                      opacity: 1,
                      y: 220,
                      scale: 1,
                      transition: { staggerChildren: 0.2 },
                    }}
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
          {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <div
                key={product.id}
                className="col-span-2 md:col-span-1 space-y-2"
              >
                <div className="bg-[#F3F4F7] group relative grid grid-rows-4 h-[18rem] justify-center self-center items-center">
                  <img
                    src={product.images[0]}
                    className="row-span-4 w-[85%] m-auto  self-center"
                    alt={product.name}
                  />
                  <div className="justify-center absolute bottom-4 right-4 group-hover:duration-500 ease-in-out group-hover:origin-bottom group-hover:transition-all group-hover:flex hidden row-span-1">
                    <button className="w-fit">
                      <AnimatedButton
                           onClick={() => cart.addToCart(product)}
                        buttonClass="bg-[#7C71DF] border-0"
                        textColor="text-white"
                        className="bg-slate-600"
                        text="Show more"
                      />
                    </button>
                  </div>
                </div>

                <div>
                  <span className="flex items-center justify-between">
                    <p className="col-span-4 text-ellipsis text-sm font-semibold lg:font-medium lg:text-lg overflow-hidden">
                      {product.name}
                    </p>
                    <p className="text-base w-fit rounded-3xl p-1 text-center bg-[#F8F7FB]">
                      ${product.price}
                    </p>
                  </span>
                  <div>
                    <div className="min-w-4 min-h-4 w-fit h-fit rounded-full bg-gradient-to-bl from-green-700 from-50% to-50% to-blue-700"></div>
                  </div>
                </div>
              </div>
              ))
            ) : (
            
                 <p className="text-[#5F6980] col-span-full my-9   text-2xl font-[Italianno] font-bold md:text-6xl lg:w-6/12 m-auto text-center ">No products found.</p>
             
             
            )}
         
          </section>
          

         

   <div className="flex justify-center space-y-5 flex-col items-center m-auto">
            <p className="font-[inter]text-[#2E2F33] text-sm">
              Showing {Math.min((currentIndex + ITEMS_PER_PAGE) / filteredProducts.length * 100, 100).toFixed(0)}% of {filteredProducts.length} results
            </p>
            <div className="w-2/4 h-1 bg-[#c0c0c2]">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1}}
                transition={{ duration: 1,  ease: "easeInOut" }}
                className="bg-[#2E2F33] origin-left h-full rounded-e"
                style={{ width: `${Math.min((currentIndex + ITEMS_PER_PAGE) / filteredProducts.length * 100, 100)}%` }}
              />
            </div>
 {displayedProducts.length > 0 && (
            <div>
              <AnimatedButton onClick={handleNext} text="Show more" />
            </div>  )}
          </div>

      

       
        </section>
      </main>
    </>
  );
}

export default Bedroom;
