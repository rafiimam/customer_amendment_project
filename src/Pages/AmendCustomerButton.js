import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
//import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import BasicInfoSection from "../Personal Account Sections/BasicInfoSection ";
import AddressInfoSection from "../Personal Account Sections/AddressInfoSection";
import GeneralInformation from "../Personal Account Sections/GeneralInformation";
import IdentificationDetails from "../Personal Account Sections/IdentificationDetails";
import Channels from "../Personal Account Sections/Channels";
import BusBasicInfoSection from "../Business Account Sections/BusBasicInfoSection ";
import BusAddressInfoSection from "../Business Account Sections/BusAddressInfoSection";
import BusGeneralInformation from "../Business Account Sections/BusGeneralInformation";
import BusIdentificationDetails from "../Business Account Sections/BusIdentificationDetails";
import BusChannels from "../Business Account Sections/BusChannels";
import "../styles/AmendCustomerButton.css";
import "bootstrap/dist/css/bootstrap.css";
import CustomNavbar from "./Navbar";

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

const AmendCustomerButton = ({ handleLogout }) => {
    const [formData, setFormData] = useState({
        CustTyp: "",
        CustNumber: "",
        FirstName: "",
        CustMidName: "",
        LastName: "",
        CustGrp: "",
        TitleCode: "",
        AddrLine2: "",
        Dmcle: "",
        BussPhnNum: "",
        Natlty: "",
        CountryOfRes: "",
        CustState: "",
        LangCode: "",
        IdTyp: "",
        IdNum: "",
        IdExpDt: "",
        DmstcRisk: "",
        CrossBrdrRisk: "",
        BrkrStat: "",
        HomeBrchNum: "",
        Risk: "",
        CustEvaluationReq: "",
        GrpID: "",
        FatherName: "",
        MotherMaidenName: "",
        ResdncyStat: "",
        CisOrgCode: "",
        BsrOrgCode: "",
        DtOfBirth: "",
        GndrCode: "",
        IncomeRange: "",
        CustRisk: "",
        Addr1: "",
        KYCDt: "",
        CountryOfBirth: "",
        IrcLmt: "",
        NameEmg: "",
        Addr8: "",
        RelationEmg: "",
        MoblieEmg: "",
        CustRiskImp: "",
        CounRiskImp: "",
        Thana1: "",
        SubOffice1: "",
        Addr11: "",
        StateCode1: "",
        CityCode1: "",
        CountryTemp: "",
        Thana2: "",
        PhnRsdnc1: "",
        PrimTyp1: "",
        SeconTyp1: "",
        PrimTyp2: "",
        SecndryTyp2: "",
        FnlSec: "",
        DisttBirth: "",
        BankNm: "",
        ErcNum1: "",
        IrcNum1: "",
        ErcExpryDt: "",
        IrcExpryDt: "",
        IrcIssueDt: "",
        IrcIssuePlace: "",
        ErcIssueDt: "",
        ErcIssuePlace: "",
        CountryOfTaxRsdnc: "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [warningMessage, setWarningMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [defaultValues, setDefaultValues] = useState(null);
    const [custNumberInput, setCustNumberInput] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const identificationDetailsRef = useRef(null);
    const [nidErrorMessage, setNidErrorMessage] = useState("");
    const [verificationStatus, setVerificationStatus] = useState(null);
    const [results, setResults] = useState([]);

    useEffect(() => {

        const fetchTodayStatus = async () => {
            try {
                setLoading(true);

                const storedEmployeeInfo = localStorage.getItem("employeeInfo");
                const employeeInfo = storedEmployeeInfo ? JSON.parse(storedEmployeeInfo) : null;
                const branchcode = employeeInfo.branch_code;

                const currentDate = new Date();
                const formattedDate = currentDate.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }).replace(/\//g, '');

                const apiUrl = "http://172.23.190.52:3084/getStatusJobResponse";
                const requestBody = {
                    checkerDate: formattedDate,
                    branchcode: branchcode,
                };

                const response = await axios.post(apiUrl, requestBody);
                setResults(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Error fetching status:", error);
            }
        };

        fetchTodayStatus();
    }, []);


    const handleInputChange = (fieldName, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: value === "" ? null : value,
        }));
    };


    const handleCustNumberChange = (value) => {
        setCustNumberInput(value);
    };

    const handleEnquireClick = async () => {
        setErrorMessage('');
        setSuccessMessage('');
        setWarningMessage('');
        setNidErrorMessage('');
        try {
            setLoading(true);
            const timeoutId = setTimeout(() => {
                setWarningMessage("Please wait a bit. Server is running slow.");
            }, 30000);

            await fetchCustomerDetails(custNumberInput);

            clearTimeout(timeoutId);
        } catch (error) {
            setLoading(false);
            setErrorMessage("Error fetching customer details. Please try again.");
            console.error("Error fetching customer details:", error);
        }
    };

    const fetchCustomerDetails = async (custNumber) => {
        try {
            const tokenApiUrl = `${process.env.REACT_APP_TOKEN_API_URL}/get-token`;
            //const tokenApiUrl = 'http://172.30.30.122:1010/v7/token';
            const headers = {
                "Content-Type": "application/x-www-form-urlencoded",
            };
            const body = new URLSearchParams({
                username: "tcs",
                password: "123456",
                service_name: "EnquireCustomer",
                token_type: "enquiry",
                grant_type: "password",
                amount: 0,
            });

            const response = await axios.post(tokenApiUrl, body, { headers });
            const token = response.data.access_token;

            fetchDefaultValues(custNumber, token);
        } catch (error) {
            console.error("Error fetching token:", error);
        }
    };

    const fetchDefaultValues = async (custNumber, token) => {
        try {
            const apiUrl = `${process.env.REACT_APP_ENQUIRE_CUSTOMER_API_URL}/enquire-customer`;
            const headers = {
                "Content-Type": "application/json",
            };
            const body = {
                custNumber: custNumber,
                token: token,
            };

            const response = await axios.post(apiUrl, body, { headers });
            const data = response.data;

            if (data && data.Data && data.Data.CustInqData) {
                const custInqData = data.Data.CustInqData;
                setDefaultValues(custInqData);

                const national_id = custInqData.IdNum;
                const custNumber = custInqData.CustNumber;

                const statusApiUrl = "http://172.23.190.52:3007/api/verifications/status";
                const statusRequestBody = {
                    national_id,
                    custNumber
                };
                const statusResponse = await axios.post(statusApiUrl, statusRequestBody);

                if (statusResponse.data.verificationStatus === 'yes') {
                    setVerificationStatus('yes');
                } else if (statusResponse.data.verificationStatus === 'no') {
                    setVerificationStatus(null);
                }
                else {
                    setVerificationStatus(null);
                }

                if (results.some(result => result.status === 'Pending' && result.job_request.data.CustNumber === custNumber)) {
                    setErrorMessage("Previous request for this customer is still pending.");
                    setDefaultValues(null)
                } else {
                    setErrorMessage("");
                }
                setLoading(false);
            } else {
                setLoading(false);
                const errorMessage = data.Message;
                setErrorMessage(errorMessage);
                console.error("Invalid response format:", data);
            }

            setTimeout(() => {
                setSuccessMessage("");
                setErrorMessage("");
            }, 5000);
        } catch (error) {
            console.error("Error fetching default values:", error);
            setLoading(false);
        }
    };


    const renderSections = () => {
        if (defaultValues && defaultValues.CustGrp === "01") {
            return (
                <>
                    <BasicInfoSection
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        formData={formData}
                        defaultValues={defaultValues}
                        handleInputChange={handleInputChange}
                    />
                    <AddressInfoSection
                        formData={formData}
                        defaultValues={defaultValues}
                        handleInputChange={handleInputChange}
                    />
                    <GeneralInformation
                        formData={formData}
                        defaultValues={defaultValues}
                        handleInputChange={handleInputChange}
                    />
                    <IdentificationDetails
                        formData={formData}
                        selectedDate={selectedDate}
                        defaultValues={defaultValues}
                        handleInputChange={handleInputChange}
                        verificationStatus={verificationStatus}
                        setVerificationStatus={setVerificationStatus}
                    />
                    <Channels
                        formData={formData}
                        defaultValues={defaultValues}
                        handleInputChange={handleInputChange}
                    />
                </>
            );
        } else if (defaultValues && defaultValues.CustGrp === "02") {
            return (
                <>
                    <BusBasicInfoSection
                        formData={formData}
                        defaultValues={defaultValues}
                        handleInputChange={handleInputChange}
                    />
                    <BusAddressInfoSection
                        formData={formData}
                        defaultValues={defaultValues}
                        handleInputChange={handleInputChange}
                    />
                    <BusGeneralInformation
                        formData={formData}
                        defaultValues={defaultValues}
                        handleInputChange={handleInputChange}
                    />
                    <BusIdentificationDetails
                        formData={formData}
                        selectedDate={selectedDate}
                        defaultValues={defaultValues}
                        handleInputChange={handleInputChange}
                        verificationStatus={verificationStatus}
                        setVerificationStatus={setVerificationStatus}
                    />
                    <BusChannels
                        formData={formData}
                        defaultValues={defaultValues}
                        handleInputChange={handleInputChange}
                    />
                </>
            );
        }

        return null;
    };

    const fetchToken = async () => {
        try {
            const tokenApiUrl = `${process.env.REACT_APP_TOKEN_API_URL}/get-token`;
            //const tokenApiUrl = 'http://172.30.30.122:1010/v7/token';
            const headers = {
                "Content-Type": "application/x-www-form-urlencoded",
            };
            const body = new URLSearchParams({
                username: "tcs",
                password: "123456",
                service_name: "EnquireCustomer",
                token_type: "enquiry",
                grant_type: "password",
                amount: 0,
            });
            const response = await axios.post(tokenApiUrl, body, { headers });

            const token = response.data.access_token;
            console.log("generated token: ", token);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching token:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchToken();
    }, []);

    useEffect(() => {
        let timeoutId;

        if (successMessage) {
            timeoutId = setTimeout(() => {
                setSuccessMessage("");
            }, 30000);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [successMessage]);

    const handleAmendClick = async () => {
        setErrorMessage('');
        setSuccessMessage('');
        setWarningMessage('');
        setNidErrorMessage('');

        const storedEmployeeInfo = localStorage.getItem('employeeInfo');
        const employeeInfo = storedEmployeeInfo ? JSON.parse(storedEmployeeInfo) : null;

        try {
            setLoading(true);
            const email = localStorage.getItem('email');
            const tellernum = employeeInfo.Teller_num;
            const branchcode = employeeInfo.branch_code;
            const generateRandomUid = () => {
                const min = 10 ** 19;
                const max = (10 ** 20) - 1;
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };

            if (!email) {
                setErrorMessage('Email not found. Please log in.');
                return;
            }

            const isFormDataEdited = Object.keys(formData).some(key => {
                const currentValue = formData[key];
                const defaultValue = defaultValues[key];
                if (currentValue === null)
                    return defaultValue;
                else
                    return currentValue;
            });

            if (!isFormDataEdited) {
                setErrorMessage("No changes are made to update.");
                console.warn("No changes made. Amend request not sent.");
                setDefaultValues(null);
                return;
            }


            if (verificationStatus !== 'yes') {
                setNidErrorMessage('Please verify NID to proceed');
                setTimeout(() => {
                    setSuccessMessage("");
                }, 3000);
                return;
            }

            const randomUid = generateRandomUid();
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).replace(/\//g, '');

            const modifiedFormData = { ...formData };
            const modifiedDefaultValues = { ...defaultValues };

            if (modifiedFormData.IdNum && verificationStatus === 'yes') {
                modifiedFormData.IdNum += ' (verified)';
            } else if (modifiedDefaultValues.IdNum && verificationStatus === 'yes') {
                modifiedDefaultValues.IdNum += ' (verified)';
            } else if (modifiedFormData.IdNum && (verificationStatus === 'no' || verificationStatus === null)) {
                modifiedFormData.IdNum += ' (not verified)';
            } else if (modifiedDefaultValues.IdNum && (verificationStatus === 'no' || verificationStatus === null)) {
                modifiedDefaultValues.IdNum += ' (not verified)';
            }

            const jsonData = {
                email: email,
                tellernum: tellernum,
                branchcode: branchcode,
                checkerDate: formattedDate,
                payload: {
                    header: {
                        TellerNum: `${tellernum}`,
                        BrchNum: `${branchcode}`,
                        Uid: String(randomUid),
                    },
                    data: Object.fromEntries(
                        Object.entries(modifiedDefaultValues).map(([key, value]) => [
                            key,
                            modifiedFormData[key] !== undefined && modifiedFormData[key] !== ""
                                ? `${modifiedFormData[key]} (changed)`
                                : value === null
                                    ? ""
                                    : value
                        ])
                    ),
                },
            };

            const apiUrl = 'http://172.23.190.52:3005/store-payload';

            const headers = {
                "Content-Type": "application/json",
            };

            const response = await axios.post(apiUrl, jsonData, { headers });

            if (response.status < 200 || response.status >= 300) {
                setErrorMessage("Something went wrong. Please try again later.");
                console.error("API Error - Status:", response.status, "Data:", response.data);
                setDefaultValues(null);
            } else {
                console.log("Response:", response.data);
                const responseData = response.data;
                const { success, journalNumber } = responseData;


                if (success) {
                    setSuccessMessage(`Update information is pending. Journal number for the request is: ${journalNumber}`);
                    setDefaultValues(null);
                    setTimeout(() => {
                        setSuccessMessage("");
                    }, 30000);
                } else {
                    setErrorMessage("Something went wrong. Please try again later.");
                    setDefaultValues(null);
                    console.error("API Error - Success is false. Data:", responseData);
                }
            }
        } catch (error) {
            console.error("API Error:", error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="amendCustomer">
            <div>
                <div>
                    <CustomNavbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
                </div>

                <h2 className="heading">Maker Panel</h2>

                <div className="enquireSearchDiv">
                    <form onSubmit={(e) => {
                        e.preventDefault(); 
                        handleEnquireClick(); 
                    }}>
                        <label>
                            Customer Number:
                            <input
                                className="custNum"
                                type="text"
                                value={custNumberInput}
                                onChange={(e) => handleCustNumberChange(e.target.value)}
                                style={{
                                    marginLeft: "10px",
                                    padding: "5px",
                                    borderRadius: "5px",
                                    border: "1px solid #ccc",
                                    width: "250px",
                                    height: "35px",
                                }}
                            />
                            <button
                                className="enquireBtn"
                                type="submit" // Set button type to submit to trigger form submission
                            >
                                Enquire
                            </button>
                            <br></br>
                            {successMessage && (
                                <p style={{ color: "green", textAlign: "center", paddingTop: "20px" }}>
                                    {successMessage}
                                </p>
                            )}

                            {errorMessage && (
                                <p style={{ color: "red", textAlign: "center", paddingTop: "20px" }}>{errorMessage}</p>
                            )}

                            {warningMessage && (
                                <p style={{ color: "#fca828", textAlign: "center", paddingTop: "20px" }}>
                                    {warningMessage}
                                </p>
                            )}
                            <br></br>
                            <br></br>
                            <br></br>
                        </label>
                    </form>
                </div>

                {loading ? (
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
                ) : defaultValues === null ? (
                    <p
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "50px",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    ></p>
                ) : (
                    <div className="box">
                        {renderSections()}
                        {nidErrorMessage && (
                            <p style={{ color: "red", textAlign: "center", paddingTop: "20px" }}>{nidErrorMessage}</p>
                        )}
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "100px",
                                flexDirection: "row",
                                justifyContent: "center",
                            }}
                        >
                            <button onClick={handleAmendClick} className="enquireBtn">
                                Submit
                            </button>
                        </div>

                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default AmendCustomerButton;
