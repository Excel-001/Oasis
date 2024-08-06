import React, { useState, useEffect } from 'react';

 function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/products.json')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
    return(
   <main className=" space-y-2 lg:space-y-9">
 <section>
    ok seee you in a bit 
    {products.map((product) => (
        <div key={product.id} className="product-card">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <p>Subsection: {product.subsection}</p>
          <p>Rating: {product.rating}</p>
          <p>Stock: {product.stock}</p>
          <div className="product-images">
            {product.images.map((image, index) => (
              <img key={index} src={image} alt={product.name} />
            ))}
          </div>
        </div>
      ))}
 </section>
 {/* <div>
      <p className="text-xl font-bold">Total number of products generated: {totalProducts}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="p-4 border rounded shadow">
            <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
            <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold mt-2">${product.price}</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>
            <p className="text-sm text-gray-500">Subsection: {product.subsection}</p>
            <p className="text-sm text-gray-500">Rating: {product.rating}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
            <div className="flex mt-2 space-x-2">
              {product.images.map((image, index) => (
                <img key={index} src={image} alt={`Image ${index + 1}`} className="w-16 h-16 object-cover" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div> */}
   </main>
    );
 }
 export  default Shop