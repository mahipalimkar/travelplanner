import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
const apikey = "b3925f9af9msh77ac7225ac30bb9p1cd674jsnae2aa492fa1b";
const Input = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numPeople, setNumPeople] = useState(1);
  const [budget, setBudget] = useState("");
  const [travelMode, setTravelMode] = useState("");
  const [preferences, setPreferences] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const [weather, setWeather] = useState([]);
  const [citiesVisited, setCitiesVisited] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      source &&
      destination &&
      startDate &&
      endDate &&
      numPeople > 0 &&
      budget &&
      travelMode
    ) {
      try {
        const formData = {
          source,
          destination,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          numPeople,
          budget,
          travelMode,
          preferences,
        };

        const response = await axios.post(
          "http://localhost:5000/generate",
          formData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("API Response:", response.data);
        localStorage.setItem("travelData", JSON.stringify(response.data));
        // setItinerary(response.data.itinerary);
        // setWeather(response.data.weather);
        // setCitiesVisited(response.data.citiesVisited);
        const response2 = await axios.get(
          "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation",
          {
            params: { query: destination },
            headers: {
              "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
              "X-RapidAPI-Key": apikey,
            },
          }
        );

        const firstGeoId = response2.data.data[0]?.geoId;
        if (!firstGeoId) {
          console.log("No geoId found for the destination.");
          return;
        }

        // Fetch hotels using geoId
        const hotelResponse = await axios.get(
          "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels",
          {
            params: {
              geoId: firstGeoId,
              checkIn: startDate.toISOString().split("T")[0],
              checkOut: endDate.toISOString().split("T")[0],
              adults: numPeople,
              pageNumber: 1,
              currencyCode: "USD",
            },
            headers: {
              "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
              "X-RapidAPI-Key": apikey,
            },
          }
        );

        const top5Hotels = hotelResponse.data.data.data
          .slice(0, 5)
          .map((hotel) => ({
            name: hotel.title,
            address: hotel.secondaryInfo,
            rating: hotel.bubbleRating?.rating || "N/A",
            priceRange: hotel.priceForDisplay || "N/A",
            image: hotel.cardPhotos?.[0]?.sizes?.urlTemplate || "N/A",
          }));

        localStorage.setItem("top5Hotels", JSON.stringify(top5Hotels));

        // Fetch restaurants
        const restaurantResponse = await axios.get(
          "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants",
          {
            params: { locationId: firstGeoId },
            headers: {
              "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
              "X-RapidAPI-Key": apikey,
            },
          }
        );

        const top5Restaurants = restaurantResponse.data.data.data
          .slice(0, 5)
          .map((restaurant) => ({
            name: restaurant.name,
            averageRating: restaurant.averageRating || "N/A",
            userReviewCount: restaurant.userReviewCount || "N/A",
            menuUrl: restaurant.menuUrl || "N/A",
            image: restaurant.heroImgUrl || "N/A",
          }));

        localStorage.setItem(
          "top5Restaurants",
          JSON.stringify(top5Restaurants)
        );
        navigate("/newitinerary", {
          state: {
            top5Hotels,
            top5Restaurants,
            source,
            destination,
            startDate: startDate.toString(),
            endDate: endDate.toString(),
          },
        });
      } catch (error) {
        console.error("Error:", error.message);
        alert(
          "An error occurred while generating the itinerary. Please try again."
        );
      }
    } else {
      alert("Please fill all fields before submitting.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Travel Itinerary Planner</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Source:</label>
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
          className="border p-2 w-full mb-4"
        />

        <label className="block mb-2">Destination:</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
          className="border p-2 w-full mb-4"
        />

        <label className="block mb-2">Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={setStartDate}
          required
          className="border p-2 w-full mb-4"
        />

        <label className="block mb-2">End Date:</label>
        <DatePicker
          selected={endDate}
          onChange={setEndDate}
          required
          className="border p-2 w-full mb-4"
        />

        <label className="block mb-2">Number of People:</label>
        <input
          type="number"
          value={numPeople}
          onChange={(e) => setNumPeople(e.target.value)}
          min="1"
          required
          className="border p-2 w-full mb-4"
        />

        <label className="block mb-2">Budget:</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
          className="border p-2 w-full mb-4"
        />

        <label className="block mb-2">Travel Mode:</label>
        <div className="mb-4">
          <input
            type="radio"
            id="couple"
            name="travelMode"
            value="couple"
            onChange={(e) => setTravelMode(e.target.value)}
            required
          />
          <label htmlFor="couple" className="ml-2">
            Couple
          </label>
          <input
            type="radio"
            id="friend"
            name="travelMode"
            value="friend"
            onChange={(e) => setTravelMode(e.target.value)}
            className="ml-4"
            required
          />
          <label htmlFor="friend" className="ml-2">
            Friend
          </label>
        </div>

        <label className="block mb-2">Preferences:</label>
        <textarea
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          rows="4"
          className="border p-2 w-full mb-4"
        ></textarea>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          Generate Itinerary
        </button>
      </form>

      {/* {itinerary && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Generated Itinerary:</h2>
          <pre>{itinerary}</pre>
        </div>
      )} */}

      {/* {weather.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Weather Forecast:</h2>
          <table className="border w-full mt-2">
            <thead>
              <tr>
                <th className="border p-2">Location</th>
                <th className="border p-2">Condition</th>
                <th className="border p-2">High Temp (°C)</th>
                <th className="border p-2">Low Temp (°C)</th>
              </tr>
            </thead>
            <tbody>
              {weather.map((day, index) => (
                <tr key={index}>
                  <td className="border p-2">{day.location}</td>
                  <td className="border p-2">{day.condition}</td>
                  <td className="border p-2">{day.high_temp}</td>
                  <td className="border p-2">{day.low_temp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}

      {/* {citiesVisited.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Cities Visited:</h2>
          <ul>
            {citiesVisited.map((city, index) => (
              <li key={index}>{city}</li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default Input;
