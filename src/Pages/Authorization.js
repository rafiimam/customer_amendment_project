import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomNavbar from "./Navbar";
import '../styles/Authorization.css'
import { useParams } from "react-router-dom";
import '../styles/modal.css';
import DisplayFormData, { keyMessageMap } from "./DisplayFormData";

const AuthenticationPage = ({ handleLogout }) => {

  const [journalNumber, setJournalNumber] = useState("");
  const [journalData, setJournalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [reasonNote, setReasonNote] = useState(""); // New state for reasonNote
  const [showRejectModal, setShowRejectModal] = useState(false); // State to control modal visibility
  const {journalNumber: urlJournalNumber} = useParams();
  const [changedKeyValue, setChangedKeyValue] = useState({});

  const [isChecked, setIsChecked] = useState(false);


  const [inputValues, setInputValues] = useState({});

  console.log(inputValues);
  useEffect(() => {
    if (urlJournalNumber) {
      setJournalNumber(urlJournalNumber);
      handleSearchClick2();
      console.log(urlJournalNumber);
    }
  }, [urlJournalNumber]);

  const handleInputChange = (key, value) => {
    setInputValues({ ...inputValues, [key]: value });
  };

  const [checkedKeys, setCheckedKeys] = useState([]);

  useEffect(() => {
    if (journalData && journalData.data) {
      const data = journalData.data.data;
      const updatedData = {};

      if (data) {
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const value = data[key];
            const words = value.split(' ');
            const lastWord = words[words.length - 1];

            if (lastWord === '(changed)') {
              updatedData[key] = value;
            }
          }
        }

        setChangedKeyValue(updatedData);
      }
    } else {
      console.log('journalData is null or data property does not exist.');
    }
  }, [journalData]); 


  const handleCheckboxChange = (key) => {
    if (checkedKeys.includes(key)) {
      setCheckedKeys(checkedKeys.filter((checkedKey) => checkedKey !== key));
    } else {
      setCheckedKeys([...checkedKeys, key]);
    }

    if (inputValues[key]) {
      const updatedInputValues = { ...inputValues };
      delete updatedInputValues[key];
      setInputValues(updatedInputValues);
    }
  };

  /* console.log(`${Object.keys(keyMessageMap)[0]}: ${keyMessageMap[Object.keys(keyMessageMap)[0]]}`); */

  const Footer = () => {
    return (
      <footer
        style={{
          background: "#a7d5ff",
          padding: "2px",
          margin: "-30px",
          textAlign: "center",
          marginTop: "auto",
        }}
      >
        <p>&copy; ICT Division EAI Team All rights reserved.</p>
      </footer>
    );
  };
 
  const handleSearchClick2 = async () => {
    try {
      setLoading(true);
      setSuccessMessage("");
      setErrorMessage("");
      setJournalData(null);

      console.log("searched journal number", journalNumber);

      const apiUrl = "http://172.23.190.52:3005/fetch-payload";
      const requestBody = {
        journalNumber: journalNumber || urlJournalNumber,
      };

      const response = await axios.post(apiUrl, requestBody);
      setJournalData(response.data);
      /* console.log(response.data); */

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching journal data:", error);
    }
  };


  const handleApproveClick = async () => {
    try {
      setLoading(true);
      const storedEmployeeInfo = localStorage.getItem('employeeInfo');
      const employeeInfo = storedEmployeeInfo ? JSON.parse(storedEmployeeInfo) : null;
  
      const apiUrl = "http://172.23.190.52:3082/trigger-job";
      const apiUrlUpdateStatus = "http://172.23.190.52:3005/update-status";
      const loggedInEmail = localStorage.getItem('email');
      const loggedInBranchCode = employeeInfo.branch_code;
  
      if (journalData && journalData.email) {
        const { header, data } = journalData.data;
        if (loggedInEmail === journalData.email || loggedInBranchCode !== journalData.branchcode) {
          setErrorMessage("Authorization denied.");
          setLoading(false);
          return;
        }
  
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).replace(/\//g, '');
  
        const cleanedData = Object.fromEntries(
          Object.entries(data).map(([key, value]) => {
            if (typeof value === 'string') {
              const cleanedIdNum = value.replace(' (changed)', '').replace(' (verified)', '').replace(' (not verified)', '').replace('null','');
              return [key, cleanedIdNum];
            }
            return [key, value];
          })
        );
  
        const payload = {
          header,
          data: cleanedData,
          journalinfo: {
            journalnumber: journalNumber,
            checkerDate: formattedDate,
          }
        };
  
        const headers = {
          "Content-Type": "application/json",
        };
        const requestBodyUpdateStatus = {
          journalNumber: journalNumber,
        };
  
        const response = await axios.post(apiUrl, payload, { headers });
  
        if (response.status < 200 || response.status >= 300) {
          setErrorMessage("Something went wrong. Please try again later.");
          console.error("API Error - Status:", response.status, "Data:", response.data);
        } else {
          if (response.data.jobId) {
            setSuccessMessage("Your request is sent successfully.");
            const responseUpdateStatus = await axios.post(apiUrlUpdateStatus, requestBodyUpdateStatus);
          } else {
            setErrorMessage("Some error occurred. Please try again later.");
          }
        }
      } else {
        setErrorMessage("No changes are made to update.");
        console.warn("No changes made. Amend request not sent.");
      }
  
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error approving data:", error);
      setErrorMessage("Error approving data.");
    }
  };
  
  const handleRejectClick = async () => {
    const storedEmployeeInfo = localStorage.getItem('employeeInfo');
      const employeeInfo = storedEmployeeInfo ? JSON.parse(storedEmployeeInfo) : null;
      const loggedInEmail = localStorage.getItem('email');
      const loggedInBranchCode = employeeInfo.branch_code;
      if (loggedInEmail === journalData.email || loggedInBranchCode !== journalData.branchcode) {
        setErrorMessage("Rejection denied.");
        setLoading(false);
        return;
      }
      else
      {setShowRejectModal(true);}
  };

  // Custom label mappings for keys
  const labelMappings = {
    'CustGrp': 'Customer Category',
    'CustTyp': 'Customer Type',
    'CustNumber': 'CIF No',
    'GndrCode': 'Gender',
    'TitleCode': 'Gender Type',
    'FirstName': 'First Name',
    'LastName': 'Last Name',
    'ShrtName': 'Nick Name',
    'CustomerName': 'Customer Name',
    'SpouseName': 'Spouse Name',
    'FatherName': 'Father Name',
    'MotherMaidenName': 'Mother Namer',
    'DtOfBirth': 'Date Of Birth',
    'Dmcle': 'Domicile',
    'ResdncyStat': 'Residential Status',
    'CountryOfBirth': 'Country Of Birth',
    'DisttBirth': 'District Of Birth',
    'CountryOfTaxRsdnc': 'Country Of Tax',
    //Permanent Address
    "AddrLine1": "Flat/Building/Holding No./House Name",
    "AddrLine2": "Street/Block/Village",
    "CountryOfRes": "Country",
    "CustState": "Division",
    "CityCode1": "District",
    "Thana1": "Thana",
    "SubOffice1": "Post Office",
    "BussPhnNum": "Mobile Number",

    //Present Address
    "Addr10": "Flat/Building/Holding No./House Name",
    "Addr11": "Street/Block/Village",
    "CountryCode2": "Country",
    "StateCode1": "Division",
    "CityBus": "District",
    "Thana2": "Thana",
    "SubOfc2": "Post Office",
    "PhnBus1": "Mobile Number",
    //Generatil Information
    "Natlty": "Nationality 1",
    'Natlty2': "Nationality 2",
    'Flag1': "SMS Flag",
    "IncomeRange": "Monthly Income",
    "Caste": "Religion",
    "CustRisk": "Customer Risk Likelihood",
    "CustRiskImp": "Customer Risk Impact",
    "Risk": "Country Risk Likelihood",
    "CounRiskImp": "Country Risk Impact",
    "PrimTyp1": "Primary Sector Type",
    "SeconTyp1": "Secondary Sector Type",
    "PrimTyp2": "Primary Sector Code",
    "SecndryTyp2": "Secondary Sector Code",
    "FnlSec": "Final Sector Code",
    "Attr10": "Occupation Details",
    //Identification
    "IdTyp": "Identity Type",
    "IdNum": "Identity Number",
    "IdIssueDt": "ID Issued Date",
    "IdIssueRmrk": "Issue Remark",
    "CountryTemp": "ID Issuing Country",
    "IdExpDt": "ID Expiry Date",
    //Channels
    'SmsRegDate': 'SMS Registration Date:',
    'SmsColectnAcct': 'SMS Coll. CASA Acct'
  };

  const handleRejectConfirm = async () => {
    try {
      setLoading(true);

      const updatedReasonNote = Object.entries(inputValues)
        .map(([key, value]) => `${labelMappings[key] || key}: ${value}`)
        .join(', ');


      const apiUrl = "http://172.23.190.52:3088/updateStatus";
      const requestBody = {
        journalNumber: journalNumber,
        reasonNote: updatedReasonNote,
        tags: Object.keys(inputValues)
      };

      const response = await axios.post(apiUrl, requestBody);

      if (response.status === 200) {
        setSuccessMessage("Journal rejected successfully.");
        setShowRejectModal(false);
        setReasonNote("");
      } else {
        setErrorMessage("Failed to reject journal.");
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error rejecting journal:", error);
      setErrorMessage("Error rejecting journal.");
    }
  };


  return (
    <div className="authorization">
      <CustomNavbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <h2 style={{ textAlign: "center", paddingTop: "50px", paddingBottom: "50px", color: '#333' }}>
        Authorizer Panel
      </h2>
      <div style={{ textAlign: "center", paddingBottom: "50px" }}>
        <label>
          Journal Number:
          <input
            type="text"
            value={journalNumber}
            onChange={(e) => setJournalNumber(e.target.value)}
            style={{
              marginLeft: "10px",
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "250px",
              height: "35px",
            }}
          />
        </label>
        <button
          onClick={handleSearchClick2}
          id="searchBtn"
        >
          Search
        </button>

        {successMessage && (
          <p style={{ color: "green", textAlign: "center", marginTop: "10px" }}>
            {successMessage}
          </p>
        )}

        {errorMessage && (
          <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
            {errorMessage}
          </p>
        )}
      </div>

      {!successMessage && !errorMessage && (
        <div>
          {journalData && (
            <div>
              <h3 style={{ textAlign: "center", marginBottom: "20px", color: '#333' }}>Customer Details</h3>
              {journalData.data ? (
                <div style={{ background: '#f8f8f8', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                  <DisplayFormData
                    data={journalData.data}
                  />
                </div>
              ) : (
                <p style={{ textAlign: "center", color: '#777' }}>No payload data found</p>
              )}
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={handleApproveClick}
                  style={{
                    backgroundColor: "#7175ba",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    border: "none",
                    marginTop: "20px",
                    marginRight: "10px",
                  }}
                >
                  Approve
                </button>
                <button
                  onClick={handleRejectClick}
                  style={{
                    backgroundColor: "#ff6666",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    border: "none",
                    marginTop: "20px",
                    marginRight: "10px",
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="loader-container" style={{ textAlign: "center", marginTop: "20px" }}>
              <div className="spinner"></div>
            </div>
          )}
        </div>
      )}
      <br></br>
      <Footer />
      {showRejectModal && (
        <div className="modal">
          <div className="modal-content" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="close" onClick={() => setShowRejectModal(false)}>&times;</span>
            <h5>Do you want to reject the journal?</h5>
            <hr /> {/* Divider */}
            <br></br>
            {Object.entries(changedKeyValue).map(([key, value]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={checkedKeys.includes(key)}
                  onChange={() => handleCheckboxChange(key)}
                  style={{
                    width: '30px',
                    height: '20px',
                    padding: '0px',
                    margin: '0',
                  }}
                />
                <div style={{ flex: 2 }}>
                  <h5>{labelMappings[key]}</h5>
                </div>
                <div style={{ flex: 3 }}>
                  {checkedKeys.includes(key) && (
                    <div style={{ flex: 3 }}>
                    {checkedKeys.includes(key) && (
                      <input
                        type="text"
                        value={inputValues[key] || ''}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        placeholder="Enter Rejection Note..."
                        style={{
                          marginLeft: '10px',
                          padding: '5px',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                          width: '250px',
                          height: '25px',
                        }}
                      />
                    )}
                  </div>
                  )}
                </div>
              </div>
            ))}
            <br></br>
            <br></br>
            <button 
            onClick={handleRejectConfirm}
            style={{
              backgroundColor: "#ff6666",
              color: "white",
              padding: "8px 16px",
              borderRadius: "5px",
              cursor: "pointer",
              border: "none",
              marginTop: "20px",
              marginRight: "10px",
            }}
            >
            Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthenticationPage;