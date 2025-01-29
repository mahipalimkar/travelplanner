import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import axios from "axios";

const Input = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [budget, setBudget] = useState("");
  const [travelMode, setTravelMode] = useState(null);

  const navigate = useNavigate();

  const travelModes = [
    { value: "couple", label: "Couple" },
    { value: "family", label: "Family-friendly" },
    { value: "friends", label: "Friends trip" },
    { value: "solo", label: "Solo" },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      source &&
      destination &&
      startDate &&
      endDate &&
      numberOfPeople > 0 &&
      budget &&
      travelMode
    ) {
      try {
        // First API call to get geoId
        // const response = await axios.get(
        //   "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation",
        //   {
        //     params: { query: destination },
        //     headers: {
        //       "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
        //       "X-RapidAPI-Key":
        //         "70d8f8a70emsh88a1a49ef21731dp199368jsn5b73ab433969", // Replace with your actual RapidAPI key
        //     },
        //   }
        // );

        // const firstGeoId = response.data.data[0]?.geoId;
        // if (!firstGeoId) {
        //   console.log("No geoId found for the destination.");
        //   return;
        // }
        // else{
        //   console.log(firstGeoId);
        // }
        const firstGeoId=304554;
        // Second API call to fetch hotels
        // const hotelResponse = await axios.get(
        //   "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels",
        //   {
        //     params: {
        //       geoId: firstGeoId,
        //       checkIn: startDate.toISOString().split("T")[0],
        //       checkOut: endDate.toISOString().split("T")[0],
        //       adults: numberOfPeople,
        //       pageNumber: 1,
        //       currencyCode: "USD",
        //     },
        //     headers: {
        //       "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
        //       "X-RapidAPI-Key":
        //         "70d8f8a70emsh88a1a49ef21731dp199368jsn5b73ab433969", // Replace with your actual RapidAPI key
        //     },
        //   }
        // );

        // const top5Hotels = hotelResponse.data.data.data
        //   .slice(0, 5)
        //   .map((hotel) => ({
        //     name: hotel.title,
        //     address: hotel.secondaryInfo,
        //     rating: hotel.bubbleRating?.rating || "N/A",
        //     priceRange: hotel.priceForDisplay || "N/A",
        //     image: hotel.cardPhotos?.[0]?.sizes?.urlTemplate || "N/A",
        //   }));
        // console.log(top5Hotels)
        // Store top5Hotels in localStorage
        // localStorage.setItem("top5Hotels", JSON.stringify(top5Hotels));

        // Restaurant API call
        // const restaurantResponse = await axios.get(
        //   "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants",
        //   {
        //     params: { locationId: firstGeoId },
        //     headers: {
        //       "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
        //       "X-RapidAPI-Key":
        //         "70d8f8a70emsh88a1a49ef21731dp199368jsn5b73ab433969", // Replace with your actual RapidAPI key
        //     },
        //   }
        // );

        // const top5Restaurants = restaurantResponse.data.data.data
        //   .slice(0, 5)
        //   .map((restaurant) => ({
        //     name: restaurant.name,
        //     averageRating: restaurant.averageRating || "N/A",
        //     userReviewCount: restaurant.userReviewCount || "N/A",
        //     menuUrl: restaurant.menuUrl || "N/A",
        //     image: restaurant.heroImgUrl || "N/A",
        //   }));
        //   console.log(top5Restaurants)
        // // Store top5Restaurants in localStorage
        // localStorage.setItem(
        //   "top5Restaurants",
        //   JSON.stringify(top5Restaurants)
        // );

        // Navigate to new itinerary page with data
        navigate("/newitinerary");
      } catch (error) {
        console.error("Error:", error.message);
        alert("An error occurred while fetching data. Please try again.");
      }
    } else {
      alert("Please fill all the fields before submitting.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Travel Input Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Source Field */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Source:</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Enter your source location"
          />
        </div>

        {/* Destination Field */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Destination:</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Enter your destination"
          />
        </div>

        {/* Date Pickers */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        {/* Number of People */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Number of People:</label>
          <input
            type="number"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            min="1"
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        {/* Budget Field */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Budget (INR):</label>
          <input
            type="text"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Enter your budget"
          />
        </div>

        {/* Travel Mode */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Travel Mode:</label>
          <Select
            value={travelMode}
            onChange={setTravelMode}
            options={travelModes}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Input;
