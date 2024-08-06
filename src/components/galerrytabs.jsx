import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import tabsimg from "../tabs-data/galleryimg1.svg";
import ok1 from '../tabs-data/ok1.svg';
import { generateFakeProducts } from "../data/fakeData";
import '../index.css';
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
const GalleryTabs = () => {
  const tabs = [
    { id: "All", title: "All" },
    { id: "Bedroom", title: "Bedroom" },
    { id: "Living room", title: "Living room" },
    { id: "Kitchen", title: "Kitchen" },
    { id: "Workspace", title: "Workspace" },
    { id: "Outdoor", title: "Outdoor" },
    { id: "Bathroom", title: "Bathroom" },
    { id: "Dining room", title: "Dining room" },
  ];
  const [selectedTab, setSelectedTab] = useState(tabs[0].id);

  const sliderRef = useRef(null);
  const handleTabClick = (id) => {
    setSelectedTab(id);
  };
  const gridRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 180,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const images = [
    { id: 1, img: tabsimg },
    { id: 2, img: ok1 },
    { id: 3, img: tabsimg },
    { id: 4, img: ok1 },
    { id: 5, img: tabsimg },
    { id: 6, img: ok1 },
    { id: 7, img: tabsimg },
    { id: 8, img: tabsimg },
    { id: 9, img: tabsimg },
  ];

  useEffect(() => {
    const masonryInstance = new Masonry(gridRef.current, {
      itemSelector: ".grid-item",
      columnWidth: ".grid-sizer",
      percentPosition: true,
    });

    imagesLoaded(gridRef.current, () => {
      masonryInstance.layout();
    });

    return () => {
      masonryInstance.destroy();
    };
  }, []);


  return (
    <div className="w-full mx-auto">
      <div className="relative grid justify-center items-center grid-cols-12 mb-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="bg-white col-span-1 hidden backtop shadow-lg w-14 h-14 sm:flex justify-center items-center rounded-full"
          onClick={() => sliderRef.current.slickPrev()} // Use the ref to go to the previous slide
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
            onClick={() => sliderRef.current.slickNext()} // Use the ref to go to the next slide
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
      <div className="grid " ref={gridRef}>
        <div className="grid-sizer "></div>
        {images.map((image) => (
          <div className="grid-item" key={image.id}>
            <motion.img
               initial={{ y: 20, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               exit={{ y: -20, opacity: 0 }}
               transition={{ duration: 0.2 }}
              src={image.img}
              alt={`Gallery image ${image.id}`}
              className=" transition ease-in-out p-2  object-cover  duration-100"
            />
          </div>
        ))}
      </div>
   
    </div>
  );
};

export default GalleryTabs;
