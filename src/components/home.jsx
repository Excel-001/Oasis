import React, { useState } from "react";
import homeimg from "../assets/homeimg.svg";
import "../App.css";
import Gallerytabs from "./galerrytabs";
import AnimatedButton from "./button-strate";
import faux from '../assets/faux-leather.svg';
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import Top from "./top-product";
import { Category } from "./categroies";
function Home() {

  const faqData = [
    {
      question: "What types of furniture do you offer?",
      answer: "We offer a wide range of contemporary furniture including sofas, chairs, tables, beds, storage solutions, and outdoor furniture. Our collection is designed to suit modern aesthetics and functional needs."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. Please check our shipping policy for details."
    },
    {
      question: "What is your return policy?",
      answer: "Once your order has shipped, you'll receive a tracking number via email."
    },
   {
    question:"What payment methods do you accept?",
    answer: "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and financing options through Affirm. All transactions are secure and encrypted."
   },
  ];

  const formatIndex = (index) => {
    return (index + 1).toString().padStart(2, '0');
  };
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const categories = [
    { name: "Most Recent", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  const defaultCity = categories[0];

  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const [isOpen, setIsOpen] = useState(false);

  

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (city) => {
    setSelectedCity(city);
    setIsOpen(false);
  };
  const itemVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 }
  };

  return (
    <main className="font-[inter]text-[#2E2F33] font-normal scroll-smooth leading-normal space-y-24  m-auto ">
      <section className="text-center space-y-2 h-auto lg:space-y-4">
        <p className="lg:text-lg text-sm leading-normal font-medium text-center w-full">
          FURNITURE STORE
        </p>
        <h1 className="font-semibold lg:font-bold text-lg lg:text-6xl md:text-5xl m-auto lg:w-9/12">
          Discover the Artistry of Modern Contemporary Furniture
        </h1>
        <p className="text-[#5F6980] font-normal text-base md:text-xl lg:w-6/12 m-auto">
          Experience the elegance and functionality of cutting-edge design where
          luxury meets innovation in every piece for ultimate relaxation
        </p>
        <div className="md:pt-8 w-full">
          <img className="w-full" src={homeimg} alt="Home" />
        </div>
      </section>
      <Category/>

      <Top/>
 
      <section className=" space-y-2 lg:space-y-9">
<h3 className=" font-semibold text-xl sm:text-2xl lg:text-4xl">Design inspiration and modern home ideas</h3> 
<Gallerytabs />
<div className=" flex justify- space-y-5 flex-col items-center   m-auto">
          <p className=" font-[inter]text-[#2E2F33] text-sm">Showing 20 of 48 results</p>
          <div className="w-2/4 h-1 bg-[#c0c0c2]">
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: [1,.7,.8,.9,.6,1] }}

    transition={{ duration: 1, ease: "easeInOut" }}
    className="bg-[#2E2F33] origin-left h-full rounded-e w-[45%]"
  />
</div>
          <AnimatedButton/>  
         </div>
      </section>
      <section>
        <AnimatePresence>
         <div className="space-y-4">
        {faqData.map((item, index) => (
          <div key={index} className="border-b p-4">
            <button
              onClick={() => handleToggle(index)}
              className="w-full text-left py-2 px-4 text-base lg:text-lg font-semibold flex justify-between items-center"
            > 
            <div className="font-medium text-base lg:text-2xl space-x-2 space-y-4  lg:space-x-8"> <span className="font-medium text-xl">{formatIndex(index)}</span>
              <span className="">{item.question}</span>
              </div>
              <span className={`shadow-lg p-2 rounded-full bg-[#F8F7FB] transition duration-200 ease-linear ${openIndex === index ? " -rotate-180":""}`}>
                {/* {openIndex === index ? '-' : '+'} */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 21.2501C11.81 21.2501 11.62 21.1801 11.47 21.0301L5.4 14.9601C5.11 14.6701 5.11 14.1901 5.4 13.9001C5.69 13.6101 6.17 13.6101 6.46 13.9001L12 19.4401L17.54 13.9001C17.83 13.6101 18.31 13.6101 18.6 13.9001C18.89 14.1901 18.89 14.6701 18.6 14.9601L12.53 21.0301C12.38 21.1801 12.19 21.2501 12 21.2501Z" fill="#686A74"/>
  <path d="M12 21.08C11.59 21.08 11.25 20.74 11.25 20.33V3.5C11.25 3.09 11.59 2.75 12 2.75C12.41 2.75 12.75 3.09 12.75 3.5V20.33C12.75 20.74 12.41 21.08 12 21.08Z" fill="#686A74"/>
</svg>

              </span>
            </button>
            <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      key="answer"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={itemVariants}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="lg:text-lg text-sm text-[#2E2F33] lg:px-16 lg:py-6">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
           
          </div>
        ))}
      </div> 
        </AnimatePresence>
      
      </section>
      
    </main>
  );
}

export default Home;
