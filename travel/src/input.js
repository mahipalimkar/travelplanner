// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Select from "react-select";
// import axios from "axios";

// const Input = () => {
//   const [destination, setDestination] = useState("");
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [numberOfPeople, setNumberOfPeople] = useState(1);
//   const [budget, setBudget] = useState("");
//   const [travelMode, setTravelMode] = useState(null);

//   const navigate = useNavigate();

//   const travelModes = [
//     { value: "couple", label: "Couple" },
//     { value: "family", label: "Family-friendly" },
//     { value: "friends", label: "Friends trip" },
//     { value: "solo", label: "Solo" },
//   ];

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Check that required fields are filled
//     if (
//       destination &&
//       startDate &&
//       endDate &&
//       numberOfPeople > 0 &&
//       budget &&
//       travelMode
//     ) {
//       try {
//         // First API call to get geoId
//         const response = await axios.get(
//           "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation",
//           {
//             params: { query: destination },
//             headers: {
//               "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
//               "X-RapidAPI-Key":
//                 "d74615d303msh49fff3dd8ad4c89p1683e0jsn04b07dc27854", // Replace with your RapidAPI key
//             },
//           }
//         );

//         // Extract geoId from the first API call response
//         const firstGeoId = response.data.data[0]?.geoId;
//         if (!firstGeoId) {
//           console.log("No geoId found for the destination.");
//           return;
//         }

//         // Second API call to fetch hotels using geoId
//         const hotelResponse = await axios.get(
//           "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels",
//           {
//             params: {
//               geoId: firstGeoId,
//               checkIn: startDate.toISOString().split("T")[0], // Format start date
//               checkOut: endDate.toISOString().split("T")[0], // Format end date
//               adults: numberOfPeople,
//               pageNumber: 1,
//               currencyCode: "USD",
//             },
//             headers: {
//               "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
//               "X-RapidAPI-Key":
//                 "d74615d303msh49fff3dd8ad4c89p1683e0jsn04b07dc27854", // Replace with your RapidAPI key
//             },
//           }
//         );

//         // Extract and log the top 5 hotels
//         const top5Hotels = hotelResponse.data.data.data
//           .slice(0, 5)
//           .map((hotel) => ({
//             name: hotel.title,
//             address: hotel.secondaryInfo,
//             rating: hotel.bubbleRating?.rating || "N/A",
//             priceRange: hotel.priceForDisplay || "N/A",
//             image: hotel.cardPhotos?.[0]?.sizes?.urlTemplate || "N/A",
//           }));
//         console.log("Top 5 Hotels:", top5Hotels);
//           navigate("/newitinerary", { state: { top5Hotels } });
//         // Navigate to /newitinerary after the API calls
//         // navigate("/newitinerary");
//       } catch (error) {
//         console.error("Error:", error.message);
//         alert("An error occurred while fetching data. Please try again.");
//       }
//     } else {
//       alert("Please fill all the fields before submitting.");
//     }
//   };


//   return (
//     <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
//       <h1 className="text-2xl font-bold mb-4">Travel Input Form</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block mb-1 font-semibold">Destination:</label>
//           <input
//             type="text"
//             value={destination}
//             onChange={(e) => setDestination(e.target.value)}
//             className="border border-gray-300 rounded p-2 w-full"
//             placeholder="Enter your destination"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1 font-semibold">Start Date:</label>
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             className="border border-gray-300 rounded p-2 w-full"
//             dateFormat="MMMM d, yyyy"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1 font-semibold">End Date:</label>
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             className="border border-gray-300 rounded p-2 w-full"
//             dateFormat="MMMM d, yyyy"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1 font-semibold">Number of People:</label>
//           <input
//             type="number"
//             value={numberOfPeople}
//             onChange={(e) => setNumberOfPeople(e.target.value)}
//             className="border border-gray-300 rounded p-2 w-full"
//             min="1"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1 font-semibold">Budget (INR):</label>
//           <input
//             type="text"
//             value={budget}
//             onChange={(e) => setBudget(e.target.value)}
//             className="border border-gray-300 rounded p-2 w-full"
//             placeholder="Enter your budget"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1 font-semibold">Travel Mode:</label>
//           <Select
//             value={travelMode}
//             onChange={setTravelMode}
//             options={travelModes}
//             className="basic-single"
//             classNamePrefix="select"
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-500 text-white rounded p-2 w-full"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Input;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import axios from "axios";

const Input = () => {
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

    // Check that required fields are filled
    if (
      destination &&
      startDate &&
      endDate &&
      numberOfPeople > 0 &&
      budget &&
      travelMode
    ) {
      try {
        // First API call to get geoId
        const response = await axios.get(
          "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation",
          {
            params: { query: destination },
            headers: {
              "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
              "X-RapidAPI-Key":
                "d74615d303msh49fff3dd8ad4c89p1683e0jsn04b07dc27854", // Replace with your RapidAPI key
            },
          }
        );

        // Extract geoId from the first API call response
        const firstGeoId = response.data.data[0]?.geoId;
        if (!firstGeoId) {
          console.log("No geoId found for the destination.");
          return;
        }

        // Second API call to fetch hotels using geoId
        const hotelResponse = await axios.get(
          "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels",
          {
            params: {
              geoId: firstGeoId,
              checkIn: startDate.toISOString().split("T")[0], // Format start date
              checkOut: endDate.toISOString().split("T")[0], // Format end date
              adults: numberOfPeople,
              pageNumber: 1,
              currencyCode: "USD",
            },
            headers: {
              "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
              "X-RapidAPI-Key":
                "d74615d303msh49fff3dd8ad4c89p1683e0jsn04b07dc27854", // Replace with your RapidAPI key
            },
          }
        );

        // Extract and log the top 5 hotels
        const top5Hotels = hotelResponse.data.data.data
          .slice(0, 5)
          .map((hotel) => ({
            name: hotel.title,
            address: hotel.secondaryInfo,
            rating: hotel.bubbleRating?.rating || "N/A",
            priceRange: hotel.priceForDisplay || "N/A",
            image: hotel.cardPhotos?.[0]?.sizes?.urlTemplate || "N/A", // Extract the image URL
          }));
        console.log("Top 5 Hotels:", top5Hotels);

        // Restaurant API call
        const restaurantResponse = await axios.get(
          "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants",
          {
            params: {
              locationId: firstGeoId, // Replace with actual locationId
            },
            headers: {
              "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
              "X-RapidAPI-Key":
                "d74615d303msh49fff3dd8ad4c89p1683e0jsn04b07dc27854", // Replace with your RapidAPI key
            },
          }
        );

        // Extract top 5 restaurants, including image URLs
        const top5Restaurants = restaurantResponse.data.data.data
          .slice(0, 5) // Take only the top 5 restaurants
          .map((restaurant) => ({
            name: restaurant.name,
            averageRating: restaurant.averageRating || "N/A",
            userReviewCount: restaurant.userReviewCount || "N/A",
            menuUrl: restaurant.menuUrl || "N/A",
            image:
              restaurant.heroImgUrl || "N/A", // Extract image URL for each restaurant
          }));

        console.log("Top 5 Restaurants:", top5Restaurants);

        // Navigate to /newitinerary with top hotels and restaurants data
        navigate("/newitinerary", {
          state: { top5Hotels, top5Restaurants },
        });
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

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border border-gray-300 rounded p-2 w-full"
            dateFormat="MMMM d, yyyy"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="border border-gray-300 rounded p-2 w-full"
            dateFormat="MMMM d, yyyy"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Number of People:</label>
          <input
            type="number"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            min="1"
          />
        </div>

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

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Travel Mode:</label>
          <Select
            value={travelMode}
            onChange={setTravelMode}
            options={travelModes}
            className="basic-single"
            classNamePrefix="select"
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
