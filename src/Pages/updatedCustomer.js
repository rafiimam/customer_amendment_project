import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
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

const UpdatedCustomer = ({ handleLogout }) => {
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
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);
    const [nidErrorMessage, setNidErrorMessage] = useState("");
    const [verificationStatus, setVerificationStatus] = useState(null);
    const [results, setResults] = useState([]);
    const [tags, setTags] = useState([]);
    const { journalNumber: urlJournalNumber } = useParams();

    const handleInputChange = (fieldName, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: value === "" ? null : value,
        }));
    };

    useEffect(() => {
        if (urlJournalNumber) {
            handleSearchClick();
            console.log(urlJournalNumber);
        }
    }, [urlJournalNumber]);

    const handleSearchClick = async () => {
        try {
            setLoading(true);
            setSuccessMessage("");
            setErrorMessage("");

            console.log("searched journal number", urlJournalNumber);

            const apiUrl = "http://172.23.190.52:3005/fetch-payload";
            const requestBody = {
                journalNumber: urlJournalNumber,
            };

            const response = await axios.post(apiUrl, requestBody);
            console.log(response.data);
            const data = response.data;

            if (data && data.data && data.data.data) {
                let custInqData = data.data.data;

                // Preprocess custInqData
                custInqData = preprocessData(custInqData);

                setDefaultValues(custInqData);
                const tags = data.tags;
                setTags(tags);

                console.log(tags);
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
                } else {
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
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching journal data:", error);
        }
    };

    const preprocessData = (data) => {
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                let value = data[key];
                if (typeof value === 'string') {
                    value = value.replace(/ \(changed\)| \(verified\)| \(not verified\)/gi, '');
                    data[key] = value.trim();
                }
            }
        }
        return data;
    };


    const getHighlightedFields = (defaultValues, tags) => {
        const highlightedFields = {};
        if (defaultValues && tags) {
            tags.forEach(tag => {
                if (defaultValues[tag]) {
                    highlightedFields[tag] = true;
                }
            });
        }
        return highlightedFields;
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
                        highlightedFields={getHighlightedFields(defaultValues, tags)}
                    />
                    <AddressInfoSection
                        formData={formData}
                        defaultValues={defaultValues}
                        handleInputChange={handleInputChange}
                        highlightedFields={getHighlightedFields(defaultValues, tags)}
                    />
                    <GeneralInformation
                        formData={formData}
                        defaultValues={defaultValues}
                        handleInputChange={handleInputChange}
                        highlightedFields={getHighlightedFields(defaultValues, tags)}
                    />
                    <IdentificationDetails
                        formData={formData}
                        selectedDate={selectedDate}
                        defaultValues={defaultValues}
                        handleInputChange={handleInputChange}
                        verificationStatus={verificationStatus}
                        setVerificationStatus={setVerificationStatus}
                        highlightedFields={getHighlightedFields(defaultValues, tags)}
                    />
                    <Channels
                        formData={formData}
                        defaultValues={defaultValues}
                        handleInputChange={handleInputChange}
                        highlightedFields={getHighlightedFields(defaultValues, tags)}
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
                        highlightedFields={getHighlightedFields(defaultValues, tags)}
                    />
                    <BusAddressInfoSection
                        formData={formData}
                        defaultValues={defaultValues}
                        handleInputChange={handleInputChange}
                        highlightedFields={getHighlightedFields(defaultValues, tags)}
                    />
                    <BusGeneralInformation
                        formData={formData}
                        defaultValues={defaultValues}
                        handleInputChange={handleInputChange}
                        highlightedFields={getHighlightedFields(defaultValues, tags)}
                    />
                    <BusIdentificationDetails
                        formData={formData}
                        selectedDate={selectedDate}
                        defaultValues={defaultValues}
                        handleInputChange={handleInputChange}
                        verificationStatus={verificationStatus}
                        setVerificationStatus={setVerificationStatus}
                        highlightedFields={getHighlightedFields(defaultValues, tags)}
                    />
                    <BusChannels
                        formData={formData}
                        defaultValues={defaultValues}
                        handleInputChange={handleInputChange}
                        highlightedFields={getHighlightedFields(defaultValues, tags)}
                    />
                </>
            );
        }

        return null;
    };

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
                <h2 className="updateHeading">Update Panel</h2>
                <div className="enquireSearchDiv">
                    <label>
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

export default UpdatedCustomer;
