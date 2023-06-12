import React from "react";
import "./Modal.css";
import { RiCloseLine } from "react-icons/ri";
import PDFdocument from "../PDF/PDF Document 1"
import axios from 'axios'
import { Buffer } from 'buffer'
import { useEffect, useState } from 'react'

function SignatoryApproveModal({
  data,
  setIsOpen,
  action,
  rejectAction
}) {
  console.log(data);

  const [file, setFile] = useState();

  const getImagevalue = async () => {
    const response = await axios.get('http://localhost:5000/form_api/get/' + data.transaction_id)
    console.log(response)
    setFile(Buffer.from(response.data[0].file.data))
  }

  useEffect(()=>{
    if(!file){
      getImagevalue()
    }
  },[])
  console.log(file)
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="admin-view-modal">
          <div className="view-modalHeader">
            <h5 className="view-heading">{data.form_name}</h5>
          </div>
          <button className="modal-close-button" onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          {(data.form_id == "1" || data.form_id == "2" || data.form_id == "3" || data.form_id == "17" || data.form_id == "21") ? 
          <div className="view-document-content">
          <PDFdocument docData={data} />
        </div>
        :
        <div className="view-document-content">
            
            {file && 
            // <Viewer fileUrl={`data:/application/pdf;base64,${file.toString('base64')}`} />}
            
            <embed src={`data:application/pdf;base64,${file.toString('base64')}#zoom=FitH`} width="100%" height="500" />
            }
          </div>
        }

          <div className="view-modalActions">
            <div className="view-modal-actionsContainer">
              <button className="reject-button" onClick={rejectAction}>
                Reject
              </button>
              <button className="approve-button" onClick={action}>
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default SignatoryApproveModal;