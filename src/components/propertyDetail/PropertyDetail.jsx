// Import React, useEffect, useState, useRef from 'react'
import React, { useEffect, useState, useRef } from 'react';
import classes from './propertyDetail.module.css'; // Import CSS modules styles
import person from '../../assets/person.jpeg'; // Import default profile image
import emailjs from '@emailjs/browser'; // Import emailjs for email functionality
import { useSelector } from 'react-redux'; // Import useSelector from react-redux for state management
import { AiOutlineClose } from 'react-icons/ai'; // Import AiOutlineClose icon from react-icons/ai
import { Link, useNavigate, useParams } from 'react-router-dom'; // Import Link, useNavigate, and useParams from react-router-dom for navigation
import { request } from '../../util/fetchAPI'; // Import request function from fetchAPI utility
import { FaBed, FaSquareFull } from 'react-icons/fa'; // Import FaBed and FaSquareFull icons from react-icons/fa
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs'; // Import BsBookmark and BsFillBookmarkFill icons from react-icons/bs

// Define PropertyDetail component
const PropertyDetail = () => {
  // Redux state variables
  const { token, user } = useSelector((state) => state.auth); // Select token and user from auth slice in redux store

  // State variables for property details, form visibility, description, bookmark status, success message, comments, and error handling
  const [propertyDetail, setPropertyDetail] = useState(null); // State for property details with initial value null
  const [showForm, setShowForm] = useState(false); // State for form visibility with initial value false
  const [desc, setDesc] = useState(''); // State for description with initial value empty string
  const [isBookmarked, setIsBookmarked] = useState(false); // State for bookmark status with initial value false
  const [success, setSuccess] = useState(false); // State for success message with initial value false
  const [commentText, setCommentText] = useState(''); // State for comment text with initial value empty string
  const [comments, setComments] = useState([]); // State for comments with initial value empty array
  const [error, setError] = useState(null); // State for error handling with initial value null

  const { id } = useParams(); // Get property id from URL parameters
  const formRef = useRef(); // Ref for the form element
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Fetch property details when component mounts or user ID changes
  useEffect(() => {
    // Function to fetch property details
    const fetchDetails = async () => {
      try {
        // Fetch property details from backend
        const data = await request(`/property/find/${id}`, 'GET');
        setIsBookmarked(data?.bookmarkedUsers?.includes(user?._id)); // Check if the user has bookmarked the property
        setPropertyDetail(data); // Update state with property details
      } catch (error) {
        console.error(error);
        setError('Failed to fetch property details'); // Set error state if fetching fails
      }
    };
    fetchDetails(); // Call the fetchDetails function
  }, [user?._id]); // Dependency array with user._id

  // Function to close the form
  const handleCloseForm = () => {
    setShowForm(false); // Hide the form
    setDesc(''); // Reset the description
  };
  const handleContactOwner = async (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_mjoebse', 'template_w5mthmm', formRef.current, '5T3Wb_hkHjKTOJDYQ')
      .then(
        (result) => {
          handleCloseForm();
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 2500);
        },
        (error) => {
          console.log(error.text);
          setError('Failed to send message'); // Set error state
        }
      );
  };

  const handleDelete = async () => {
    try {
      await request(`/property/${id}`, 'DELETE', { Authorization: `Bearer ${token}` });
      navigate('/');
    } catch (error) {
      console.log(error);
      setError('Failed to delete property');
    }
  };

  const handleBookmark = async () => {
    try {
      await request(`/property/bookmark/${id}`, 'PUT', { Authorization: `Bearer ${token}` });
      setIsBookmarked((prev) => !prev);
    } catch (error) {
      console.log(error);
      setError('Failed to update bookmark status');
    }
  };

  const handleComment = async () => {
    if (commentText.trim().length < 2) {
      setError('Comment must be at least 2 characters long');
      return;
    }

    try {
      const options = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const newComment = await request('/comment', 'POST', options, { text: commentText, listing: id });
      setComments((prev) => [newComment, ...prev]); 
      setCommentText(''); // Clear input
      setError(null); // Clear error state
    } catch (error) {
      console.log(error);
      setError('Failed to post comment');
    }
  };


  return (
    <div className={classes.container}>
      <h3 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '32px', marginTop: '-2.5rem' }}>Property Details</h3>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <img src={`http://localhost:5000/images/${propertyDetail?.img}`} alt='profile'/>
        </div>
        <div className={classes.right}>
          <h3 className={classes.title}>
            Title: {`${propertyDetail?.title}`}
            {user?._id === propertyDetail?.currentOwner?._id && (
              <div className={classes.controls}>
                <Link to={`/editProperty/${id}`}>Edit</Link>
                <button onClick={handleDelete}>Delete</button>
              </div>)
            }
          </h3>
          <div className={classes.details}>
            <div className={classes.typeAndContinent}>
              <div>Type: <span>{`${propertyDetail?.type}`}</span></div>
              <div>Continent: <span>{`${propertyDetail?.continent}`}</span></div>
            </div>
            <div className={classes.priceAndOwner}>
              <span className={classes.price}><span>Price: $ </span>{`${propertyDetail?.price}`}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                Owner: {propertyDetail?.currentOwner?.profileImg
                  ? (
                    <img src={`http://localhost:5000/images/${propertyDetail?.currentOwner?.profileImg}`} className={classes.owner} alt='profile'/>
                  ) : (
                    <img src={person} className={classes.owner} alt='profile'/>)
                }</span>
            </div>
            <div className={classes.moreDetails}>
              <span>{propertyDetail?.beds} <FaBed className={classes.icon} /></span>
              <span>{propertyDetail?.sqmeters} square meters <FaSquareFull className={classes.icon} /></span>
            </div>
          </div>
          <p className={classes.desc}>
            Desc: <span>{`${propertyDetail?.desc}`}</span>
          </p>
          {user?._id != null && (user?._id !== propertyDetail?.currentOwner?._id.toString()) &&
            <div className={classes.contactBookmarkControls}>
              <button onClick={() => setShowForm(true)} className={classes.contactOwner}>
                Contact owner
              </button>
              <span onClick={handleBookmark}>
                {isBookmarked ? (
                  <BsFillBookmarkFill size={20} />
                ) : (
                  <BsBookmark size={20} />
                )}
              </span>
            </div>
          }
          {user?._id == null && (
            <Link to={`/signin`}>
              <h4 className={classes.noFuncMessage}>
                Sign in to get access to the functionality.
              </h4>
            </Link>
          )
          }
        </div>
      </div>
      {
        showForm &&
        <div className={classes.contactForm} onClick={handleCloseForm}>
          <div className={classes.contactFormWrapper} onClick={(e) => e.stopPropagation()}>
            <h2>Send Email To Owner</h2>
            <form onSubmit={handleContactOwner} ref={formRef}>
              <input value={user?.email} type="text" placeholder='My email' name="from_email" />
              <input value={user?.username} type="text" placeholder='My username' name="from_username" />
              <input value={propertyDetail?.currentOwner?.email} type="email" placeholder='Owner email' name="to_email" />
              <input value={desc} type="text" placeholder='Desc' name="message" onChange={(e) => setDesc(e.target.value)} />
              <button>Send</button>
            </form>
            <AiOutlineClose onClick={handleCloseForm} className={classes.removeIcon} />
          </div>
        </div>
      }
      {success && (
        <div className={classes.success}>
          You've successfully contacted the owner of the yacht!
        </div>
      )}
     
      <div className={classes.commentSection}>
        {/* comment input */}
        {user?._id == null && <h3 style={{margin: '0.75rem', fontSize: '24px'}}>Sign in to be able to comment!</h3>}
        {user?._id != null && <div className={classes.commentInput}>
          <img src={`http://localhost:5000/images/${user?.profileImg}`} alt='profile' />
          <input value={commentText} type="text" placeholder='Type message...' onChange={(e) => setCommentText(e.target.value)} />
          <button onClick={handleComment}>Post</button>
        </div>}
        {/* displaying comments */}
        <div className={classes.commentSection}>
  {/* comment input */}
  {user?._id == null && <h3 style={{margin: '0.75rem', fontSize: '24px'}}>Sign in to be able to comment!</h3>}
  {user?._id != null && <div className={classes.commentInput}>
    <img src={`http://localhost:5000/images/${user?.profileImg}`} alt='profile' />
    <input value={commentText} type="text" placeholder='Type message...' onChange={(e) => setCommentText(e.target.value)} />
    <button onClick={handleComment}>Post</button>
  </div>}
  {/* displaying comments */}
  <div className={classes.comments}>
    {
      // Remove the code here
    }
  </div>
</div>

        <div className={classes.comments}>
          {
           
          }
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail;