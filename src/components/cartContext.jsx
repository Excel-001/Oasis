import React, { createContext, useContext, useState } from 'react';


const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const [cart , setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevWishlist) => {
            if (!prevWishlist.some(item => item.id === product.id)) {
                return [...prevWishlist, product];
            }
            return prevWishlist;
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevWishlist) =>
            prevWishlist.filter(item => item.id !== productId)
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <WishlistContext.Provider value={{ cart , addToCart, removeFromCart, clearCart}}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
