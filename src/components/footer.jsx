import RevealText from "./text-animation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Footer() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowButton(true); // Show button when scrolled more than 200px
      } else {
        setShowButton(false); // Hide button when less than 200px
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

    const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  
  return (
    <section className=" m-0  font-[inter] bg-[#101010] px-4 md:px-12 py-7 lg:py-16  text-white lg:px-20">
       {showButton && (
        <motion.button
          onClick={handleBackToTop}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          className="bg-[#F3F4F7] backtop lg:right-3 right-1 bottom-3 shadow-lg w-10 h-10 flex fixed justify-center items-center rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
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
      )}
 
      <div className="  grid md:space-x-3 space-y-3 grid-cols-4 min-h-[30vh] w-full">
        <section className=" col-span-full  lg:col-span-1 flex flex-col justify-between">
              <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="84"
            height="30" 
            viewBox="0 0 84 30"
            fill="none"
          >
            <path
              d="M21.8975 3.65651C22.6454 4.76454 23.1994 5.94183 23.5596 7.18837C23.9197 8.4072 24.0997 9.76454 24.0997 11.2604C24.0997 12.7562 23.9335 14.349 23.6011 16.0388C23.2687 17.7285 22.7147 19.4183 21.9391 21.108C21.1634 22.7978 20.2216 24.2936 19.1136 25.5956C18.0055 26.8975 16.6066 27.964 14.9169 28.795C13.2271 29.5983 11.3712 30 9.34903 30C6.38504 30 4.08587 28.9474 2.45152 26.8421C0.817174 24.7091 0 21.9806 0 18.6565C0 15.3047 0.581717 12.2438 1.74515 9.47368C2.93629 6.6759 4.62604 4.40443 6.8144 2.65928C9.03047 0.886427 11.482 0 14.169 0C15.9418 0 17.4931 0.33241 18.8227 0.997229C20.1524 1.66205 21.1773 2.54848 21.8975 3.65651ZM10.5956 27.1745C11.8975 27.1745 12.9917 26.6066 13.8781 25.4709C14.7922 24.3352 15.4848 22.8532 15.9557 21.0249C16.8975 17.4238 17.3684 13.7258 17.3684 9.93075C17.3684 5.19391 16.0942 2.82549 13.5457 2.82549C12.1053 2.82549 10.8449 3.68421 9.76454 5.40166C7.74238 8.64266 6.7313 13.1302 6.7313 18.8643C6.7313 21.9945 6.91136 23.9335 7.27147 24.6814C7.43767 25.097 7.65928 25.5263 7.93629 25.9695C8.4349 26.7729 9.32133 27.1745 10.5956 27.1745Z"
              fill="white"
            />
            <path
              d="M37.9256 12.2992C37.981 12.2438 38.1333 11.8837 38.3826 11.2188C39.6846 11.2188 41.4297 11.6066 43.6181 12.3823C42.9256 14.6814 42.3716 17.0914 41.956 19.6122C41.5405 22.1053 41.3328 23.892 41.3328 24.9723C41.3328 26.0249 41.4436 26.5512 41.6652 26.5512C41.8314 26.5512 42.4408 26.2881 43.4934 25.7618L43.9921 25.5125L44.74 26.9668C44.4907 27.1884 44.1583 27.4654 43.7427 27.7978C43.3549 28.1302 42.607 28.5873 41.499 29.169C40.3909 29.723 39.3937 30 38.5073 30C36.7898 30 35.7926 29.2244 35.5156 27.6731C33.7427 29.2244 32.1361 30 30.6957 30C29.2829 30 28.0779 29.446 27.0807 28.3379C26.1112 27.2299 25.6264 25.4848 25.6264 23.1025C25.6264 19.3906 26.3882 16.4681 27.9117 14.3352C29.4353 12.1745 31.2774 11.0942 33.438 11.0942C34.9893 11.0942 36.4851 11.4958 37.9256 12.2992ZM33.1887 26.4681C33.8536 26.4681 34.6015 26.205 35.4325 25.6787C35.6264 21.7729 36.2774 17.9086 37.3854 14.0859C36.5544 13.7258 35.848 13.5457 35.2663 13.5457C34.2691 13.5457 33.4103 14.5291 32.6901 16.4958C31.9976 18.4349 31.6513 20.5817 31.6513 22.9363C31.6513 25.2909 32.1638 26.4681 33.1887 26.4681Z"
              fill="white"
            />
            <path
              d="M57.8598 24.0582C57.8598 25.8033 57.0842 27.2299 55.5329 28.3379C54.0094 29.446 52.2642 30 50.2975 30C48.3307 30 46.7656 29.5845 45.6022 28.7535C44.4664 27.9224 43.8986 27.1884 43.8986 26.5512C43.8986 26.1634 44.3833 25.5402 45.3529 24.6814C46.3224 23.795 47.1396 23.2548 47.8044 23.0609C49.1894 24.0859 50.3252 25.7064 51.2116 27.9224C52.2365 27.8393 52.749 27.3546 52.749 26.4681C52.749 25.1939 51.6271 23.3934 49.3833 21.0665C47.1396 18.7119 46.0177 16.8421 46.0177 15.4571C46.0177 14.072 46.6409 13.0055 47.8875 12.2576C49.134 11.482 50.6299 11.0942 52.375 11.0942C54.1479 11.0942 55.4775 11.4127 56.3639 12.0499C57.2504 12.6593 57.6936 13.5042 57.6936 14.5845C57.6936 15.6371 56.8487 17.1053 55.159 18.9889C55.3529 19.1828 55.6022 19.446 55.9069 19.7784C56.2116 20.0831 56.6132 20.6787 57.1119 21.5651C57.6105 22.4515 57.8598 23.2825 57.8598 24.0582ZM53.8709 17.5346C55.0343 16.5374 55.616 15.554 55.616 14.5845C55.616 13.615 54.9512 13.1302 53.6216 13.1302C52.9844 13.1302 52.4581 13.2687 52.0426 13.5457C51.6271 13.795 51.4193 14.0859 51.4193 14.4183C51.4193 15.0277 52.0288 15.8864 53.2476 16.9945L53.8709 17.5346Z"
              fill="white"
            />
            <path
              d="M68.3917 13.6704C68.3917 14.8338 68.0178 16.8421 67.2698 19.6953C66.5219 22.5208 66.148 24.3767 66.148 25.2632C66.148 26.1219 66.2726 26.5512 66.5219 26.5512C66.6881 26.5512 67.3252 26.2881 68.4333 25.7618L68.9319 25.5125L69.6383 26.9668C69.389 27.1884 69.0565 27.4654 68.641 27.7978C68.2255 28.1302 67.4499 28.5873 66.3142 29.169C65.1784 29.723 64.1258 30 63.1563 30C62.1867 30 61.425 29.7091 60.871 29.1274C60.3169 28.518 60.0399 27.7147 60.0399 26.7175C60.0399 25.6925 60.3862 23.892 61.0787 21.3158C61.7712 18.7119 62.1175 17.0222 62.1175 16.2465C62.1175 15.0831 61.7574 13.9889 61.0372 12.964L60.6632 12.4654L60.7047 11.9252C62.1729 11.5097 64.5552 11.3019 67.8516 11.3019C68.2117 11.7175 68.3917 12.5069 68.3917 13.6704ZM63.6549 6.77285C63.1009 6.21884 62.8239 5.48476 62.8239 4.57064C62.8239 3.65651 63.1978 2.85319 63.9457 2.16066C64.7214 1.46814 65.6078 1.12188 66.605 1.12188C67.6022 1.12188 68.3779 1.39889 68.9319 1.95291C69.4859 2.50693 69.7629 3.241 69.7629 4.15513C69.7629 5.04155 69.3613 5.83103 68.5579 6.52355C67.7823 7.21607 66.9097 7.56233 65.9402 7.56233C64.9707 7.56233 64.2089 7.29917 63.6549 6.77285Z"
              fill="white"
            />
            <path
              d="M83.951 24.0582C83.951 25.8033 83.1754 27.2299 81.6242 28.3379C80.1006 29.446 78.3555 30 76.3887 30C74.422 30 72.8569 29.5845 71.6934 28.7535C70.5577 27.9224 69.9898 27.1884 69.9898 26.5512C69.9898 26.1634 70.4746 25.5402 71.4441 24.6814C72.4137 23.795 73.2308 23.2548 73.8956 23.0609C75.2807 24.0859 76.4164 25.7064 77.3028 27.9224C78.3278 27.8393 78.8402 27.3546 78.8402 26.4681C78.8402 25.1939 77.7184 23.3934 75.4746 21.0665C73.2308 18.7119 72.1089 16.8421 72.1089 15.4571C72.1089 14.072 72.7322 13.0055 73.9787 12.2576C75.2253 11.482 76.7211 11.0942 78.4663 11.0942C80.2391 11.0942 81.5688 11.4127 82.4552 12.0499C83.3416 12.6593 83.7848 13.5042 83.7848 14.5845C83.7848 15.6371 82.94 17.1053 81.2502 18.9889C81.4441 19.1828 81.6934 19.446 81.9981 19.7784C82.3028 20.0831 82.7045 20.6787 83.2031 21.5651C83.7017 22.4515 83.951 23.2825 83.951 24.0582ZM79.9621 17.5346C81.1256 16.5374 81.7073 15.554 81.7073 14.5845C81.7073 13.615 81.0425 13.1302 79.7128 13.1302C79.0757 13.1302 78.5494 13.2687 78.1339 13.5457C77.7184 13.795 77.5106 14.0859 77.5106 14.4183C77.5106 15.0277 78.12 15.8864 79.3389 16.9945L79.9621 17.5346Z"
              fill="white"
            />
          </svg>
        </div>
        <div>
          <a href="" className=" text-sm">
            Home< span className="ps-2 opacity-60">/</span>
          </a>
          <a href="" className=" text-sm">
            Blog< span className="ps-2 opacity-60">/</span>
          </a>
          <a href="" className=" text-sm">
            Sale < span className="ps-2 opacity-60">/</span>
          </a>
          <a href="" className=" text-sm">
            About Us < span className="ps-2 opacity-60">/</span>
          </a>
         
        </div>
        </section>
        <section className="col-span-full m-0 lg:col-span-1 flex flex-col justify-end space-y-9">
            <div>
                <p className="text-sm opacity-60">Contact Us</p>
                <p className="text-xl ">+1 999 888-76-54</p>
            </div>
            <div>
                <p className="text-sm opacity-60">Email</p>
                <p className="text-xl ">hello@logoipsum.com</p>
            </div>
        </section>
        <section className="col-span-full lg:col-span-1 flex flex-col justify-end space-y-9">
            <div>
                <p className="text-sm opacity-60">Address</p>
                <p className="text-sm ">  2118 Thornridge Cir. Syracuse, Connecticut 35624</p>
            </div>
            <div>
                <p className="text-sm opacity-60">Opening hours</p>
                <p className="text-xl ">9am—6pm</p>
            </div>
        </section>
        
        <section className="col-span-full lg:col-span-1 space-y-12 flex items-end justify-between flex-col">
           
            <p className="text-sm opacity-60">© 2023 — Copyright</p>
            
        
        </section>
       
      </div>
    </section>
  );
}
export default Footer;
