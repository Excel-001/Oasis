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
 {/* <section>

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
 </section> */}

 <section className=' grid grid-cols-4 gap-6'>
  {products.map((product)=>(
        <div
                key={product.id}
                className="col-span-2 md:col-span-1 space-y-2"
              >
                <div className="bg-[#F3F4F7]   group relative grid grid-rows-4 h-[18rem] justify-center self-center items-center">
                  <img
                    src={product.images[0]}
                    className="row-span-4 w-[85%] m-auto  self-center"
                    alt={product.name}
                  />
                  <div className="justify-center absolute bottom-4 right-4 group-hover:duration-500 ease-in-out group-hover:origin-bottom group-hover:transition-all group-hover:flex hidden row-span-1">
                    <button className="w-fit">
                      {/* <AnimatedButton
                        onClick={handleNext}
                        buttonClass="bg-[#7C71DF] border-0"
                        textColor="text-white"
                        className="bg-slate-600"
                        text="Show more"
                      /> */}
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