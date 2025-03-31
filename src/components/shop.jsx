import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from './cartContext';
import AnimatedButton from './button-strate';
function Shop() {
    const [products, setProducts] = useState([]);
    const cart = useCart();

    useEffect(() => {
        fetch('/products.json')
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);

    return (
        <main className="p-6 space-y-2 lg:space-y-9">
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((product) => (
                    <motion.div 
                        key={product.id}
                        className="col-span-1 space-y-3"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="bg-[#F3F4F7] group relative  rounded-lg overflow-hidden">
                            <img
                                src={product.images[0]}
                                className="w-full h-full object-contain p-4"
                                alt={product.name}
                            />
                            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                onClick={() => cart.addToCart(product)}
                               className=' w-12 h-12 bg-[#7C71DF] text-white text-2xl text-center rounded-[50%]'
                               
                                >
                                  +
                                    
                                </button>
                            </div>
                        </div>
                        <div className=' space-y-2'>
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
            
                        {/* <div className="p-2">
                            <div className="flex justify-between items-start">
                                <h3 className="col-span-4 text-ellipsis text-sm font-semibold lg:font-medium lg:text-lg overflow-hidden">{product.name}</h3>
                                <p className="text-base text-[#2E2F33] bg-[#F8F7FB] px-2 py-1 rounded-full">
                                    ${product.price}
                                </p>
                            </div>
                        </div> */}
                    </motion.div>
                ))}
            </section>
        </main>
    );
}

export default Shop;