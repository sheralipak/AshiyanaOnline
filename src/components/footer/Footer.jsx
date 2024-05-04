import React from 'react'; // Import React library for JSX syntax
import classes from './footer.module.css'; // Import CSS modules styles

const Footer = () => {
  return (
    <footer> {/* Footer section */}
      <div className={classes.wrapper}> {/* Wrapper for footer content */}
        {/* Column 1: About the App */}
        <div className={classes.col}> {/* Column */}
          <h2>About the App</h2> {/* Title */}
          <p>
            {/* App description */}
            Discover your perfect abode with AshiyanaOnline, where your dream home is just a click away. Explore a diverse range of properties, from cozy apartments to luxurious estates, tailored to meet your every need. With our intuitive platform, finding your ideal space has never been easier. Welcome to AshiyanaOnline – where home begins.
          </p>
        </div>
        {/* Column 2: Contacts */}
        <div className={classes.col}> {/* Column */}
          <h2>Contacts</h2> {/* Title */}
          {/* Contact details */}
          <span>Phone: +92 302 9559077</span> {/* Phone number */}
          <span>Facebook: AshiyanaOnline/fb</span> {/* Facebook page */}
          <span>Gmail: ashiyanaonline@gmail.com</span> {/* Email */}
        </div>
        {/* Column 3: Head Office */}
        <div className={classes.col}> {/* Column */}
          <h2>Head Office</h2> {/* Title */}
          {/* Office details */}
          <span>City: Lahore</span> {/* City */}
          <span>Address: 13-Raiwind Road, Lahore</span> {/* Address */}
        </div>
      </div>
    </footer>
  );
};

export default Footer; // Export Footer component
