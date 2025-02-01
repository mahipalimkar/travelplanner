import React from "react";
import { useParams } from "react-router-dom";

// Sample itinerary data
const itineraryDetails = {
  1: {
    title: "Beach Vacation in Hawaii",
    destination: "Hawaii",
    duration: "7 days",
    cost: "$2,500 per person",
    details: [
      "Day 1: Arrive in Honolulu, explore Waikiki Beach",
      "Day 2: Snorkeling at Hanauma Bay, sunset at Diamond Head",
      "Day 3: Visit Pearl Harbor and USS Arizona Memorial",
      "Day 4: Explore North Shore, try famous Hawaiian poke",
      "Day 5: Road trip to Maui, visit Haleakalā National Park",
      "Day 6: Relax at Lanikai Beach, go on a catamaran cruise",
      "Day 7: Shopping at Ala Moana Center, depart",
    ],
  },
  2: {
    title: "Cultural Trip to Japan",
    destination: "Japan",
    duration: "7 days",
    cost: "$2,000 per person",
    details: [
      "Day 1: Arrive in Tokyo, visit Shibuya Crossing and Akihabara",
      "Day 2: Explore Asakusa, Senso-ji Temple, and Ueno Park",
      "Day 3: Travel to Kyoto, visit Fushimi Inari Shrine",
      "Day 4: Explore Arashiyama Bamboo Forest and Kinkaku-ji",
      "Day 5: Day trip to Nara, feed deer in Nara Park",
      "Day 6: Return to Tokyo, shop in Ginza, enjoy sushi",
      "Day 7: Visit teamLab Borderless, depart",
    ],
  },
  3: {
    title: "Adventure in the Swiss Alps",
    destination: "Switzerland",
    duration: "7 days",
    cost: "$3,500 per person",
    details: [
      "Day 1: Arrive in Zurich, explore Old Town",
      "Day 2: Travel to Interlaken, hike Harder Kulm",
      "Day 3: Visit Jungfraujoch - Top of Europe",
      "Day 4: Explore Lauterbrunnen Valley, visit Trummelbach Falls",
      "Day 5: Skiing in Zermatt, see the Matterhorn",
      "Day 6: Take scenic train ride on Glacier Express",
      "Day 7: Depart from Zurich",
    ],
  },
  4: {
    title: "Spirituality in India",
    destination: "India",
    duration: "7 days",
    cost: "$1,200 per person",
    details: [
      "Day 1: Arrive in Delhi, visit India Gate and Lotus Temple",
      "Day 2: Travel to Varanasi, experience Ganga Aarti",
      "Day 3: Visit Sarnath, boat ride on the Ganges",
      "Day 4: Travel to Rishikesh, explore yoga retreats",
      "Day 5: Visit Haridwar, attend evening Aarti",
      "Day 6: Travel back to Delhi, explore Old Delhi markets",
      "Day 7: Depart",
    ],
  },
  5: {
    title: "Australian Getaway",
    destination: "Australia",
    duration: "7 days",
    cost: "$2,800 per person",
    details: [
      "Day 1: Arrive in Sydney, visit the Opera House",
      "Day 2: Explore Bondi Beach, ferry ride to Manly",
      "Day 3: Travel to Melbourne, visit Federation Square",
      "Day 4: Drive along Great Ocean Road",
      "Day 5: Visit the Blue Mountains, see Three Sisters",
      "Day 6: Explore the Great Barrier Reef",
      "Day 7: Depart from Sydney",
    ],
  },
  6: {
    title: "Peace in Panama",
    destination: "Panama",
    duration: "7 days",
    cost: "$1,800 per person",
    details: [
      "Day 1: Arrive in Panama City, explore Casco Viejo",
      "Day 2: Visit the Panama Canal",
      "Day 3: Beach day at San Blas Islands",
      "Day 4: Explore Soberanía National Park",
      "Day 5: Boat tour of Bocas del Toro",
      "Day 6: Visit El Valle de Antón",
      "Day 7: Depart",
    ],
  },
  7: {
    title: "Italian Grace",
    destination: "Italy",
    duration: "7 days",
    cost: "$2,500 per person",
    details: [
      "Day 1: Arrive in Rome, visit the Colosseum",
      "Day 2: Explore the Vatican Museums",
      "Day 3: Travel to Florence, visit Uffizi Gallery",
      "Day 4: Day trip to Pisa, see the Leaning Tower",
      "Day 5: Travel to Venice, gondola ride on Grand Canal",
      "Day 6: Explore Milan, visit Duomo Cathedral",
      "Day 7: Depart",
    ],
  },
  8: {
    title: "Egyptian Mystery",
    destination: "Egypt",
    duration: "7 days",
    cost: "$2,200 per person",
    details: [
      "Day 1: Arrive in Cairo, visit the Egyptian Museum",
      "Day 2: Explore the Pyramids of Giza and the Sphinx",
      "Day 3: Take a Nile River cruise to Luxor",
      "Day 4: Visit the Valley of the Kings",
      "Day 5: Explore Aswan, visit the Temple of Philae",
      "Day 6: Discover Abu Simbel Temples",
      "Day 7: Depart from Cairo",
    ],
  },
  9: {
    title: "Paradise of Indonesia",
    destination: "Indonesia",
    duration: "7 days",
    cost: "$1,700 per person",
    details: [
      "Day 1: Arrive in Bali, relax at Kuta Beach",
      "Day 2: Visit Ubud, explore rice terraces and monkey forest",
      "Day 3: Explore Tanah Lot and Uluwatu Temples",
      "Day 4: Snorkeling at Nusa Penida",
      "Day 5: Discover Mount Bromo and sunrise views",
      "Day 6: Experience Jakarta’s old town and street food",
      "Day 7: Depart from Bali",
    ],
  },
  10: {
    title: "Malaysian Escape",
    destination: "Malaysia",
    duration: "7 days",
    cost: "$1,500 per person",
    details: [
      "Day 1: Arrive in Kuala Lumpur, visit the Petronas Towers",
      "Day 2: Explore Batu Caves and Chinatown",
      "Day 3: Travel to Langkawi, relax on the beach",
      "Day 4: Island hopping and snorkeling in Langkawi",
      "Day 5: Explore Cameron Highlands, tea plantations",
      "Day 6: Visit Penang, explore George Town’s street art",
      "Day 7: Depart from Kuala Lumpur",
    ],
  },
};

export default itineraryDetails;