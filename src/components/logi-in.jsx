import React, { useState } from "react";
import vase from "../assets/vase.svg";
import fgp from "../assets/fgp.svg";
import nightstand from "../assets/nightstand.svg";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ showModal, setShowModal }) {
  // State to manage the content shown in the modal
  const [modalContent, setModalContent] = useState("forgotPassword"); // 'login', 'signup', 'forgotPassword'

  return (
    <AnimatePresence>
      {showModal && (
        <section className="h-[100vh] font-[inter] absolute flex z-50 justify-end items-end top-0 left-0 w-[100vw] bg-opacity-40 bg-black">
        
        <motion.div
    initial={{ x: 900 }}
    animate={{ x: 0 }}
    exit={{ x: 900 }}
    transition={{ duration: 0.5 }}
    className={`space-y-8 lg:w-2/4 lg:p-8 lg:h-full h-full flex flex-col ${
      modalContent === "" ? "items-end" : "bg-white"
    } overflow-y-auto max-h-[100vh]`}
  >
            <div className="items-center  flex">
              <div onClick={() => setShowModal(false)} className="w-fit rounded-full bg-[#F8F7FB] p-3">
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
              </div>
              <h1 className="w-full text-center  text-black font-[inter] font-semibold text-xl">
                {modalContent === "login"
                  ? "Login"
                  : modalContent === "signup"
                  ? "Create an account"
                  : "Forgot Password"}
              </h1>
            </div>
            <div className=" lg:w-[90%] w-full m-auto">
                          {
  modalContent === "login" ? (
    <img src={vase} className="m-auto" alt="vase" />
  ) : modalContent === "signup" ? (
    <img src={nightstand} className="m-auto" alt="fgp" />
  ) : (
    <img src={fgp} className="m-auto" alt="fgp" />
  )
}
            </div>


           

            <div className=" w-[90%] m-auto">
              {modalContent === "login" && (
                <div className="space-y-7">
                  <h1 className="font-medium text-lg m-auto text-center md:text-2xl">Welcome back</h1>
                  <input
                    type="email"
                    className="border rounded-full h-16 w-full outline-0 focus:shadow-lg shadow-[#D6BBFB] transition duration-500 ease-in text-base text-[#2E2F33] px-3"
                    placeholder="Email"
                    name="email"
                    id="email"
                  />
                  <input
                    type="password"
                    className="border rounded-full h-16 w-full outline-0 focus:shadow-lg shadow-[#D6BBFB] transition duration-500 ease-in text-base text-[#2E2F33] px-3"
                    placeholder="Password"
                    name="password"
                    id="password"
                  />
                  <p
                    className="text-end text-base text-[#7C71DF] font-semibold cursor-pointer"
                    onClick={() => setModalContent("forgotPassword")}
                  >
                    Forgot password?
                  </p>
                  <button className="bg-[#7C71DF] w-full rounded-full text-white py-3 px-5">Login</button>
                </div>
              )}

              {modalContent === "signup" && (
                <div className="space-y-7">
                  <h1 className="font-medium text-lg m-auto text-center md:text-2xl">let's get your account set up</h1>
               
                  <input
                    type="email"
                    className="border rounded-full h-16 w-full outline-0 focus:shadow-lg shadow-[#D6BBFB] transition duration-500 ease-in text-base text-[#2E2F33] px-3"
                    placeholder="Email"
                    name="email"
                    id="email"
                  />
                  <input
                    type="password"
                    className="border rounded-full h-16 w-full outline-0 focus:shadow-lg shadow-[#D6BBFB] transition duration-500 ease-in text-base text-[#2E2F33] px-3"
                    placeholder="Password"
                    name="password"
                    id="password"
                  />
                  <button className="bg-[#7C71DF] w-full rounded-full text-white py-3 px-5">Sign Up</button>
                </div>
              )}


{modalContent === "signup" && (
  <div className=" flex gap-4 py-5 justify-start text-[#5F6980]  items-start">
    <div>
       <input type="checkbox" name="" id="" />
    </div>

 <p>I agree to the <a href="">terms and conditions </a> of Oasis and acknowledge the <a href="">privacy policy</a> </p>
  </div>
)}

{modalContent === "login" && (
  <>
   <div className="flex justify-center items-center py-5 gap-5 text-center">
                <p className="w-[46%] h-[.09rem] bg-slate-600"></p>
                <p className="text-center">OR</p>
                <p className="w-[46%] h-[.09rem] bg-slate-600"></p>
              </div>

              <div className="space-y-7">
                <button className="bg-[inherit] w-full rounded-full border flex justify-center items-center gap-3 py-3 px-5">
                  <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.255H17.92C17.665 15.63 16.89 16.795 15.725 17.575V20.335H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M11.9999 23C14.9699 23 17.4599 22.015 19.2799 20.335L15.7249 17.575C14.7399 18.235 13.4799 18.625 11.9999 18.625C9.13492 18.625 6.70992 16.69 5.84492 14.09H2.16992V16.94C3.97992 20.535 7.69992 23 11.9999 23Z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.845 14.0901C5.625 13.4301 5.5 12.7251 5.5 12.0001C5.5 11.2751 5.625 10.5701 5.845 9.91006V7.06006H2.17C1.4 8.59292 0.999321 10.2847 1 12.0001C1 13.7751 1.425 15.4551 2.17 16.9401L5.845 14.0901Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M11.9999 5.375C13.6149 5.375 15.0649 5.93 16.2049 7.02L19.3599 3.865C17.4549 2.09 14.9649 1 11.9999 1C7.69992 1 3.97992 3.465 2.16992 7.06L5.84492 9.91C6.70992 7.31 9.13492 5.375 11.9999 5.375Z"
                        fill="#EA4335"
                      />
                    </svg>
                  </div>
                  <p className="font-semibold font-[inter]">Continue with Google</p>
                </button>
                <button className="bg-[inherit] w-full rounded-full border flex justify-center items-center gap-3 py-3 px-5">
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" fill="none">
                      {/* Apple SVG Path */}
                      <path
                        d="M18.9085 8.18824C17.3093 9.17647 16.3215 10.8706 16.3215 12.7529C16.3215 15.3059 18.0393 16.5765 18.0856 16.6118C17.9916 16.8525 17.5692 18.1 16.7053 19.3853C15.9422 20.5294 15.2249 21.6735 13.8961 21.6735C12.6137 21.6735 12.1847 20.9176 10.6083 20.9176C9.03209 20.9176 8.50747 21.6735 7.31925 21.6735C6.08406 21.6735 5.2465 20.5647 4.48294 19.4C3.26957 17.5529 2.36366 14.7412 2.36366 12.0706C2.36366 9.41176 4.06309 7.97647 5.17646 7.2C6.27845 6.42353 7.77596 6.31765 8.84214 6.31765C9.98369 6.31765 10.9964 6.50588 11.6385 6.64706C12.1309 6.75294 12.7813 6.8 13.1345 6.8C13.4786 6.8 14.2375 6.7 15.0897 6.45882C15.6404 6.3 16.8884 5.89412 17.8062 6.8C17.7367 6.87059 18.5953 7.6 18.9085 8.18824ZM12.0863 5.97647C12.4713 5.51177 12.8266 4.84677 13.0138 4.21177C13.2186 3.52354 13.2137 2.77647 13.116 2.35294C12.5085 2.37647 11.678 2.75294 11.2063 3.28235C10.8404 3.68235 10.4493 4.35882 10.2474 4.95294C10.0409 5.57647 10.2123 6.30588 10.3642 6.70588C10.9202 6.8 11.6949 6.53529 12.0863 5.97647Z"
                        fill="#000000"
                      />
                    </svg>
                  </div>
                  <p className="font-semibold font-[inter]">Continue with Apple</p>
                </button>
              </div>
  </>
)}
             

              {modalContent === "forgotPassword" && (
                <div className="space-y-7">
                  <h1 className="font-medium text-lg m-auto text-center md:text-2xl">Enter your email and we'll send you a link to reset your passsword</h1>
                  <input
                    type="email"
                    className="border rounded-full h-16 w-full outline-0 focus:shadow-lg shadow-[#D6BBFB] transition duration-500 ease-in text-base text-[#2E2F33] px-3"
                    placeholder="Enter your email"
                    name="email"
                    id="email"
                  />
                  <button className="bg-[#7C71DF] w-full rounded-full text-white py-3 px-5">Send Reset Link</button>
                </div>
              )}
              <p className="text-center text-[#5F6980] ">
                {modalContent === "login" && (
                  <span>
                    Don’t have an account?{" "}
                    <span
                      className="text-[#7C71DF] font-semibold cursor-pointer"
                      onClick={() => setModalContent("signup")}
                    >
                      Create an account
                    </span>
                  </span>
                )}
                {modalContent === "signup" && (
                  
                  <span className="">
                    Already have an account?{" "}
                    <span
                      className="text-[#7C71DF] font-semibold cursor-pointer"
                      onClick={() => setModalContent("login")}
                    >
                      Login
                    </span>
                  </span>
                
                )}
                {modalContent === "forgotPassword" && (
                  
                  <div className="py-5">
                    Remembered your password?{" "}
                    <span
                      className="text-[#7C71DF] font-semibold cursor-pointer"
                      onClick={() => setModalContent("login")}
                    >
                      Login
                    </span>
                  </div>
                
                )}
                

              </p>
            </div>
          </motion.div>
        </section>
      )}
    </AnimatePresence>
  );
}
