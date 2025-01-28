import React, { useState } from "react";
import backimg from "./assets/travel_login.jpg";
import { Link } from "react-router-dom";
import hotelData from "./hotel_data.json"; // Import the hotel data
import restaurantData from "./restaurant_data.json"; // Import the restaurant data

const Iternary = () => {
  // State for flight search
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tripType, setTripType] = useState("roundtrip");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleSearchFlights = (e) => {
    e.preventDefault();
    console.log(
      "Searching flights from:",
      from,
      "to:",
      to,
      "Trip type:",
      tripType,
      "Depart:",
      departDate,
      "Return:",
      returnDate
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-3/4 p-6 bg-white rounded-lg shadow-lg">
        {/* Image Section */}
        <div>
          <img
            src={backimg}
            alt="back"
            className="rounded-lg shadow-md mb-4 h-80 w-full object-cover"
          />
          <div className="flex items-center justify-between mt-4">
            <p className="text-3xl font-bold">New York</p>
            <Link to="/carbonfp">
              <button className="bg-green-500 text-white text-xl px-6 py-3 rounded hover:bg-green-600">
                Calculate carbon footprint
              </button>
            </Link>
          </div>
        </div>

        {/* Flight Search Box */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-3xl font-bold mb-4">Find Flights</h1>
          <form onSubmit={handleSearchFlights}>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="From"
                className="border border-gray-300 rounded p-2"
                required
              />
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="To"
                className="border border-gray-300 rounded p-2"
                required
              />
              <div className="flex items-center">
                <label className="mr-4">
                  <input
                    type="radio"
                    value="roundtrip"
                    checked={tripType === "roundtrip"}
                    onChange={() => setTripType("roundtrip")}
                  />
                  Roundtrip
                </label>
                <label>
                  <input
                    type="radio"
                    value="one-way"
                    checked={tripType === "one-way"}
                    onChange={() => setTripType("one-way")}
                  />
                  One-way
                </label>
              </div>
              <input
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                className="border border-gray-300 rounded p-2"
                required
              />
              {tripType === "roundtrip" && (
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="border border-gray-300 rounded p-2"
                  placeholder="Return Date"
                />
              )}
              <button
                type="submit"
                className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
              >
                Search Flights ✈️
              </button>
            </div>
          </form>
        </div>

        {/* Hotel Accommodation Heading */}
        <h1 className="text-3xl font-bold mb-4">Hotel Accommodation</h1>

        {/* Horizontal Flex Section for Hotel Cards */}
        <div className="flex flex-row gap-4 mb-6">
          {/* Loop through hotelData and generate the cards */}
          {hotelData.map((hotel, index) => (
            <div
              key={index}
              className="w-1/5 rounded overflow-hidden shadow-lg bg-gray-50"
            >
              <img
                className="w-full rounded-t-lg"
                src={hotel.image
                  .replace("{width}", "300")
                  .replace("{height}", "200")}
                alt={`Hotel ${index + 1}`}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{hotel.name}</div>
                <p className="text-gray-700 text-base">{hotel.address}</p>
                <p className="text-gray-700 text-base">
                  Rating: {hotel.rating}
                </p>
                <p className="text-gray-700 text-base">
                  Price Range: {hotel.priceRange}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* Restaurant Section */}
        <h1 className="text-3xl font-bold mb-4">Restaurant</h1>
        <div className="flex flex-row gap-4 mb-6">
          {/* Loop through restaurantData and generate the restaurant cards */}
          {restaurantData.map((restaurant, index) => (
            <div
              key={index}
              className="w-1/5 rounded overflow-hidden shadow-lg bg-gray-50"
            >
              <img
                className="w-full rounded-t-lg"
                src={
                  restaurant.image
                    ? restaurant.image
                        .replace(/\?w=\d+/g, "?w=300")
                        .replace(/\&h=\d+/g, "&h=200")
                    : ""
                }
                alt={`Restaurant ${index + 1}`}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{restaurant.name}</div>
                <p className="text-gray-700 text-base">
                  {restaurant.userReviewCount !== "N/A"
                    ? `${restaurant.userReviewCount} Reviews`
                    : "No reviews available"}
                </p>
                <p className="text-gray-700 text-base">
                  Rating:{" "}
                  {restaurant.averageRating === -1
                    ? "N/A"
                    : restaurant.averageRating}{" "}
                  / 5
                </p>
                {restaurant.menuUrl !== "N/A" && (
                  <a
                    href={restaurant.menuUrl}
                    className="text-purple-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Menu
                  </a>
                )}
              </div>
              <div className="px-6 pt-4 pb-2">
                {/* Display tags dynamically */}
                {restaurant.tags &&
                  restaurant.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >
                      #{tag}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Iternary;
