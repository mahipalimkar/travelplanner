import React, { useState, useEffect } from "react";
import backimg from "./assets/travel_login.jpg";
import { Link } from "react-router-dom";
import hotelData from "./hotel_data.json"; // Import the hotel data
import restaurantData from "./restaurant_data.json"; // Import the restaurant data
// 
const Iternary = () => {
  // State for flight search
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tripType, setTripType] = useState("roundtrip");
  const [tripClass, setTripClass] = useState("economy");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // States for hotel and restaurant data from localStorage or default data
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  // Effect to retrieve top5 hotels and restaurants from localStorage on mount
  useEffect(() => {
    const savedHotels = JSON.parse(localStorage.getItem("top5Hotels"));
    const savedRestaurants = JSON.parse(
      localStorage.getItem("top5Restaurants")
    );
    console.log(savedRestaurants)
console.log(savedHotels);
    if (savedHotels && savedHotels.length > 0) {
      setHotels(savedHotels);
    } else {
      setHotels(hotelData.slice(0, 5)); // Default to top 5 from hotelData
    }

    if (savedRestaurants && savedRestaurants.length > 0) {
      setRestaurants(savedRestaurants);
    } else {
      setRestaurants(restaurantData.slice(0, 5)); // Default to top 5 from restaurantData
    }
  }, []);

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
          <h1 className="text-3xl font-bold mb-4">Book Flights now !</h1>
          <button
            onClick={() => window.open("https://www.booking.com", "_blank")}
            className="bg-blue-500 text-white text-xl px-6 py-3 rounded hover:bg-blue-600"
          >
            Book Flights
          </button>
        </div>

        {/* Hotel Accommodation Heading */}
        <h1 className="text-3xl font-bold mb-4">Hotel Accommodation</h1>

        {/* Horizontal Flex Section for Hotel Cards */}
        <div className="flex flex-row gap-4 mb-6">
          {/* Loop through hotel data and generate the cards */}
          {hotels.map((hotel, index) => (
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
          {/* Loop through restaurant data and generate the restaurant cards */}
          {restaurants.map((restaurant, index) => (
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
