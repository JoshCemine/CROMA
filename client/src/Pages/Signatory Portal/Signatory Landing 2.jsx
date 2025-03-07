import React from 'react';
import {useNavigate} from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import NavBar from '../../Components/Navigation Bar/NavBar Signatory';
import { useState, useEffect } from 'react';
import axios from 'axios'
import './Signatory Landing.css';

import TableComponent from '../../Components/Table/Table';

import AdminApproveModal from '../../Components/Modal/View Modal - Admin Approve';
import ConfirmApprove from '../../Components/Modal/Approve Confirmation';


const SignatoryLanding = ({children}) => {


    const [formData, setFormData] = useState([]);
    const [tablesData, setTableData] = useState([]);
    const [selected, setSelected] = useState(0);
    const [documentDetails, setDocumentDetails] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [count, SetCount] = useState(0);

    const [isConfirmOpen, setConfirmOpen] = useState(false);
    const [id, setID] = useState(0);

    useEffect (() =>{
        const fetchTable = async ()=>{
            try{
                const response = await axios.get('https://ec2-3-26-217-82.ap-southeast-2.compute.amazonaws.com:5000/signatory_api/transactions/' + 5, {credentials: 'same-origin'})
                console.log(response.data)
                setTableData(response.data)
                SetCount(response.data.length)
                // setNumTransactions(response.data.length)
            }
            catch(err){
    
            }
        }
        fetchTable()
        }, [])
    
    async function viewDocumentDetails(id) {
        const response = await axios.get("https://ec2-3-26-217-82.ap-southeast-2.compute.amazonaws.com:5000/student_api/transaction_details/" + id.toString())
        if (response){
            setDocumentDetails(response.data[0])
            console.log(documentDetails)
            setIsOpen(true)
        }
    }

    async function addNotif(id,message) {
        const response = await axios.post("https://ec2-3-26-217-82.ap-southeast-2.compute.amazonaws.com:50000/notification_api/new",{
            user_id: id,
            notification_body: message,
        })
        if (response){
            console.log(response)
        }
    }
    
    const approveClickHandler = (data) => {
        setID(data)
        viewDocumentDetails(data)
    }

    const openConfirmationModal = () => {
        setConfirmOpen(true)
    }

    const approveTransaction = (data) => {
        approveUpdate(documentDetails.transaction_id)
        const msg = "Your request for " + documentDetails.form_name + " has been approved by signatory: Test Signatory 2."
        window.location.reload()
        addNotif(documentDetails.user_id, msg)
    }

    async function approveUpdate(id) {
        const response = axios.put("https://ec2-3-26-217-82.ap-southeast-2.compute.amazonaws.com:5000/signatory_api/approvetemp/" + id.toString(), {
        })
        addTracking(id)
        if (response){
            console.log(response)
        }
    }


    async function addTracking(id) {
        const response = await axios.post("https://ec2-3-26-217-82.ap-southeast-2.compute.amazonaws.com:5000/tracking_api/update",{
            transaction_id: id,
            tracking_status: "Your request has been approved by signatory: Test Signatory 2.",
        })
    }

    return(
        <div>
            <NavBar/>
            <NavBar/>
            <div className="header-signatory">
                <Header/>
            </div>

            <div className='signatory-container'>
                <div className="name-header-admin">
                    Hello, Test Signatory 2!
                </div>
                <div className="transaction-header">
                    There {(count === 1) ? "is" : "are"} currently&nbsp;<span style={{fontWeight: '700'}}>{count} {(count === 1) ? "transaction" : "transactions"} </span>waiting to be approved.       
                </div>
                <div className='title-text-admin'>Waiting Approval</div>
                <div className='signatory-transactions-table-container'>
                    <TableComponent
                        type = 'signatory_transaction_table_1'
                        headingColumns = {[
                            "Date",
                            "Transaction Name",
                            "Student Name",
                            "Degree Program",
                            "Approved by",
                            "Action",
                        ]}
                        tableData = {tablesData}
                        action = {approveClickHandler}
                        // setID = {setSelected}
                    />
                    {isOpen && <AdminApproveModal data={documentDetails} setIsOpen={setIsOpen} action={openConfirmationModal}/>}
                    {isConfirmOpen && <ConfirmApprove setIsOpen={setConfirmOpen} action={approveTransaction}/>}
                    
                </div>
            </div>

            <div className="footer-signatory">
                <Footer/>
            </div>
        </div>
    )
}



export default SignatoryLanding;