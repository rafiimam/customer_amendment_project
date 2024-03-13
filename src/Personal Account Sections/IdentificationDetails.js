import React, { useState, useEffect, useRef } from 'react';
import 'animate.css';
import '../styles/AmendCustomerButton.css';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { RiVerifiedBadgeFill } from "react-icons/ri";


const IdentificationDetails = ({ formData, defaultValues, handleInputChange, verificationStatus, setVerificationStatus, highlightedFields = {} }) => {
    const [isIdTypEdited, setIsIdTypEdited] = useState(false);
    const [isIdNumEdited, setIsIdNumEdited] = useState(false);
    const [isIdIssueDtEdited, setIsIdIssueDtEdited] = useState(false);
    const [isIdIssueRmrkEdited, setIsIdIssueRmrkEdited] = useState(false);
    const [isCountryTempEdited, setIsCountryTempEdited] = useState(false);
    const [isIdExpDtEdited, setIsIdExpDtEdited] = useState(false);
    const [isSectionOpen, setIsSectionOpen] = useState(true);
    const [selectedIssueDate, setSelectedIssueDate] = useState(null);
    const [selectedExpiryDate, setSelectedExpiryDate] = useState(null);

    const identificationDetailsRef = useRef(null);


    useEffect(() => {
        if (defaultValues.IdExpDt && defaultValues.IdIssueDt) {
            const expYear = defaultValues.IdExpDt.slice(4);
            const expMonth = defaultValues.IdExpDt.slice(2, 4) - 1;
            const expDay = defaultValues.IdExpDt.slice(0, 2);
            setSelectedExpiryDate(new Date(expYear, expMonth, expDay));

            const issueYear = defaultValues.IdIssueDt.slice(4);
            const issueMonth = defaultValues.IdIssueDt.slice(2, 4) - 1;
            const issueDay = defaultValues.IdIssueDt.slice(0, 2);
            setSelectedIssueDate(new Date(issueYear, issueMonth, issueDay));
        }
    }, [defaultValues.IdExpDt, defaultValues.IdIssueDt]);



    const toggleSection = () => {
        setIsSectionOpen(!isSectionOpen);
    };


    const formatDate = (date) => {
        if (date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = String(date.getFullYear());
            return day + month + year;
        } else {
            return '';
        }
    };
    const formatDate2 = (dateString) => {
        if (dateString) {
            const year = dateString.slice(4);
            const month = dateString.slice(2, 4);
            const day = dateString.slice(0, 2);
            return `${year}-${month}-${day}`;
        } else {
            return '';
        }
    };


    const handleIssueDateChange = (date) => {
        setSelectedIssueDate(date);
        setIsIdIssueDtEdited(true);
        const formattedDate = formatDate(date);
        handleInputChange('IdIssueDt', formattedDate);
    };

    const handleExpiryDateChange = (date) => {
        setSelectedExpiryDate(date);
        setIsIdExpDtEdited(true);
        const formattedDate = formatDate(date);
        handleInputChange('IdExpDt', formattedDate);
    };

    const handleVerifyClick = async () => {
        try {
            if ((formData.IdTyp || defaultValues.IdTyp) === '01' &&
                (formData.IdNum || defaultValues.IdNum).length !== 10) {
                setVerificationStatus('unmatch');
                return;
            } else if ((formData.IdTyp || defaultValues.IdTyp) === '02' &&
                (formData.IdNum || defaultValues.IdNum).length !== 17) {
                setVerificationStatus('unmatch');
                return;
            }
            const apiUrl = "http://172.23.190.52:3007/api/verifications/basic-nid";
            const requestBody = {
                person_fullname: formData.CustomerName || defaultValues.CustomerName || '',
                national_id: formData.IdNum || defaultValues.IdNum || '',
                person_dob: formatDate2(formData.DtOfBirth || defaultValues.DtOfBirth || ''),
                match_name: false
            };
            const headers = {
                'x-api-key': 'e92f4740-1827-4699-b0e7-9c2b8773e3c6'
            };

            try {
                const response = await axios.post(apiUrl, requestBody);
                console.log(response);
                console.log(response.data);
                if (response.data.passKyc) {
                    setVerificationStatus(response.data.passKyc);
                    if (response.data.passKyc === 'yes') {
                        const secondApiUrl = "http://172.23.190.52:3007/api/verifications";
                        const secondRequestBody = {
                            person_fullname: requestBody.person_fullname,
                            national_id: requestBody.national_id,
                            person_dob: requestBody.person_dob,
                            verificationStatus: response.data.passKyc,
                            CustNumber: formData.CustNumber || defaultValues.CustNumber || ''
                        };

                        await axios.post(secondApiUrl, secondRequestBody);
                    }
                }
                else {
                    setVerificationStatus('no')
                }
            } catch (error) {
                setVerificationStatus('no')
            }


        } catch (error) {
            setVerificationStatus('no')
            console.error("Error verifying identity:", error);
        }
    };


    return (
        <div className='animate__animated animate__slideInDown' ref={identificationDetailsRef}>
            <div onClick={toggleSection} style={{ cursor: 'pointer', marginTop: '60px', marginBottom: '25px', fontSize: '10px', fontWeight: 'normal' }}>
                <strong className="title">Identification Details</strong> - {isSectionOpen ? 'Hide' : 'Show'}
            </div>

            {isSectionOpen && (
                <>
                    <div className="info">
                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['IdTyp'] ? 'red' : 'black' }}>
                                    Identity Type:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <select
                                        className="required"
                                        value={isIdTypEdited ? formData.IdTyp : defaultValues.IdTyp || ''}
                                        onChange={(e) => {
                                            handleInputChange('IdTyp', e.target.value);
                                            setIsIdTypEdited(true);
                                            setVerificationStatus(null);
                                        }}
                                        style={{ border: highlightedFields['IdTyp'] ? '2px solid red' : '1px black' }}
                                    >
                                        <option value="">Select</option>
                                        <option value="99">Non Individual Group Customer</option>
                                        <option value="01">National Identity No. 10 Digit</option>
                                        <option value="02">NID (17 Digit)</option>
                                        <option value="03">Passport Number</option>
                                        <option value="04">Birth Reg. Cert.</option>
                                        <option value="05">Driving License</option>
                                        <option value="06">Trade License</option>
                                        <option value="07">E-TIN</option>
                                        <option value="08">Cert. of Reg. of Partner. Firm</option>
                                        <option value="09">Cert. of incorporation</option>
                                        <option value="10">Cert. of Comm(For Pub.Ltd.Co.)</option>
                                        <option value="11">LOP for govt. acct(Aprop-auth)</option>
                                        <option value="12">COR(Club,Soc,Ltd.Soc/Coop-oth)</option>
                                        <option value="13">Business ID Number (BIN)</option>
                                        <option value="14">Imp. Reg. Certificate (IRC)</option>
                                        <option value="15">Exp. Reg. Certificate (ERC)</option>
                                        <option value="16">VAT Number</option>
                                        <option value="17">BEPZA Permission</option>
                                        <option value="18">BIDA Permission</option>
                                        <option value="19">FDI Permission</option>
                                        <option value="20">Bangladesh Bank License</option>
                                        <option value="21">Bangladesh Bank Permission</option>
                                        <option value="22">Commercial License</option>
                                        <option value="23">Porchitipotro(Intro. Hon. Per)</option>
                                        <option value="24">Owner doc of shop</option>
                                        <option value="25">Rent Receipt of the Shop</option>
                                        <option value="26">Membership Cert. of any assoc.</option>
                                        <option value="27">Credit Card</option>
                                        <option value="28">Partnership Deed(Unregistered)</option>
                                        <option value="29">Resolution</option>
                                        <option value="30">Memo. and Articles of Assoc.</option>
                                        <option value="31">Form XII Ltd.Co./Lst Mgmt Comm</option>
                                        <option value="32">Power of Attorney</option>
                                        <option value="33">Statue of FRMN of govt. ent.</option>
                                        <option value="34">Doc. of nature of the NGO/NPO</option>
                                        <option value="35">By-Laws (Not Certified)</option>
                                        <option value="36">By-Laws (Certified)</option>
                                        <option value="37">Clearance of Foreign Ministry</option>
                                        <option value="38">Cert. True copy of Trusty Deed</option>
                                        <option value="39">FORM - QA-22/A-7 Declaration</option>
                                        <option value="40">Joint Venture Agreement Deed</option>
                                        <option value="41">RES(Pvt. Sch./College/Madrasa)</option>
                                        <option value="42">Cert(For-Dip Msn/NPOIntl/PC)</option>
                                        <option value="81">Tq ltr through postal dept.</option>
                                        <option value="82">Tq ltr through courier</option>
                                        <option value="83">3rd party verification report</option>
                                        <option value="84">Phy verification rpt bank off.</option>
                                        <option value="85">App/Parent util-bill(NOT&gt;3mth)</option>
                                        <option value="86">Resi. add. on off. Govt doc</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['IdNum'] ? 'red' : 'black' }}>
                                    Identity Number:
                                </label>
                            </div>

                            <div style={{ flex: '80%', display: 'flex' }}>
                                <div style={{ flex: (['01', '02'].includes(formData.IdTyp || defaultValues.IdTyp)) ? '30%' : '80%', paddingLeft: '10px' }}>
                                    <div className="value">
                                        <input
                                            className="required"
                                            type="text"
                                            value={isIdNumEdited ? formData.IdNum : defaultValues.IdNum || ''}
                                            onChange={(e) => {
                                                handleInputChange('IdNum', e.target.value);
                                                setIsIdNumEdited(true);
                                                setVerificationStatus(null);
                                            }}
                                            style={{ border: highlightedFields['IdNum'] ? '2px solid red' : '1px black' }}
                                        />
                                    </div>
                                </div>
                                {(['01', '02'].includes(formData.IdTyp || defaultValues.IdTyp) && verificationStatus !== 'yes') && (
                                    <div style={{ display: 'flex', flex: '50%' }}>
                                        <div >
                                            <div>
                                                <button className="verify-button" onClick={handleVerifyClick}>Verify</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {(['01', '02'].includes(formData.IdTyp || defaultValues.IdTyp) && verificationStatus === 'yes') && (
                                    <div style={{ display: 'flex', flex: '50%' }}>
                                        <div>
                                            <RiVerifiedBadgeFill style={{ color: "#0a91ff", marginBottom: "5px", fontSize: "20px" }} /><span style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "50px" }}> verified</span>
                                        </div>
                                    </div>
                                )}

                            </div>

                        </div>
                        {verificationStatus !== null && verificationStatus === 'no' && (
                            <div style={{ paddingLeft: '21%', paddingBottom: "5px", color: verificationStatus === 'no' ? 'red' : 'blue' }}>
                                {verificationStatus === 'no' ? 'Invalid NID. Check your Customer’s Name (CIB), Date of Birth and NID Number' : 'NID Verified'}
                            </div>
                        )}
                        {verificationStatus !== null && verificationStatus === 'unmatch' && (
                            <div style={{ paddingLeft: '21%', paddingBottom: "5px", color: verificationStatus === 'unmatch' ? 'red' : 'blue' }}>
                                {verificationStatus === 'unmatch' ? 'NID length does not match with NID type' : 'NID Verified'}
                            </div>
                        )}

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['IdIssueDt'] ? 'red' : 'black' }}>
                                    ID Issued Date:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <DatePicker
                                        className="required"
                                        selected={selectedIssueDate}
                                        onChange={handleIssueDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        maxDate={new Date()}
                                        style={{ border: highlightedFields['IdIssueDt'] ? '2px solid red' : '1px black' }}
                                    />
                                </div>
                            </div>
                        </div>


                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['IdIssueRmrk'] ? 'red' : 'black' }}>
                                    Issue Remark:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <input
                                        type="text"
                                        value={isIdIssueRmrkEdited ? formData.IdIssueRmrk : defaultValues.IdIssueRmrk || ''}
                                        onChange={(e) => {
                                            handleInputChange('IdIssueRmrk', e.target.value);
                                            setIsIdIssueRmrkEdited(true);
                                        }}
                                        style={{ border: highlightedFields['IdIssueRmrk'] ? '2px solid red' : '1px black' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['CountryTemp'] ? 'red' : 'black' }}>
                                    ID Issuing Country:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <select
                                        value={isCountryTempEdited ? formData.CountryTemp : defaultValues.CountryTemp || ''}
                                        onChange={(e) => {
                                            handleInputChange('CountryTemp', e.target.value);
                                            setIsCountryTempEdited(true);
                                        }
                                        }
                                        style={{ border: highlightedFields['CountryTemp'] ? '2px solid red' : '1px black' }}
                                    >
                                        <option value="">Select</option>
                                        <option value="AD">Andora</option>
                                        <option value="AE">United Arab Emirates</option>
                                        <option value="AF">Afghanistan</option>
                                        <option value="AG">Antigua And Barbuda</option>
                                        <option value="AI">Anguilla</option>
                                        <option value="AL">Albania</option>
                                        <option value="AM">Armenia</option>
                                        <option value="AN">Netherlands Antilles</option>
                                        <option value="AO">Angola</option>
                                        <option value="AR">Argentina</option>
                                        <option value="AT">Austria</option>
                                        <option value="AU">Australia</option>
                                        <option value="AW">Aruba</option>
                                        <option value="AZ">Azerbaijanian</option>
                                        <option value="BA">Bosnia-Herzegouina</option>
                                        <option value="BB">Barbados</option>
                                        <option value="BD">Bangladesh</option>
                                        <option value="BE">Belgium</option>
                                        <option value="BF">Burkina Faso</option>
                                        <option value="BG">Bulgaria</option>
                                        <option value="BH">Bahrain</option>
                                        <option value="BI">Burundi</option>
                                        <option value="BJ">Benin</option>
                                        <option value="BM">Mermuda</option>
                                        <option value="BN">Brunei Darussalam</option>
                                        <option value="BO">Bolivia</option>
                                        <option value="BR">Brazil</option>
                                        <option value="BS">Bahamas</option>
                                        <option value="BT">Bhutan</option>
                                        <option value="BV">Bouvet Island</option>
                                        <option value="BW">Botswana</option>
                                        <option value="BY">Belarus</option>
                                        <option value="BZ">Belize</option>
                                        <option value="CA">Canada</option>
                                        <option value="CC">Cocos</option>
                                        <option value="CE">Cecilia</option>
                                        <option value="CF">Central African Republic</option>
                                        <option value="CG">Congo</option>
                                        <option value="CH">Switzerland</option>
                                        <option value="CI">Cote D'Ivoire</option>
                                        <option value="CK">Cook Islands</option>
                                        <option value="CL">Chile</option>
                                        <option value="CM">Cameroon Republic</option>
                                        <option value="CN">China</option>
                                        <option value="CO">Colombia</option>
                                        <option value="CR">Costarica</option>
                                        <option value="CU">Cuba</option>
                                        <option value="CV">Cape Varde Islands</option>
                                        <option value="CX">Christmas Island</option>
                                        <option value="CY">Cyprus</option>
                                        <option value="CZ">Czechoslovakia</option>
                                        <option value="DE">Germany</option>
                                        <option value="DJ">Djebouti</option>
                                        <option value="DK">Denmark</option>
                                        <option value="DM">Dominica</option>
                                        <option value="DO">Diminican Republic</option>
                                        <option value="DZ">Alzeria</option>
                                        <option value="EC">Ecuador</option>
                                        <option value="CK">Cook Islands</option>
                                        <option value="EE">Estonia</option>
                                        <option value="EG">Egypt</option>
                                        <option value="EH">Western Sahara</option>
                                        <option value="ES">Spain</option>
                                        <option value="ET">Ethiopia</option>
                                        <option value="EU">European Union</option>
                                        <option value="FI">Finland</option>
                                        <option value="FJ">Fiji</option>
                                        <option value="FK">Falkland Is(Malvinas)</option>
                                        <option value="FO">Faeroe Islands</option>
                                        <option value="FR">France</option>
                                        <option value="GA">Gabon</option>
                                        <option value="GB">United Kingdom</option>
                                        <option value="GD">Grenada</option>
                                        <option value="GE">Georgia</option>
                                        <option value="GF">French Guiana</option>
                                        <option value="GG">Guernsey Channel Islands</option>
                                        <option value="GH">Ghana</option>
                                        <option value="GI">Gibraltar</option>
                                        <option value="GL">Greenland</option>
                                        <option value="GM">Gambia</option>
                                        <option value="GN">Guinea</option>
                                        <option value="GP">Guadaloupe</option>
                                        <option value="GQ">Equatorial Guinea</option>
                                        <option value="GR">Greece</option>
                                        <option value="GT">Guatemala</option>
                                        <option value="GW">Guinea-Bissau</option>
                                        <option value="GY">Guyana</option>
                                        <option value="HK">Hong Kong</option>
                                        <option value="HM">Heard And McDonald Islands</option>
                                        <option value="HN">Honduras</option>
                                        <option value="HR">Croatia</option>
                                        <option value="HT">Haiti</option>
                                        <option value="HU">Hungary</option>
                                        <option value="ID">Indonesia</option>
                                        <option value="IE">Ireland</option>
                                        <option value="IL">Israel</option>
                                        <option value="IM">Isle of Man</option>
                                        <option value="IN">India</option>
                                        <option value="IQ">Iraq</option>
                                        <option value="IR">Iran</option>
                                        <option value="IS">Iceland</option>
                                        <option value="IT">Italy</option>
                                        <option value="JE">Jersey Channel Islands</option>
                                        <option value="JM">Jamaica</option>
                                        <option value="JO">Jordan</option>
                                        <option value="JP">Japan</option>
                                        <option value="KE">Kenya</option>
                                        <option value="KG">Kyrgyzstan</option>
                                        <option value="KH">Cambodia</option>
                                        <option value="KI">Kiribati</option>
                                        <option value="KM">Comoros</option>
                                        <option value="KN">St Kitts-Nevis-Anguilla</option>
                                        <option value="KP">Korea, Dem Peoples' Rep</option>
                                        <option value="KR">Korea, Republic of</option>
                                        <option value="KW">Kuwait</option>
                                        <option value="KY">Cayman Islands</option>
                                        <option value="KZ">Kazakhstan</option>
                                        <option value="LA">Laos Peoples Dem Rep</option>
                                        <option value="LB">Lebanon</option>
                                        <option value="LC">St Lucia</option>
                                        <option value="LI">Lichtenstein</option>
                                        <option value="LK">Sri Lanka</option>
                                        <option value="LR">Liberia</option>
                                        <option value="LS">Lesotho</option>
                                        <option value="LT">Lithuania</option>
                                        <option value="LU">Luxembourg</option>
                                        <option value="LV">Latvia</option>
                                        <option value="LY">Libyan Arab Jamahiriya</option>
                                        <option value="MA">Morocco</option>
                                        <option value="MC">Monaco</option>
                                        <option value="MD">Moldova, Republic of</option>
                                        <option value="MG">Madagaskar</option>
                                        <option value="MK">Macedonia</option>
                                        <option value="ML">Mali</option>
                                        <option value="MM">Myanmar</option>
                                        <option value="MN">Mongolia</option>
                                        <option value="MO">Macao</option>
                                        <option value="MQ">Martinique</option>
                                        <option value="MR">Mauritania</option>
                                        <option value="MS">Montserrat</option>
                                        <option value="MT">Malta</option>
                                        <option value="MU">Mauritius</option>
                                        <option value="MV">Maldives</option>
                                        <option value="MW">Malawi</option>
                                        <option value="MX">Mexico</option>
                                        <option value="MY">Malaysia</option>
                                        <option value="MZ">Mozambique</option>
                                        <option value="NA">Namibia</option>
                                        <option value="NC">New Caledonia</option>
                                        <option value="NE">Niger</option>
                                        <option value="NF">Norfolk Island</option>
                                        <option value="NG">Nigeria</option>
                                        <option value="NI">Nicaragua</option>
                                        <option value="NL">Netherlands</option>
                                        <option value="NO">Norway</option>
                                        <option value="ML">Mali</option>
                                        <option value="NP">Nepal</option>
                                        <option value="NR">Nauru</option>
                                        <option value="NU">Niue</option>
                                        <option value="NW">New Caledonia</option>
                                        <option value="NZ">New Zealand</option>
                                        <option value="OM">Oman</option>
                                        <option value="PA">Panama</option>
                                        <option value="PE">Peru</option>
                                        <option value="PF">French Polynesia</option>
                                        <option value="PG">Papua New Guinea</option>
                                        <option value="PH">The Philipines</option>
                                        <option value="PK">Pakistan</option>
                                        <option value="PL">Poland</option>
                                        <option value="PM">St Pierre And Miquelon</option>
                                        <option value="PN">Pitcairn Islands</option>
                                        <option value="PT">Portugal</option>
                                        <option value="PY">Paraguay</option>
                                        <option value="QA">Qatar</option>
                                        <option value="RE">Reunion</option>
                                        <option value="RO">Romania</option>
                                        <option value="RU">Russian Federation</option>
                                        <option value="RW">Rwanda</option>
                                        <option value="SA">Saudi Arabia</option>
                                        <option value="SB">Solomon Islands</option>
                                        <option value="SC">Seychelles</option>
                                        <option value="SD">Sudan</option>
                                        <option value="SE">Sweden</option>
                                        <option value="SG">Singapore</option>
                                        <option value="SH">St Helena</option>
                                        <option value="SI">Solvenia</option>
                                        <option value="SJ">Svalbard Jan Mayen Isln</option>
                                        <option value="SK">Slovakia</option>
                                        <option value="SL">Sierra Leone</option>
                                        <option value="SM">San Marino</option>
                                        <option value="SN">Senegal</option>
                                        <option value="SO">Somalia</option>
                                        <option value="SR">Surinam</option>
                                        <option value="ST">Sao Tome And Principe</option>
                                        <option value="SV">El Salvador</option>
                                        <option value="SY">Syrian Arab Republic</option>
                                        <option value="SZ">Swaziland</option>
                                        <option value="TD">Chad</option>
                                        <option value="TF">French Southern Territry</option>
                                        <option value="TG">Togo</option>
                                        <option value="TH">Thailand</option>
                                        <option value="TJ">Tajikistan</option>
                                        <option value="TK">Tokelau</option>
                                        <option value="TM">Turkmenistan</option>
                                        <option value="TN">Tunisia</option>
                                        <option value="TO">Tonga</option>
                                        <option value="TP">East Temo</option>
                                        <option value="TR">Turkey</option>
                                        <option value="TT">Trinidad And Tobago</option>
                                        <option value="TV">Tuvalu</option>
                                        <option value="TW">Tiwan (Republic of China)</option>
                                        <option value="TZ">Tanzania United Republic</option>
                                        <option value="UA">Ukrainian SSR</option>
                                        <option value="UG">Uganda</option>
                                        <option value="US">United States</option>
                                        <option value="UY">Uruguay</option>
                                        <option value="UZ">Uzbekistan</option>
                                        <option value="VA">Vatican City State</option>
                                        <option value="VC">St Vincent And Grenadines</option>
                                        <option value="VE">Venezuela</option>
                                        <option value="VN">Vietnam</option>
                                        <option value="VU">Vanuatu</option>
                                        <option value="WF">Wallis And Futuna IS</option>
                                        <option value="WS">Samoa</option>
                                        <option value="YE">Yemen</option>
                                        <option value="YU">Yugoslavia</option>
                                        <option value="ZA">South Africa</option>
                                        <option value="ZM">Zambia</option>
                                        <option value="ZR">Zaire</option>
                                        <option value="ZW">Zimbabwe</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['CountryTemp'] ? 'red' : 'black' }}>
                                    ID Expiry Date:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <DatePicker
                                        selected={selectedExpiryDate}
                                        onChange={handleExpiryDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        className="required"
                                        style={{ border: highlightedFields['IdExpDt'] ? '2px solid red' : '1px black' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default IdentificationDetails;