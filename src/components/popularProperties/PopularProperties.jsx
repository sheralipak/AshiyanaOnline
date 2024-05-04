// Import React, useState, useEffect, and Link from 'react'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import classes from './popularProperties.module.css'; // Import CSS modules styles
import img1 from '../../assets/lahore.jpeg'; // Import image for Lahore properties
import img2 from '../../assets/karachi.jpeg'; // Import image for Karachi properties
import img3 from '../../assets/islamabad.jpeg'; // Import image for Islamabad properties
import { request } from '../../util/fetchAPI'; // Import request function for API calls

const PopularProperties = () => {
  // State variables for property counts in different cities
  const [lahoreProperties, setLahoreProperties] = useState(0);
  const [karachiProperties, setKarachiProperties] = useState(0);
  const [islamabadProperties, setIslamabadProperties] = useState(0);

  // Fetch property counts for each city on component mount
  useEffect(() => {
    // Function to fetch property counts
    const fetchPropertiesNumber = async () => {
      try {
        // Fetch property counts from backend
        const data = await request('/property/find/countByCity', 'GET');
        console.log("Data from backend:", data); // Log data received from the backend

        // Update state with property counts for each city
        setLahoreProperties(data.Lahore);
        setKarachiProperties(data.Karachi);
        setIslamabadProperties(data.Islamabad);
      } catch (error) {
        console.error(error); // Log any errors that occur during fetching
      }
    };
    fetchPropertiesNumber(); // Call the fetchPropertiesNumber function
  }, []); // Dependency array to run effect only once on component mount

  return (
    // Container for popular properties section
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.titles}>
          <h5>Different types of properties</h5>
          <h2>Best type of properties for you</h2>
        </div>
        <div className={classes.properties}>
          {/* Link to view properties in Lahore */}
          <Link to={`/properties?city=Lahore&country=Pakistan&priceRange=1`} className={classes.property}>
            <img src={img1} alt='Lahore'/> {/* Image for Lahore properties */}
            <div className={classes.quantity}>{lahoreProperties} properties</div> {/* Number of Lahore properties */}
            <h5>Lahore properties</h5> {/* Title for Lahore properties */}
          </Link>
          {/* Link to view properties in Karachi */}
          <Link to={`/properties?city=Karachi&country=Pakistan&priceRange=1`} className={classes.property}>
            <img src={img2} alt='Karachi'/> {/* Image for Karachi properties */}
            <div className={classes.quantity}>{karachiProperties} properties</div> {/* Number of Karachi properties */}
            <h5>Karachi properties</h5> {/* Title for Karachi properties */}
          </Link>
          {/* Link to view properties in Islamabad */}
          <Link to={`/properties?city=Islamabad&country=Pakistan&priceRange=1`} className={classes.property}>
            <img src={img3} alt='Islamabad'/> {/* Image for Islamabad properties */}
            <div className={classes.quantity}>{islamabadProperties} properties</div> {/* Number of Islamabad properties */}
            <h5>Islamabad properties</h5> {/* Title for Islamabad properties */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularProperties; // Export the PopularProperties component
