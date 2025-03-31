import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./cartContext";
import { useState } from "react";
import confirmed from "../assets/confirmed.svg";
import empty from "../assets/empty.svg";
function CartPage({ showCart, setShowCart }) {
  const cart = useCart();
  const [checkoutPhase, setCheckoutPhase] = useState("cart"); // 'cart' | 'address' | 'confirmation'
  const [deliveryAddress, setDeliveryAddress] = useState({
    Lastname: "",
    Firstname:"",
    email:"",
    Address: "",
    city: "",
    // state: "",
    country: "",
    phone: "",
  });

  const handleCheckout = () => {
    setCheckoutPhase("address");
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    // Add your address validation logic here
    setCheckoutPhase("payment");
    // In real app, you would send this to your backend
    console.log("Delivery Address:", deliveryAddress);
  };
  const calculateTotal = () =>
    cart.cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);

  //  card Area
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces every 4 digits
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ");
    }

    // Format expiration date as MM/YY
    if (name === "expirationDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .substring(0, 5);
    }

    // Limit CVV to 3-4 digits
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").substring(0, 4);
    }

    setCardData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const validateForm = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(cardData.cardNumber)) {
      newErrors.cardNumber = "Invalid card number";
    }

    const [month, year] = cardData.expirationDate.split("/");
    if (
      !month ||
      !year ||
      month < 1 ||
      month > 12 ||
      year < currentYear ||
      (year == currentYear && month < currentMonth)
    ) {
      newErrors.expirationDate = "Invalid expiration date";
    }

    if (!/^\d{3,4}$/.test(cardData.cvv)) {
      newErrors.cvv = "Invalid CVV";
    }

    if (!/^[a-zA-Z ]+$/.test(cardData.cardholderName)) {
      newErrors.cardholderName = "Invalid name";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit logic here
      console.log("Card data:", {
        ...cardData,
        cardNumber: cardData.cardNumber.replace(/ /g, ""),
      });
      alert("Payment processed successfully!");
    }
  };
  // card area end
  return (
    <AnimatePresence>
      {showCart && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white w-full lg:w-1/2 relative h-full shadow-xl gap-6  flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween" }}
          >
            <div className="grid grid-cols-6 m-3    static md:m-6 ">
              <button
                onClick={() => {
                  setShowCart(false);
                  setCheckoutPhase("cart");
                }}
                className="w-fit col-span-1   rounded-full bg-[#F8F7FB] p-1 md:p-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
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
              <div className="flex  col-span-5 lg:col-span-4  justify-center items-center">
                <p className="text-xl font-semibold">
                  {" "}
                  {checkoutPhase === "cart"
                    ? "Cart"
                    : checkoutPhase === "address"
                    ? "Checkout"
                    : checkoutPhase === "Payment"
                    ? "Payment"
                    : ""}{" "}
                </p>
              </div>
            </div>

            {checkoutPhase === "cart" && (
              <>
                <div className="flex-1 overflow-y-auto ">
                  {cart.cartItems.length === 0 ? (
                    <>
                      <div className=" flex flex-col items-center justify-center text-center">
                        <p className=" font-medium text-2xl">
                          Your cart is empty
                        </p>
                        <motion.img
                          src={empty}
                          className=""
                          alt="Empty cart"
                          initial={{ y: -20 }}
                          animate={{ y: 0 }}
                        />
                      </div>
                      <button
                        className="  w-full  h-14 bg-[#7C71DF] text-white py-2 absolute text-center    bottom-0 hover:bg-[#6b63d0] transition"
                        onClick={() => setShowCart(false)}
                      >
                        SHOP ALL
                      </button>
                    </>
                  ) : (
                    cart.cartItems.map((item) => (
                      <>
                        <div className="h-fit scroll-smooth overflow-y-scroll scrollbar-hide">
                          <section className="grid  grid-cols-6 md:grid-cols-3   w-full px-3 md:p-6  gap-2 md:gap-1">
                            <div className="bg-[#F3F4F7]  md:max-w-52 md:max-h-52 rounded-md col-span-2 md:col-span-1 flex items-center justify-between">
                              <img
                                src={item.images[0]}
                                className="  max-w-[75%] m-auto max-h-[75%] "
                                alt="Product Image"
                              />
                            </div>

                            <div className="w-full   rounded-tr p-2 flex flex-col col-span-4 relative   md:max-h-52  md:col-span-2 ">
                              <div className="mb-4 grid grid-cols-4 gap-1  justify-center">
                                <p className="col-span-3 text-base  lg:break-words text-ellipsis whitespace-nowrap overflow-hidden font-[inter]  w-full text-wrap lg:font-bold text-[#2E2F33] font-semibold lg:text-base">
                                  {item.name}
                                </p>

                                <p className="hidden sm:block md:col-span-full col-span-full font-normal text-sm break-words text-[#5F6980]">
                                  {item.description
                                    .split(" ")
                                    .slice(0, 20)
                                    .join(" ")}
                                  ...
                                </p>

                                <p className="m-auto sm:m-0 text-sm font-semibold md:col-span-full text-[#7C71DF] font-[inter]  md:text-2xl lg:text-xl md:mt-2  items-center">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex gap-1">
                                  <div className="md:w-5 md:h-5 h-4 w-4 rounded-full bg-yellow-400"></div>
                                  <div className="md:w-5 md:h-5 h-4 w-4 rounded-full bg-yellow-400"></div>
                                  <div className="md:w-5 md:h-5 h-4 w-4 rounded-full bg-yellow-400"></div>
                                </div>

                                <input
                                  value={item.quantity}
                                  onChange={(e) =>
                                    cart.updateQuantity(
                                      item.id,
                                      parseInt(e.target.value || 1)
                                    )
                                  }
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
                      </>
                    ))
                  )}
                </div>

                {cart.cartItems.length > 0 && (
                  <div className=" pt-4 mt-4">
                    <div className="flex justify-between items-center m-9 ">
                      <p className="text-lg font-medium">Subtotal:</p>
                      <p className="text-lg font-medium">${calculateTotal()}</p>
                    </div>
                    <button
                      className="w-full h-14 bg-[#7C71DF] text-white py-2   bottom-0 hover:bg-[#6b63d0] transition"
                      onClick={() => {
                        // alert("Proceeding to checkout...");
                        setCheckoutPhase("address");
                      }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
            {checkoutPhase === "address" && (
              <>
                <div onSubmit={handleAddressSubmit} className="flex-1 overflow-y-auto space-y-8  w-full md:w-3/4   m-auto p-4">
                  <section className=" space-y-6 ">
                    <div className=" space-y-1">
                      <h3 className=" font-[inter]  font-normal text-[#5F6980] text-xl">
                        Customer Information
                      </h3>
                      <p className=" text-[#5F6980]">
                        Have an account?{" "}
                        <a
                          className="text-[#7C71DF]"
                          onClick={() => setModalContent("login")}
                        >
                          Login
                        </a>
                      </p>
                    </div>
                    <div className="">
                      <input
                      value={deliveryAddress.email}
                      onChange={(e)=>setDeliveryAddress({...deliveryAddress, email: e.target.value})}
                        type="email"
                        className="border rounded-full h-16 w-full outline-0 focus:shadow-lg shadow-[#D6BBFB] drop-shadow-sm  border-gray-200  focus:outline-none focus:border-[#D6BBFB] focus:ring-2 focus:ring-[#D6BBFB] transition-all   duration-300 ease-in text-base text-[#2E2F33] px-3"
                        placeholder="Hello@email|"
                        required
                        name="email"
                        id="email"
                      />
                    </div>
                  </section>

                  <section  className=" space-y-6">
                    <h3 className="text-xl  font-semibold text-[#5F6980]">
                      Shipping address
                    </h3>
                    <input
                    value={deliveryAddress.Firstname}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, Firstname: e.target.value})}
                      type=""
                      className="border rounded-full h-16 w-full outline-0 focus:shadow-lg shadow-[#D6BBFB] drop-shadow-sm  border-gray-200  focus:outline-none focus:border-[#D6BBFB] focus:ring-2 focus:ring-[#D6BBFB] transition-all   duration-300 ease-in text-base text-[#2E2F33] px-3"
                      placeholder="First name"
                      required
                      name=""
                      id=""
                    />
                    <input
                    value={deliveryAddress.Lastname}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, Lastname: e.target.value})}
                      type=""
                      required
                      className="border rounded-full h-16 w-full outline-0 focus:shadow-lg shadow-[#D6BBFB] drop-shadow-sm  border-gray-200  focus:outline-none focus:border-[#D6BBFB] focus:ring-2 focus:ring-[#D6BBFB] transition-all   duration-300 ease-in text-base text-[#2E2F33] px-3"
                      placeholder="Last name"
                      name=""
                      id=""
                    />
                    <input
                      value={deliveryAddress.phone}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, phone: e.target.value})}
                      className="border rounded-full h-16 w-full outline-0 focus:shadow-lg shadow-[#D6BBFB] drop-shadow-sm  border-gray-200  focus:outline-none focus:border-[#D6BBFB] focus:ring-2 focus:ring-[#D6BBFB] transition-all   duration-300 ease-in text-base text-[#2E2F33] px-3"
                      type="tel"
                      required
                      name=""
                      id=""
                    />
                    <input
                      value={deliveryAddress.Address}
                      onChange={(e) => setDeliveryAddress({...deliveryAddress, Address: e.target.value})}
                      placeholder="Address"
                      required
                      className="border rounded-full h-16 w-full outline-0 focus:shadow-lg shadow-[#D6BBFB] drop-shadow-sm  border-gray-200  focus:outline-none focus:border-[#D6BBFB] focus:ring-2 focus:ring-[#D6BBFB] transition-all   duration-300 ease-in text-base text-[#2E2F33] px-3"
                    />
                    <div className="flex justify-between space-x-4">
                      <input
                        value={deliveryAddress.city}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, city: e.target.value})}
                        placeholder="City"
                        required
                        type="text"
                        className="border rounded-full h-16 w-full outline-0 focus:shadow-lg shadow-[#D6BBFB] drop-shadow-sm  border-gray-200  focus:outline-none focus:border-[#D6BBFB] focus:ring-2 focus:ring-[#D6BBFB] transition-all   duration-300 ease-in text-base text-[#2E2F33] px-3"
                      />
                      <input
                        value={deliveryAddress.country}
                        onChange={(e) => setDeliveryAddress({...deliveryAddress, country: e.target.value})}
                        type="text"
                        required
                        placeholder="Country"
                        className="border rounded-full h-16 w-full outline-0 focus:shadow-lg shadow-[#D6BBFB] drop-shadow-sm  border-gray-200  focus:outline-none focus:border-[#D6BBFB] focus:ring-2 focus:ring-[#D6BBFB] transition-all   duration-300 ease-in text-base text-[#2E2F33] px-3"
                      />
                    </div>
                  </section>
                </div>
                <button
                type="Submit"
                  className="w-full h-14 bg-[#7C71DF] text-white py-2   bottom-0 hover:bg-[#6b63d0] transition"
                  onClick={() => {
         setCheckoutPhase("Payment")
                  }}
                >
                  Proceed to payment
                </button>
              </>
            )}
            {checkoutPhase === "Payment" && (
              <>
                <div className="md:w-3/4 w-full p-4   mx-auto">
                  <form
                    onSubmit={handleSubmit}
                    className=" grid gap-6   grid-cols-2"
                  >
                    <div className=" col-span-2">
                      <input
                        type="text"
                        className="border rounded-full h-16 w-full outline-0 focus:shadow-lg shadow-[#D6BBFB] drop-shadow-sm  border-gray-200  focus:outline-none focus:border-[#D6BBFB] focus:ring-2 focus:ring-[#D6BBFB] transition-all   duration-300 ease-in text-base text-[#2E2F33] px-3"
                        name="cardNumber"
                        value={cardData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="Card number"
                        maxLength="19"
                      />
                      {errors.cardNumber && (
                        <span className="error">{errors.cardNumber}</span>
                      )}
                    </div>

                    <div className="col-span-1">
                      <input
                        className="border rounded-full h-16 w-full outline-0 focus:shadow-lg shadow-[#D6BBFB] drop-shadow-sm  border-gray-200  focus:outline-none focus:border-[#D6BBFB] focus:ring-2 focus:ring-[#D6BBFB] transition-all   duration-300 ease-in text-base text-[#2E2F33] px-3"
                        type="text"
                        name="expirationDate"
                        value={cardData.expirationDate}
                        onChange={handleInputChange}
                        placeholder="Exp. date"
                        maxLength="5"
                      />
                      {errors.expirationDate && (
                        <span className="error">{errors.expirationDate}</span>
                      )}
                    </div>

                    <div className="col-span-1">
                      <input
                        type="text"
                        name="cvv"
                        value={cardData.cvv}
                        onChange={handleInputChange}
                        placeholder="CVV"
                        className="border rounded-full h-16 w-full outline-0 focus:shadow-lg shadow-[#D6BBFB] drop-shadow-sm  border-gray-200  focus:outline-none focus:border-[#D6BBFB] focus:ring-2 focus:ring-[#D6BBFB] transition-all   duration-300 ease-in text-base text-[#2E2F33] px-3"
                        maxLength="4"
                      />
                      {errors.cvv && (
                        <span className="error">{errors.cvv}</span>
                      )}
                    </div>

                    <div className=" col-span-2">
                      <input
                        className="border rounded-full h-16 w-full outline-0 focus:shadow-lg shadow-[#D6BBFB] drop-shadow-sm  border-gray-200  focus:outline-none focus:border-[#D6BBFB] focus:ring-2 focus:ring-[#D6BBFB] transition-all   duration-300 ease-in text-base text-[#2E2F33] px-3"
                        type="text"
                        name="cardholderName"
                        value={cardData.cardholderName}
                        onChange={handleInputChange}
                        placeholder="Name on Card"
                      />
                      {errors.cardholderName && (
                        <span className="error">{errors.cardholderName}</span>
                      )}
                    </div>
                  </form>
                  <div className=" flex gap-2">
                    <input
                      type="checkbox"
                      name=""
                      className="h-6 w-6  text-[#897FE1] bg-[#897FE1] border-gray-300 rounded-sm focus:ring-[#897FE1] dark:focus:border-[#897FE1] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      id=""
                    />
                    <p className="text-[#5F6980] font-normal text-base">
                      Use shipping address as billing address
                    </p>
                  </div>
                </div>
                <div className="p-4 md:w-3/4 w-full space-y-6   mx-auto gap-1">
                  <h3 className="text-xl  font-semibold text-[#5F6980]">
                    Remember me
                  </h3>
                  <div className=" flex ">
                    <input
                      type="checkbox"
                      name=""
                      className="h-6 w-6  text-[#897FE1] bg-[#897FE1] border-gray-300 rounded-sm focus:ring-[#897FE1] dark:focus:border-[#897FE1] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      id=""
                    />
                    <p className="text-[#5F6980] font-normal text-base">
                      Save my information for faster checkout
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCheckoutPhase("confirmed");
                  }}
                  type="submit"
                  className="  w-full  h-14 bg-[#7C71DF] text-white py-2 absolute text-center    bottom-0 hover:bg-[#6b63d0] transition"
                >
                  Pay Now
                </button>
              </>
            )}
            {checkoutPhase === "confirmed" && (
              <>
                <div className="md:w-3/4 w-full  p-4 space-y-11   mx-auto">
                  <div>
                    <img className="m-auto" src={confirmed} alt="" />
                    <p className=" font-medium text-2xl text-center text-[#2E2F33]">
                      Your Order is Confirmed!
                    </p>
                    <p className="text-[#2E2F33] text-base text-center">
                      Thank you for shopping with us! Your beautiful new
                      furniture is on its way and will be with you soon. Get
                      ready to transform your space!
                    </p>
                  </div>
                  <div>
                    <button
                      type="submit"
                      onClick={() => {
                        setShowCart(false);
                        setCheckoutPhase("cart");
                      }}
                      className="  w-full  h-14 bg-[#7C71DF] text-white py-2  text-center rounded-[18rem] hover:bg-[#6b63d0] transition"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CartPage;
