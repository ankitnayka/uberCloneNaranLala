import React from "react";

const suugestionList = [
  {
    title: "Couriers",
    desc: "Uber makes same-day item delivery easier than ever",
    img: "https://cn-geo1.uber.com/static/mobile-content/Courier.png",
  },
  {
    title: "Reserve",
    desc: "Reserve your ride in advance so you can relax on the day of your trip.",
    img: "https://mobile-content.uber.com/uber_reserve/reserve_clock.png",
  },
  {
    title: "Ride",
    desc: "UGo anywhere with Uber. Request a ride, hop in, and go.",
    img: "https://mobile-content.uber.com/launch-experience/ride.png"
  }
];



const Suggestions = () => {
  return (
    <>
      <h2 className="text-2xl text-center shadow:xl underline font-mono font-bold">Suggestions</h2>
      <div className="flex flex-col md:flex-row md:justify-evenly  items-center">
        {
          // suugestionList.length >0 ?
          suugestionList.map((suggestioncard,index) => (
            <SuggestionCard key={index} title={suggestioncard.title} img={suggestioncard.img} desc={suggestioncard.desc} />
          ))
        }
      </div>
    </>
  );
};

export default Suggestions;

const SuggestionCard = ({ title, desc,img }) => {
  return (
    <div className="bg-gray-100 mx-4 my-4 flex   mt-2 items-center rounded-2xl">
      <div className="w-2/3 p-4 md:p-8">
        <h1 className="font-semibold gap-4 text-xl">{title}</h1>
        <p className="my-2 text-wrap ">{desc}</p>

        <button className="bg-white p-2 rounded-xl">Details</button>
      </div>
      <div className="w-1/3 p-2">
        <img
          src={img}
          alt="corires-women"
          className="w-full  object-cover rounded-xl  shadow-xl rouned  object-contain  transform transition-transform duration-300 ease-in-out hover:-translate-y-2"
        />
      </div>
    </div>
  );
};
