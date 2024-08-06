import React from 'react';
import AnimatedButton from "./button-strate";
import greyhalf from "../assets/halfgrey.svg";
import vase from "../assets/vase.svg";
import kettle from "../assets/kettle.svg";
import nightstand from "../assets/nightstand.svg";
import RevealText from './text-animation';
import { BrowserRouter, Route, Routes,NavLink, Outlet } from 'react-router-dom';

function Category() {
    return (
        <section id="categories" className="space-y-2 lg:space-y-9 leading-normal font-[inter]">
            <p className="text-xl font-bold md:text-4xl md:font-semibold">
                Categories
            </p>
            <div className="grid gap-4 grid-cols-2">
                {[
              { title: "Sitting Room", img: greyhalf, path: "/home/categories/sitting-room" },
              { title: "Accessories", img: vase, path: "/home/categories/accessories" },
              { title: "Kitchen", img: kettle, path: "/home/categories/kitchen" },
              { title: "Bedroom", img: nightstand, path:"/home/categories/bedroom" },
                ].map((item, index) => (
                    <div
                        key={index}
                        className={`bg-[#F3F4F7] ${index % 3 === 0 ? 'col-span-full' : 'md:col-span-1'} col-span-full relative lg:h-[24rem] h-[14rem] sm:h-[17rem] rounded-lg p-5`}
                    >
                        <div className="flex h-full justify-between">
                            <div className="flex flex-col justify-center space-y-7">
                                <p className="font-semibold md:text-2xl">{item.title}</p>
<NavLink to={item.path}>
    <AnimatedButton />
</NavLink>
                                
                            </div>
                            <div className="flex justify-end items-center w-6/12 lg:w-9/12">
                                <img className="max-h-[100%]" src={item.img} alt={item.title} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
         
        </section>
    );
}

function Header() {
    const paths = ['Home', 'Categories'];

    return (
        <div className='space-y-2 lg:space-y-9'>
            <section className='text-center space-y-2  lg:space-y-3'>
                <p className="lg:text-lg text-sm leading-normal font-medium text-center w-full">
                    TAKE A LOOK
                </p>
            
                <h1 className='font-semibold lg:font-bold text-lg lg:text-5xl md:text-3xl m-auto  lg:w-9/12'>
                    Get the best  of every exclusive category available.
                </h1>
                <p className='text-[#2E2F33] font-normal text-base    md:text-xl lg:w-6/12 m-auto'>
                    <RevealText className=" text-center" text="At our store, we offer a diverse selection of furniture, including elegant living room sets, comfortable bedroom collections, functional office pieces, stylish dining room furniture, and versatile outdoor options. Each category is designed to blend seamlessly with your home decor, ensuring both style and comfort." />
                </p>
                <nav aria-label="breadcrumb">
                    <ol className="flex justify-center space-x-2">
                        {paths.map((path, index) => (
                            <li key={index} className="flex items-center">
                                {index > 0 && <span className="mx-2">{'>'}</span>}
                                <span>{path}</span>
                            </li>
                        ))}
                    </ol>
                </nav>
            </section>
            <RevealText className="" text="" />
            <Category />
        </div>
    );
}

export { Category };
export default Header;
