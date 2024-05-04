import React, { useState, useEffect } from 'react';
import classes from './navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai';
import { BsHouseDoor } from 'react-icons/bs';
import { logout } from '../../redux/authSlice';
import { request } from '../../util/fetchAPI';
import { v4 as uuidv4 } from 'uuid'; // Import for unique filenames

const Navbar = () => {
  const [state, setState] = useState({});
  const [photo, setPhoto] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Set default country and city in the listing form
    setState((prev) => ({ ...prev, country: 'Pakistan', city: 'Lahore' })); 
  }, []);

  // Mobile navigation state
  const [showMobileNav, setShowMobileNav] = useState(false);

  // Manage scroll behavior and styling
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null); // Clean up listener 
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  const handleState = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setPhoto(null);
    setState({});
  };

  const handleListProperty = async (e) => {
    e.preventDefault();

    let filename = null;
    if (photo) {
      const formData = new FormData();
      filename = uuidv4() + photo.name; // Generate unique filename
      formData.append('filename', filename);
      formData.append('image', photo);

      const options = { Authorization: `Bearer ${token}` };
      await request('/upload/image', 'POST', options, formData, true); 
    } else {
      setError(true); 
      setTimeout(() => setError(false), 2500);
      return;
    }

    try {
      // Ensure all form fields have values
      if (Object.values(state).some((v) => !v) && Object.values(state).length < 7) {
        setError(true); 
        setTimeout(() => setError(false), 2500);
        return;
      }

      const options = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
      const newProperty = await request('/property', 'POST', options, { ...state, img: filename });

      setShowModal(false); // Hide modal
      setShowForm(false); // Hide form
      navigate(`/propertyDetail/${newProperty._id}`); // Navigate to the new property
    } catch (error) {
      setError(true); 
      setTimeout(() => setError(false), 2500);
    }
  };

  return (
    <div className={`${classes.container} ${isScrolled && classes.scrolled}`}>
      <div className={classes.wrapper}>
        {/* Navbar Brand and Home Link */}
        <Link to='/' onClick={scrollToTop} className={classes.left}>
          Ashiyana Online <BsHouseDoor />
        </Link>

        {/* Desktop Navigation */}
        <ul className={classes.center}>
          <li onClick={scrollToTop} className={classes.listItem}>
            Home
          </li>
          <li className={classes.listItem}>
            About
          </li>
          <li className={classes.listItem}>
            Featured
          </li>
          <li className={classes.listItem}>
            Contacts
          </li>
        </ul>

        {/* Desktop User Actions */}
        <div className={classes.right}>
          {!user ? (
            <>
              <Link to='/signup'>Sign up</Link>
              <Link to='/signin'>Sign in</Link>
            </>
          ) : (
            <>
              {/* User menu and modal */}
              <span className={classes.username} onClick={() => setShowModal((prev) => !prev)}>
                Hello {user.username}!
              </span>
              {showModal && (
                <div className={classes.userModal}>
                  <AiOutlineClose onClick={() => setShowModal((prev) => !prev)} className={classes.userModalClose} />
                  <span className={classes.logoutBtn} onClick={handleLogout}>
                    Logout
                  </span>
                  <Link to={`/my-profile`} className={classes.myProfile}>
                    My Profile
                  </Link>
                  <Link onClick={() => setShowForm(true)} className={classes.list}>
                    List your property
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={classes.mobileNav}>
        {/* Hamburger menu */}
        {!showMobileNav && <GiHamburgerMenu onClick={() => setShowMobileNav((prev) => !prev)} className={classes.hamburgerIcon} />} 

        {showMobileNav && (
          <div className={classes.navigation}>
            <Link to='/' onClick={scrollToTop} className={classes.left}>
              Ashiyana Online <BsHouseDoor />
            </Link>
            <AiOutlineClose className={classes.mobileCloseIcon} onClick={() => setShowMobileNav(false)} />
            {/* Mobile navigation links */}
            <ul className={classes.center}>
              <li onClick={scrollToTop} className={classes.listItem}>
                Home
              </li>
              <li className={classes.listItem}>
                About
              </li>
              <li className={classes.listItem}>
                Featured
              </li>
              <li className={classes.listItem}>
                Contacts
              </li>
            </ul>
            {/* Mobile user actions */}
            <div className={classes.right}>
              {!user ? (
                <>
                  <Link to='/signup'>Sign up</Link>
                  <Link to='/signin'>Sign in</Link>
                </>
              ) : (
                <>
                  <span>Hello {user.username}!</span>
                  <span className={classes.logoutBtn} onClick={handleLogout}>
                    Logout
                  </span>
                  <Link onClick={() => setShowForm(true)} className={classes.list}>
                    List your property
                  </Link>
                </>
              )}
            </div>

             {/* Property Listing Form */}
            {showForm && (
              <div className={classes.listPropertyForm} onClick={handleCloseForm}> 
                <div className={classes.listPropertyWrapper} onClick={(e) => e.stopPropagation()}>
                  <h2>List Property</h2>
                  <form onSubmit={handleListProperty}>
                    {/* Form fields (implementation needed) */}
                    <button>List property</button>
                  </form>
                  <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon} />
                </div>
              </div>
            )} 
          </div>
        )}
      </div>
       
      {error && (
        <div className={classes.error}>
          <span>All fields must be filled!</span>
        </div>
      )} 
    </div>
  );
};

export default Navbar;
