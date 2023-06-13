import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import NavBar from '../../Components/Navigation Bar/NavBar Signatory';
import announcementIcon from '../../Assets/announcement-icon.svg';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import './Announcements.css';

const ViewAnnouncementPage = () => {
    const [announcementDetails, setAnnouncementDetails] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getAnnouncementDetails() {
            try {
                const response = await axios.get(`https://ec2-3-26-217-82.ap-southeast-2.compute.amazonaws.com:5000/announcement_api/view/${id}`);
                setAnnouncementDetails(response.data[0]);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getAnnouncementDetails();
    }, [id]);



    return (
        <div>
            <NavBar />
            <div className="announcements-header">
                <Header />
            </div>
            <Container>
                <div className="announcement-portal-header">
                    <img alt="announcement-portal-icon"
                        src={announcementIcon}
                        className="announcement-portal-icon"/>
                    <p className='announcement-portal-text'>{announcementDetails.announcement_title}</p>

                </div>
                <div className="announcement-date-container">
                    <div className="announcement-date-text">Date: {announcementDetails.announcement_date} {announcementDetails.announcement_time}</div>
                </div>
                <div className="announcement-details-container">
                    <div className="announcement-details-text">
                        {announcementDetails.announcement_body}
                    </div>
                </div>
                <div className="announcement-details-footer">
                    <a href="/signatory/announcements">RETURN</a>
                </div>
            </Container>

            <div className='footer-admin-announcement'>
                <Footer />
            </div>
        </div>
    )
}

export default ViewAnnouncementPage;
