import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/nav';
import Home from './components/home';
import Shop from './components/shop';
import Footer from './components/footer';
import Category from './components/categroies';
import SittingRoom from './components/sitting-room';
import Accessories from './components/accessories';
import Kitchen from './components/kitchen';
import Bedroom from './components/bedroom';

function App() {
    return (
        <BrowserRouter>
        <div className=' space-y-2 lg:space-y-9'>
                     <section className='w-[100vw] font-[inter] text-[#2E2F33] font-normal scroll-smooth leading-normal px-4 md:px-12 lg:px-20'>
                <Nav />
                <Routes>
                <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/home/categories" element={<Category />} />
                        <Route path="/home/categories/sitting-room" element={<SittingRoom />} />
                        <Route path="/home/categories/accessories" element={<Accessories />} />
                        <Route path="/home/categories/kitchen" element={<Kitchen />} />
                        <Route path="/home/categories/bedroom" element={<Bedroom />} />
                    </Routes>
            </section>
            <Footer />
        </div>
        </BrowserRouter>
    );
}

export default App;
