// Import React and necessary components from react-router-dom and CSS file
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

// Import component files here
import FeaturedProperties from './components/featuredProperties/FeaturedProperties';
import Footer from './components/footer/Footer';
import Hero from './components/hero/Hero';
import Navbar from "./components/navbar/Navbar";
import PopularProperties from "./components/popularProperties/PopularProperties";
import Newsletter from "./components/newsletter/Newsletter";
import Signin from "./components/signin/Signin";
import Signup from "./components/signup/Signup";
import Properties from "./components/properties/Properties";
import MyProfile from "./components/MyProfile/MyProfile"; // Add import for MyProfile component
import PropertyDetail from './components/propertyDetail/PropertyDetail';

// Define the main App function component
function App() {
  return (
    // Render the main component container
    <div>
      {/* Define routes for different pages using the Routes component */}
      <Routes>
        {/* Route for the home page */}
        <Route path='/' element={
          // Render Navbar, Hero, PopularProperties, FeaturedProperties, Newsletter, and Footer components
          <>
            <Navbar />
            <Hero />
            <PopularProperties />
            <FeaturedProperties />
            <Newsletter />
            <Footer />
          </>
        } />

        {/* Route for the properties page */}
        <Route path='/properties' element={
          // Render Navbar, Properties, and Footer components
          <>
            <Navbar />
            <Properties />
            <Footer />
          </>
        } />

        {/* Route for the property detail page */}
        <Route path='/propertyDetail/:id' element={
          // Render Navbar, PropertyDetail, and Footer components
          <>
            <Navbar />
            <PropertyDetail/>
            <Footer />
          </>
        } />

        {/* Route for MyProfile component */}
        <Route path='/my-profile' element={<MyProfile />} />

        {/* Route for the signup page */}
        <Route path='/signup' element={<Signup />} />

        {/* Route for the signin page */}
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </div>
  );
}

// Export the App component as the default export
export default App;
