import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { request } from '../../util/fetchAPI';
import person from '../../assets/person.jpeg';
import classes from './myProfile.module.css';
import { logout } from '../../redux/authSlice';

const MyProfile = () => {
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [listedProperties, setListedProperties] = useState([]);
    const [listedYachts, setListedYachts] = useState([]);
    const [bookmarkedProperties, setBookmarkedProperties] = useState([]);
    const [bookmarkedYachts, setBookmarkedYachts] = useState([]);
    const [activeBtn, setActiveBtn] = useState(0);
    const [deleteModal, setDeleteModal] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async (endpoint, setter) => {
            try {
                const options = {
                    Authorization: `Bearer ${token}`
                };
                const data = await request(endpoint, 'GET', options);
                setter(data);
            } catch (error) {
                console.error(error);
                setError(true);
            }
        };

        fetchData(`/property/find/my-properties`, setListedProperties);
        fetchData(`/property/find/bookmarked-properties`, setBookmarkedProperties);
    }, [token]);

    const handleDeleteProfile = async () => {
        try {
            const options = {
                Authorization: `Bearer ${token}`
            };
            await request(`/user/delete`, 'DELETE', options);
            dispatch(logout());
            navigate('/signin');
        } catch (error) {
            console.error(error);
            setError(true);
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                {/* Profile information */}
                <div className={classes.profile}>
                    {/* Update and delete controls */}
                    <div className={classes.updateDeleteControls}>
                        {/* Update Profile button */}
                        <Link className={classes.updateBtn} to={`/update-profile`}>Update Profile</Link>
                        {/* Delete Profile button */}
                        {deleteModal && (
                            <div className={classes.deleteModal}>
                                <button onClick={handleDeleteProfile}>Yes</button>
                                <button onClick={() => setDeleteModal(prev => !prev)}>No</button>
                            </div>
                        )}
                        <button onClick={() => setDeleteModal(prev => !prev)} className={classes.deleteBtn}>Delete Profile</button>
                    </div>
                    {/* User profile image */}
                    <img className={classes.userProfileImg} src={user?.profileImg ? `http://localhost:5000/images/${user?.profileImg}` : person} alt='Profilepic'/>
                    {/* User data */}
                    <div className={classes.userData}>
                        <h3>{user?.username}</h3>
                        <h4>{user?.email}</h4>
                    </div>
                </div>
                {/* Navigation buttons */}
                <div className={classes.buttons}>
                    {/* Render navigation buttons here */}
                </div>
                {/* Catalog section */}
                <div className={classes.catalog}>
                    {/* Render catalog items based on active button */}
                </div>
                {/* Error message */}
                {error && (
                    <div className={classes.error}>
                        There was an error!
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyProfile;
