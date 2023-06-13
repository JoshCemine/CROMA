import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import NavBar from '../../Components/Navigation Bar/NavBar Clerk';
import AnnouncementTableComponent from '../../Components/Table/Announcement Table';
import { useState, useEffect } from 'react';
import announcementIcon from '../../Assets/announcement-icon.svg';
import Container from 'react-bootstrap/Container';


import axios from 'axios'

import './Announcements.css';

const AnnouncementClerkPage = ({children}) => {

    const [announcementData, setAnnouncementData] = useState([]);


    useEffect (() =>{
        const fetchAllAnnouncement = async ()=>{
            const response = await axios.get('http://ec2-3-26-217-82.ap-southeast-2.compute.amazonaws.com:5000/announcement_api/details')
            setAnnouncementData(response.data)
        }
        fetchAllAnnouncement()
        }, [])


    console.log(announcementData)


    return(
        <div>
            <NavBar/>
            <div className="header-announcements-clerk">
                <Header/>
            </div>
            <Container>
                <div className="announcement-portal-header">
                    <img alt="announcement-portal-icon"
                        src={announcementIcon}
                        className="announcement-portal-icon"/>
                    <p className='announcement-portal-text'>Announcement</p>
                </div>
                <div className="student-announcement-table-container">
                    <AnnouncementTableComponent
                        type = 'clerk_announcement_table'
                        tableData = {announcementData}
                    />
                </div>
            </Container>
            

            <div className='footer-admin-announcement'>
                <Footer/> 
            </div>

        </div>
    )
}

export default AnnouncementClerkPage;