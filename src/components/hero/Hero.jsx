import React, { useState } from 'react'; // Import React library for JSX syntax and useState hook
import { AiOutlineSearch } from "react-icons/ai"; // Import search icon from react-icons
import classes from './hero.module.css'; // Import CSS modules styles

const Hero = () => {
  // State variables for city, country, and price range
  const [city, setCity] = useState("Lahore"); // State for city with initial value "Lahore"
  const [country, setCountry] = useState("Pakistan"); // State for country with initial value "Pakistan"
  const [priceRange, setPriceRange] = useState("0"); // State for price range with initial value "0"

  // Function to handle search
  const handleSearch = () => {
    // Logic for search functionality goes here
  };

  return (
    <div className={classes.container}> {/* Hero container */}
      <div className={classes.wrapper}> {/* Wrapper for hero content */}
        <h2>Find your dreams</h2> {/* Hero title */}
        <h5>Search for the best</h5> {/* Hero subtitle */}
        <div className={classes.options}> {/* Options section */}
          {/* Dropdown for city selection */}
          <select onChange={(e) => setCity(e.target.value)}>
            <option disabled>Select type</option>
            <option value="Lahore">Lahore</option>
            <option value="Karachi">Karachi</option>
            <option value="Islamabad">Islamabad</option>
          </select>
          {/* Dropdown for price range selection */}
          <select onChange={(e) => setPriceRange(e.target.value)}>
            <option disabled>Select Price Range</option>
            <option value="0">0-10,00,000</option>
            <option value="1">10,00,000-20,00,000</option>
            <option value="2">20,00,000-30,00,000</option>
            <option value="3">30,00,000-40,00,000</option>
            <option value="4">40,00,000-50,00,000</option>
          </select>
          {/* Dropdown for country selection */}
          <select onChange={(e) => setCountry(e.target.value)}>
            <option disabled>Select Country</option>
            <option value="0">Pakistan</option>
          </select>
          {/* Search button */}
          <button type="button" onClick={handleSearch}>
            <AiOutlineSearch className={classes.searchicon} /> {/* Search icon */}
            Find the perfect
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero; // Export Hero component
