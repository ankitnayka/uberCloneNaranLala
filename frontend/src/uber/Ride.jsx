import React from "react";

const Ride = () => {
  return (
    <div className="mx-8 flex">
      <div className="my-8 flex flex-col md:w-1/2 ">
        <h1 className="text-4xl font-bold ">
          Request a ride for now or later
        </h1>
        <p className="text-md text-gray-600">
          add your trip details ,hpo in , and go{" "}
        </p>

        <input
          type="text"
          className="bg-gray-200 p-2 w-2/3 rounded-md my-2"
          placeholder="Enter location"
        />
        <input
          type="text"
          className="bg-gray-200 p-2 w-2/3 rounded-md mb-2"
          placeholder="Enter destinatin"
        />
        <button className="bg-black text-lg w-28 text-white p-1 font-mono rounded-xl">
          {" "}
          see price
        </button>
        
      </div>
      <div className="hidden md:inline md:w-1/2 my-8 px-8  ">
     
            <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_576,w_576/v1684887108/assets/76/baf1ea-385a-408c-846b-59211086196c/original/u4b-square.png" alt=""  className="w-full h-full  shadow-xl rouned h-64 object-contain  transform transition-transform duration-300 ease-in-out hover:-translate-y-2 " />
    
      </div>
    </div>
  );
};

export default Ride;
