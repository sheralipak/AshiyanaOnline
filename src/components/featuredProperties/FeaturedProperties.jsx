import React from 'react'; // Import React library for JSX syntax
import { useEffect, useState } from 'react'; // Import useEffect and useState hooks for state management and side effects
import { request } from "../../util/fetchAPI"; // Import request function for API calls
import { Link } from "react-router-dom"; // Import Link component for navigation
import classes from './featuredProperties.module.css'; // Import CSS modules styles
import img from '../../assets/estate.jpeg'; // Import image asset
import person from '../../assets/person.jpeg'; // Import image asset
import { FaBed, FaSquareFull } from "react-icons/fa"; // Import icons from react-icons library

const FeaturedProperties = () => {
    // State for featured properties
    const [featuredProperties, setFeaturedProperties] = useState([]);

    useEffect(() => {
        // Fetch featured properties on component mount
        const fetchFeatured = async () => {
            try {
                // Fetch featured properties from the server
                const data = await request('/property/find/featured', 'GET');
                // Update state with fetched data
                setFeaturedProperties(data);
            } catch (error) {
                console.error(error.message); // Log any errors
            }
        };

        fetchFeatured(); // Call the fetchFeatured function
    }, []); // Run effect only once on component mount

    // Log featured properties to the console
    console.log(featuredProperties);

    return (
        <div className={classes.container}> {/* Container for featured properties */}
            <div className={classes.wrapper}> {/* Wrapper for layout */}
                <div className={classes.titles}> {/* Titles section */}
                    <h5>Properties you may like</h5> {/* Subtitle */}
                    <h2>Featured Properties</h2> {/* Main title */}
                </div>
                <div className={classes.featuredProperties}> {/* Container for featured properties */}
                    {/* Map through featured properties */}
                    {featuredProperties?.map((property) => (
                        <div key={property._id} className={classes.featuredProperty}> {/* Individual featured property */}
                            <Link to={`/propertyDetails/${property._id}`}> {/* Link to property details */}
                                <img src={img} alt='featureimg' /> {/* Property image */}
                            </Link>
                            <div className={classes.details}> {/* Property details */}
                                <div className={classes.priceAndOwner}> {/* Price and owner */}
                                    <span className={classes.price}>$ {property?.price}</span> {/* Property price */}
                                    <img src={person} className={classes.owner} alt='owner' /> {/* Owner image */}
                                </div>
                                <div className={classes.moreDetails}> {/* More details */}
                                    <span>{property?.beds} beds <FaBed className={classes.icon} /></span> {/* Number of beds */}
                                    <span>{property?.sqmeters} square meters <FaSquareFull className={classes.icon} /></span> {/* Square meters */}
                                </div>
                                <div className={classes.desc}> {/* Property description */}
                                    {property?.desc} {/* Description text */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedProperties; // Export FeaturedProperties component
