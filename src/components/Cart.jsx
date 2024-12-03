import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cartimg from '../assets/cart.svg'
import { useCart } from "./cartContext";
const [addToCart, removeFromCart, clearCart] = useState(useCart)
function CartPage({ showCart, setShowCart }) {
  const cartItems = [
    { id: 1, name: "Item 1", price: 25.99, quantity: 1 },
    { id: 2, name: "Item 2", price: 15.49, quantity: 2 },
    { id: 3, name: "Item 3", price: 45.0, quantity: 1 },
  ];

  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <>
        <AnimatePresence>
      {showCart && (
        <motion.div
          className="fixed inset-0 z-50 font-[inter] flex justify-end items-end bg-black bg-opacity-40"
        >
          <motion.div
            initial={{ x: 900 }}
            animate={{ x: 0 }}
            exit={{ x: 900 }}
            transition={{ duration: 0.5 }}
            className="bg-white  shadow-lg    h-full  w-full lg:w-[50%] relative"
          >
     <div className="grid grid-cols-6 m-3   static md:m-6 ">
        <button onClick={() => setShowCart(false)} className="w-fit col-span-1  rounded-full bg-[#F8F7FB] p-1 md:p-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16.773 8.28772L8.28777 16.773C7.99785 17.0629 7.51702 17.0629 7.22711 16.773C6.93719 16.4831 6.93719 16.0023 7.22711 15.7123L15.7124 7.22706C16.0023 6.93715 16.4831 6.93715 16.773 7.22706C17.063 7.51698 17.063 7.99781 16.773 8.28772Z"
                    fill="#292D32"
                  />
                  <path
                    d="M16.773 16.7729C16.4831 17.0628 16.0023 17.0628 15.7124 16.7729L7.22711 8.28765C6.93719 7.99774 6.93719 7.51691 7.22711 7.22699C7.51702 6.93708 7.99785 6.93708 8.28777 7.22699L16.773 15.7123C17.063 16.0022 17.063 16.483 16.773 16.7729Z"
                    fill="#292D32"
                  />
                </svg>
              </button>
              <div className="flex col-span-5 lg:col-span-4  justify-center items-center">
             <p className="text-xl font-semibold">Cart</p>    
              </div>
                
     
     </div>
          
            {cartItems.length > 0 ? (

              <>
              <div className="h-screen scroll-smooth overflow-y-scroll scrollbar-hide">

  

        <section className="grid grid-cols-6 md:grid-cols-3   w-full px-3 md:p-6  gap-2 md:gap-1">

  <div className="bg-[#F3F4F7] border md:max-w-52 md:max-h-52 rounded-md col-span-2 md:col-span-1 flex items-center justify-between">
    <img src={cartimg} className="md:max-w-full md:max-h-ful " alt="Product Image" />
  </div>


  <div className="w-full   rounded-tr p-2 flex flex-col col-span-4 relative   md:max-h-52  md:col-span-2 ">

  <div className="mb-4 grid grid-cols-4 gap-1  justify-center">

  <p className="col-span-3 text-base font-medium lg:break-words text-ellipsis whitespace-nowrap overflow-hidden font-[inter]  w-full text-wrap lg:font-bold lg:text-base">
    ukj,hgfklhsgjlfjh,sglshhf
  </p>


  <p className=" hidden sm:block md:col-span-fulln col-span-full break-words text-[#434448]">
    jbfgkjhgiubklghiukghiukbhiukgjghfvjhfgghcghjfgjvgjbghjfvjbgbvjbhgfvjhgvbjhgj
  </p>


  <p className="m-auto sm:m-0 text-sm font-semibold md:col-span-full text-[#7C71DF] lg:text-xl md:mt-2  items-center">
    $596.78
  </p>
</div>


    <div className="flex items-center justify-between">
  
      <div className="flex gap-1">
        <div className="md:w-5 md:h-5 h-4 w-4 rounded-full bg-yellow-400"></div>
        <div className="md:w-5 md:h-5 h-4 w-4 rounded-full bg-yellow-400"></div>
        <div className="md:w-5 md:h-5 h-4 w-4 rounded-full bg-yellow-400"></div>
        
      </div>


      <input
        type="number"
        className="text-[#2E2F33] bg-[#F8F7FB] border border-[#D0D1D5] rounded-full w-16 h-10 outline-0 text-center"
        name="quantity"
        id="quantity"
        min="1"
      />
    </div>
  </div>
</section>
  
              </div>
 
  

              
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-lg font-medium">Subtotal:</p>
                    <p className="text-lg font-medium">${calculateTotal()}</p>
                  </div>
                  <button
                    className="w-full bg-[#7C71DF] text-white py-2  absolute bottom-0 hover:bg-[#6b63d0] transition"
                    onClick={() => alert("Proceeding to checkout...")}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            ) : (
               
                <section className="    ">
                    <div className=" h-3/5">
 <p className="text-center text-gray-500">Your cart is empty.</p>
                  
                         <img src={cartimg} className="m-auto mt-5" alt="" />
                    </div>
                    
               <div>
                 <button className="bg-[#7C71DF] w-full absolute bottom-0  text-white py-3 px-5">SHOP ALL</button>
               </div>
                    
                </section>
             
            )}
          </motion.div>
        </motion.div>
      )}        
        </AnimatePresence>
    
    </>
  );
}

export default CartPage;
