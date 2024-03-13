import React, { useState, useEffect } from 'react';
import 'animate.css';
import '../styles/AmendCustomerButton.css';
import finalSectorData from './finalSector.json'

const GeneralInformation = ({ formData, defaultValues, handleInputChange, highlightedFields = {} }) => {
    const [isSectionOpen, setIsSectionOpen] = useState(true);
    const [isNlty1Edited, setIsNlty1Edited] = useState(false)
    const [isNlty2Edited, setIsNlty2Edited] = useState(false)
    const [isFlag1Edited, setIsFlag1Edited] = useState(false)
    const [isIncomeRangeEdited, setIsIncomeRangeEdited] = useState(false)
    const [isCasteEdited, setIsCasteEdited] = useState(false)
    const [isCustRiskEdited, setIsCustRiskEdited] = useState(false)
    const [isCustRiskImpEdited, setIsCustRiskImpEdited] = useState(false)
    const [isRiskEdited, setIsRiskEdited] = useState(false)
    const [isCounRiskImpEdited, setIsCounRiskImpEdited] = useState(false)
    const [isPrimTyp1Edited, setIsPrimTyp1Edited] = useState(false)
    const [isSeconTyp1Edited, setIsSeconTyp1Edited] = useState(false)
    const [isPrimTyp2Edited, setPrimTyp2Edited] = useState(false)
    const [isSecndryTyp2Edited, setIsSecndryTyp2Edited] = useState(false)
    const [isFnlSecEdited, setIsFnlSecEdited] = useState(false)
    const [isAttr10Edited, setIsAttr10Edited] = useState(false)
    const [isOccupCodeEdited, setIsOccupCodeEdited] = useState(false)
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(false);
    }, []);





    const toggleSection = () => {
        setIsSectionOpen(!isSectionOpen);
    };

    return (
        <div className='animate_animated animate_slideInDown'>
            <div onClick={toggleSection} style={{ cursor: 'pointer', marginTop: '60px', marginBottom: '25px', fontSize: '10px', fontWeight: 'normal' }}>
                <strong className="title">General Information</strong> - {isSectionOpen ? 'Hide' : 'Show'}
            </div>

            {isSectionOpen && (
                <>
                    <div className="info">

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['Natlty'] ? 'red' : 'black' }}>
                                    Nationality 1:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <select
                                        className="required"
                                        value={isNlty1Edited ? formData.Natlty : defaultValues.Natlty || ''}
                                        onChange={(e) => {
                                            handleInputChange('Natlty', e.target.value);
                                            setIsNlty1Edited(true);
                                        }
                                        }
                                        style={{ border: highlightedFields['Natlty'] ? '2px solid red' : '1px black' }}
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
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['Flag1'] ? 'red' : 'black' }}>
                                    SMS Flag:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <select
                                        value={isFlag1Edited ? formData.Flag1 : defaultValues.Flag1 || ''}
                                        onChange={(e) => {
                                            handleInputChange('Flag1', e.target.value);
                                            setIsFlag1Edited(true);
                                        }
                                        }
                                        style={{ border: highlightedFields['Flag1'] ? '2px solid red' : '1px black' }}
                                    >
                                        <option value="0">Select</option>
                                        <option value="Y">Yes</option>
                                        <option value="N">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['IncomeRange'] ? 'red' : 'black' }}>
                                    Monthly Income:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <select
                                        className="required"
                                        value={isIncomeRangeEdited ? formData.IncomeRange : defaultValues.IncomeRange || ''}
                                        onChange={(e) => {
                                            handleInputChange('IncomeRange', e.target.value);
                                            setIsIncomeRangeEdited(true);
                                        }
                                        }
                                        style={{ border: highlightedFields['IncomeRange'] ? '2px solid red' : '1px black' }}
                                    >
                                        <option value="">Select</option>
                                        <option value="01">0 tk to 1 Lac tk</option>
                                        <option value="02">More Than 1 Lac tk to 3 Lac tk</option>
                                        <option value="03">More Than 3 Lac tk and Above</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['Caste'] ? 'red' : 'black' }}>
                                    Religion:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <select

                                        value={isCasteEdited ? formData.Caste : defaultValues.Caste || ''}
                                        onChange={(e) => {
                                            handleInputChange('Caste', e.target.value);
                                            setIsCasteEdited(true);
                                        }
                                        }
                                        style={{ border: highlightedFields['Caste'] ? '2px solid red' : '1px black' }}
                                    >
                                        <option value="">Select</option>
                                        <option value="001">BUDDHISM</option>
                                        <option value="002">CHRISTIANITY</option>
                                        <option value="003">HINDUISM</option>
                                        <option value="004">ISLAM</option>
                                        <option value="005">JAINISM</option>
                                        <option value="006">JUDAISAM</option>
                                        <option value="007">OTHERS</option>
                                        <option value="008">SIKHISM</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['CustRisk'] ? 'red' : 'black' }}>
                                    Customer Risk Likelihood:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <select
                                        className="required"
                                        value={isCustRiskEdited ? formData.CustRisk : defaultValues.CustRisk || ''}
                                        onChange={(e) => {
                                            handleInputChange('CustRisk', e.target.value);
                                            setIsCustRiskEdited(true);
                                        }
                                        }
                                        style={{ border: highlightedFields['CustRisk'] ? '2px solid red' : '1px black' }}
                                    >
                                        <option value="">Select</option>
                                        <option value="07">Very Likely</option>
                                        <option value="08">Likely</option>
                                        <option value="09">Unlikely</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['CustRiskImp'] ? 'red' : 'black' }}>
                                    Customer Risk Impact:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <select
                                        className="required"
                                        value={isCustRiskImpEdited ? formData.CustRiskImp : defaultValues.CustRiskImp || ''}
                                        onChange={(e) => {
                                            handleInputChange('CustRiskImp', e.target.value);
                                            setIsCustRiskImpEdited(true);
                                        }
                                        }
                                        style={{ border: highlightedFields['CustRiskImp'] ? '2px solid red' : '1px black' }}
                                    >
                                        <option value="">Select</option>
                                        <option value="01">Major</option>
                                        <option value="02">Moderate</option>
                                        <option value="03">Minor</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['Risk'] ? 'red' : 'black' }}>
                                    Country Risk Likelihood:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <select
                                        className="required"
                                        value={isRiskEdited ? formData.Risk : defaultValues.Risk || ''}
                                        onChange={(e) => {
                                            handleInputChange('Risk', e.target.value);
                                            setIsRiskEdited(true);
                                        }
                                        }
                                        style={{ border: highlightedFields['Risk'] ? '2px solid red' : '1px black' }}
                                    >
                                        <option value="">Select</option>
                                        <option value="00">Very Likely</option>
                                        <option value="01">Likely</option>
                                        <option value="02">Unlikely</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['CounRiskImp'] ? 'red' : 'black' }}>
                                    Country Risk Impact:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <select
                                        className="required"
                                        value={isCounRiskImpEdited ? formData.CounRiskImp : defaultValues.CounRiskImp || ''}
                                        onChange={(e) => {
                                            handleInputChange('CounRiskImp', e.target.value);
                                            setIsCounRiskImpEdited(true);
                                        }
                                        }
                                        style={{ border: highlightedFields['CounRiskImp'] ? '2px solid red' : '1px black' }}
                                    >
                                        <option value="">Select</option>
                                        <option value="01">Major</option>
                                        <option value="02">Moderate</option>
                                        <option value="03">Minor</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "flex", width: "100%" }}>
                            <div style={{ flex: "20%", paddingRight: "10px" }}>
                                <label style={{ display: "flex", alignItems: "center", color: highlightedFields['PrimTyp1'] ? 'red' : 'black' }}>
                                    Primary Sector Type:
                                </label>
                            </div>
                            <div style={{ flex: "80%", paddingLeft: "10px" }}>
                                <div className="value">
                                    <select
                                        className="required"
                                        value={isPrimTyp1Edited ? formData.PrimTyp1 : defaultValues.PrimTyp1 || ''}
                                        onChange={(e) => {
                                            handleInputChange('PrimTyp1', e.target.value);
                                            setIsPrimTyp1Edited(true);
                                            setIsSeconTyp1Edited(true);
                                            setPrimTyp2Edited(true);
                                            setIsSecndryTyp2Edited(true);
                                            setIsFnlSecEdited(true);
                                        }
                                        }
                                        style={{ border: highlightedFields['PrimTyp1'] ? '2px solid red' : '1px black' }}
                                    >
                                        <option value=''>Select</option>
                                        {(defaultValues.CustGrp === '01') && (
                                            <>
                                                <option value="02">PRIVATE SECTOR (Occupations/Activities)</option>
                                            </>
                                        )} {(defaultValues.CustGrp === '02') && (
                                            <>
                                                <option value="02">PRIVATE SECTOR (Occupations/Activities)</option>
                                                <option value="01">PUBLIC SECTOR</option>
                                            </>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "flex", width: "100%" }}>
                            <div style={{ flex: "20%", paddingRight: "10px" }}>
                                <label style={{ display: "flex", alignItems: "center", color: highlightedFields['SeconTyp1'] ? 'red' : 'black' }}>
                                    Secondary Sector Type:
                                </label>
                            </div>
                            <div style={{ flex: "80%", paddingLeft: "10px" }}>
                                <div className="value">
                                    <select
                                        className="required"
                                        value={isSeconTyp1Edited ? formData.SeconTyp1 : defaultValues.SeconTyp1 || ''}
                                        onChange={(e) => {
                                            handleInputChange('SeconTyp1', e.target.value);
                                            setIsSeconTyp1Edited(true);
                                            setPrimTyp2Edited(true);
                                            setIsSecndryTyp2Edited(true);
                                            setIsFnlSecEdited(true);
                                        }
                                        }
                                        disabled={!isPrimTyp1Edited} 
                                        style={{ border: highlightedFields['SeconTyp1'] ? '2px solid red' : '1px black' }}
                                    >
                                        <option value=''>Select</option>
                                        {(formData.PrimTyp1 === '01' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '01')) && (
                                            <>
                                                <option value="01">GOVERNMENT SECTOR</option>
                                                <option value="02">OTHER PUBLIC SECTOR (OTHER THAN GOVT.)</option>
                                            </>
                                        )} {(formData.PrimTyp1 === '02' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '02')) && (
                                            <>
                                                <option value="03">PRIVATE SECTOR (Occupations/Activities)</option>
                                            </>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "flex", width: "100%" }}>
                            <div style={{ flex: "20%", paddingRight: "10px" }}>
                                <label style={{ display: "flex", alignItems: "center", color: highlightedFields['PrimTyp2'] ? 'red' : 'black' }}>
                                    Primary Sector Code:
                                </label>
                            </div>
                            <div style={{ flex: "80%", paddingLeft: "10px" }}>
                                <div className="value">
                                    <select
                                        className="required"
                                        value={isPrimTyp2Edited ? formData.PrimTyp2 : defaultValues.PrimTyp2 || ''}
                                        onChange={(e) => {
                                            handleInputChange('PrimTyp2', e.target.value);
                                            setPrimTyp2Edited(true);
                                            setIsSecndryTyp2Edited(true);
                                            setIsFnlSecEdited(true);
                                        }
                                        }
                                        disabled={!isSeconTyp1Edited} 
                                        style={{ border: highlightedFields['PrimTyp2'] ? '2px solid red' : '1px black' }}
                                    >
                                        <option value=''>Select</option>
                                        {(defaultValues.CustGrp === '01') && (formData.PrimTyp1 === '01' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '01')) && (formData.SeconTyp1 === '01' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '01')) && (
                                            <>
                                                <option value="012120">Autonomous and Semi-Autonomous Bodies</option>
                                                <option value="111000">Food Ministry ( Including food divisions/directorates)</option>
                                                <option value="012110">Presidency, Prime Minister's Office, Other Ministries, Parliament, Judiciary, all Directorates and Departments</option>

                                            </>
                                        )} {(defaultValues.CustGrp === '01') && (formData.PrimTyp1 === '01' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '01')) && (formData.SeconTyp1 === '02' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '02')) && (
                                            <>
                                                <option value="012250">Insurance Companies and Pension Funds (ICPF)-Public</option>
                                                <option value="012210">Local Authorities</option>
                                                <option value="012230">Non-Bank Depository Corporations (NBDC)- Public</option>
                                                <option value="012240">Other Financial Intermediaries (OFI) except DMBs-Public</option>
                                                <option value="012220">Public Non-financial Corporations</option>
                                            </>
                                        )} {(defaultValues.CustGrp === '01') && (formData.PrimTyp1 === '02' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '02')) && (formData.SeconTyp1 === '03' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '03')) && (
                                            <>

                                                <option value="012390">Households ( Individual Customers)</option>
                                            </>
                                        )} 
                                        {(defaultValues.CustGrp === '02') && (formData.PrimTyp1 === '01' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '01')) && (formData.SeconTyp1 === '01' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '01')) && (
                                            <>
                                                <option value="012120">Autonomous and Semi-Autonomous Bodies</option>
                                                <option value="111000">Food Ministry ( Including food divisions/directorates)</option>
                                                <option value="012110">Presidency, Prime Minister's Office, Other Ministries, Parliament, Judiciary, all Directorates and Departments</option>

                                            </>
                                        )}
                                        {(defaultValues.CustGrp === '02') && (formData.PrimTyp1 === '01' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '01')) && (formData.SeconTyp1 === '02' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '02')) && (
                                            <>
                                                <option value="012250">Insurance Companies and Pension Funds (ICPF)-Public</option>
                                                <option value="012210">Local Authorities</option>
                                                <option value="012230">Non-Bank Depository Corporations (NBDC)- Public</option>
                                                <option value="012240">Other Financial Intermediaries (OFI) except DMBs-Public</option>
                                                <option value="012220">Public Non-financial Corporations</option>
                                            </>
                                        )}
                                        {(defaultValues.CustGrp === '02') && (formData.PrimTyp1 === '02' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '02')) && (formData.SeconTyp1 === '03' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '03')) && (
                                            <>
                                                <option value="012500">Deposit Money Banks</option>
                                                <option value="012330">FINANCIAL CORPORATIONS - Non-Bank Depository Corporations -Private</option>
                                                <option value="012340">FINANCIAL CORPORATIONS - Other Financial Intermediaries-- Private (Except DMBs)</option>
                                                <option value="012360">Financial Auxiliaries</option>
                                                <option value="912051">Foreign Offices/ Embassies/Enterprises/Companies/Liaison Offices/Firms/NGOs ( Excluding Multinational Companies incorporated in Bangladesh)</option>
                                                <option value="012350">Insurance Companies and Pension Funds-Private</option>
                                                <option value="012370">NON-FINANCIAL CORPORATIONS PRIVATE</option>
                                                <option value="012380">Non-profit institutions serving households (NPISH)</option>
                                            </>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: "flex", width: "100%" }}>
                            <div style={{ flex: "20%", paddingRight: "10px" }}>
                                <label style={{ display: "flex", alignItems: "center", color: highlightedFields['SecndryTyp2'] ? 'red' : 'black' }}>
                                    Secondary Sector Code:
                                </label>
                            </div>
                            <div style={{ flex: "80%", paddingLeft: "10px" }}>
                                <div className="value">
                                    <select
                                        className="required"
                                        value={isSecndryTyp2Edited ? formData.SecndryTyp2 : defaultValues.SecndryTyp2 || ''}
                                        onChange={(e) => {
                                            handleInputChange('SecndryTyp2', e.target.value);
                                            setIsSecndryTyp2Edited(true);
                                            setIsFnlSecEdited(true);
                                        }
                                        }
                                        disabled={!isPrimTyp2Edited} 
                                        style={{ border: highlightedFields['SecndryTyp2'] ? '2px solid red' : '1px black' }}
                                    >
                                        <option value="">Select</option>
                                        {(formData.PrimTyp1 === '01' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '01')) && (formData.SeconTyp1 === '01' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '01')) && (formData.PrimTyp2 === '012110' || (!isPrimTyp2Edited && defaultValues.PrimTyp2 === '012110')) && (
                                            <>
                                                <option value="12110C">Bangladesh Post Office (Savings Bank Scheme)</option>
                                                <option value="12110B">Directorate of Bangladesh Post Office (Postal services)</option>
                                                <option value="12110A">Directorates, Departments and other Govt. offices</option>

                                            </>
                                        )} {(formData.PrimTyp1 === '01' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '01')) && (formData.SeconTyp1 === '01' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '01')) && (formData.PrimTyp2 === '012120' || (!isPrimTyp2Edited && defaultValues.PrimTyp2 === '012120')) && (
                                            <>
                                                <option value="12120C">Academy, Research Institute, Training Institutes, Council & Development Centre</option>
                                                <option value="12120B">Government Educational Institutions</option>
                                                <option value="12120D">Other Autonomous & Semi-autonomous bodies (Commission, Authority, Development Board/Centre/Foundations etc.)</option>
                                                <option value="12120E">Publicity And News Media</option>
                                                <option value="12120A">Text Book Board and Education Boards</option>

                                            </>
                                        )} {(formData.PrimTyp1 === '01' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '01')) && (formData.SeconTyp1 === '02' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '02')) && (formData.PrimTyp2 === '012210' || (!isPrimTyp2Edited && defaultValues.PrimTyp2 === '012210')) && (
                                            <>

                                                <option value="012210">Local Authorities</option>
                                            </>
                                        )}
                                        {(formData.PrimTyp1 === '01' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '01')) && (formData.SeconTyp1 === '02' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '02')) && (formData.PrimTyp2 === '012220' || (!isPrimTyp2Edited && defaultValues.PrimTyp2 === '012220')) && (
                                            <>
                                                <option value="12220C">Bangladesh Chemical Industries Corporation and Related Enterprises - Public Non-financial Corporations</option>
                                                <option value="12220E">Bangladesh Jute Mills Corporation and Related Enterprises - Public Non-financial Corporations</option>
                                                <option value="12220F">Bangladesh Petroleum Corporation and Bangladesh Oil, Gas and Mineral Corporation and Related Enterprises</option>
                                                <option value="12220G">Bangladesh Power Development Board & Related Enterprises - Public Non-financial Corporations</option>
                                                <option value="12220D">Bangladesh Steel and Engineering Corporation and Related Enterprises</option>
                                                <option value="12220B">Bangladesh Sugar & Food Industries Corporation and Related Enterprises - Public Non-financial Corporations</option>
                                                <option value="12220A">Bangladesh Textile Mills Corporation & Related Enterprises - Public Non-financial Corporations</option>
                                                <option value="12220H">Other Non-financial Corporations- Public - Public Non-financial Corporations</option>


                                            </>
                                        )} {(formData.PrimTyp1 === '01' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '01')) && (formData.SeconTyp1 === '02' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '02')) && (formData.PrimTyp2 === '012230' || (!isPrimTyp2Edited && defaultValues.PrimTyp2 === '012230')) && (
                                            <>
                                                <option value="012230">Non-Bank Depository Corporations (NBDC)- Public</option>

                                            </>
                                        )} {(formData.PrimTyp1 === '01' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '01')) && (formData.SeconTyp1 === '02' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '02')) && (formData.PrimTyp2 === '012240' || (!isPrimTyp2Edited && defaultValues.PrimTyp2 === '012240')) && (
                                            <>

                                                <option value="012240">Other Financial Intermediaries (OFI) except DMBs-Public</option>
                                            </>
                                        )}{(formData.PrimTyp1 === '01' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '01')) && (formData.SeconTyp1 === '02' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '02')) && (formData.PrimTyp2 === '012250' || (!isPrimTyp2Edited && defaultValues.PrimTyp2 === '012250')) && (
                                            <>
                                                <option value="012250">Insurance Companies and Pension Funds (ICPF)-Public</option>

                                            </>
                                        )} {(formData.PrimTyp1 === '02' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '02')) && (formData.SeconTyp1 === '03' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '03')) && (formData.PrimTyp2 === '012330' || (!isPrimTyp2Edited && defaultValues.PrimTyp2 === '012330')) && (
                                            <>

                                                <option value="012330">FINANCIAL CORPORATIONS - A. Non-Bank Depository Corporations -Private</option>
                                            </>
                                        )}{(formData.PrimTyp1 === '02' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '02')) && (formData.SeconTyp1 === '03' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '03')) && (formData.PrimTyp2 === '012340' || (!isPrimTyp2Edited && defaultValues.PrimTyp2 === '012340')) && (
                                            <>

                                                <option value="012340">FINANCIAL CORPORATIONS - Other Financial Intermediaries-- Private (Except DMBs)</option>
                                            </>
                                        )}{(formData.PrimTyp1 === '02' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '02')) && (formData.SeconTyp1 === '03' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '03')) && (formData.PrimTyp2 === '012350' || (!isPrimTyp2Edited && defaultValues.PrimTyp2 === '012350')) && (
                                            <>
                                                <option value="012350">Insurance Companies and Pension Funds-Private</option>

                                            </>
                                        )}{(formData.PrimTyp1 === '02' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '02')) && (formData.SeconTyp1 === '03' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '03')) && (formData.PrimTyp2 === '012360' || (!isPrimTyp2Edited && defaultValues.PrimTyp2 === '012360')) && (
                                            <>
                                                <option value="012360">Financial Auxiliaries</option>

                                            </>
                                        )}
                                        {(formData.PrimTyp1 === '02' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '02')) && (formData.SeconTyp1 === '03' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '03')) && (formData.PrimTyp2 === '012370' || (!isPrimTyp2Edited && defaultValues.PrimTyp2 === '012370')) && (
                                            <>
                                                <option value="12370A">Agriculture, Fishing & Livestock</option>
                                                <option value="12370C">Commerce & Trade (excluding individual businessmen)</option>
                                                <option value="1237B1">Industries -  Manufactures/Manufacturing Companies</option>
                                                <option value="1237B2">Industries - Gas/Electricity/Power Generating Companies</option>
                                                <option value="1237B3">Industries - Service Industries</option>
                                                <option value="1237B4">Inustries - Agro-based and agro-processing industry</option>
                                                <option value="12370D">Non Govt. Publicity & News Media</option>
                                                <option value="12370F">Other Private Sector ( Official Account n.i.e)</option>
                                                <option value="12370E">Private Educational Institutions</option>

                                            </>
                                        )}
                                        {(formData.PrimTyp1 === '02' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '02')) && (formData.SeconTyp1 === '03' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '03')) && (formData.PrimTyp2 === '012380' || (!isPrimTyp2Edited && defaultValues.PrimTyp2 === '012380')) && (
                                            <>

                                                <option value="012380">Non-profit institutions serving households (NPISH)</option>
                                            </>
                                        )}
                                        {(formData.PrimTyp1 === '02' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '02')) && (formData.SeconTyp1 === '03' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '03')) && (formData.PrimTyp2 === '012390' || (!isPrimTyp2Edited && defaultValues.PrimTyp2 === '012390')) && (
                                            <>

                                                <option value="012390">Households ( Individual Customers)</option>
                                            </>
                                        )}
                                        {(formData.PrimTyp1 === '02' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '02')) && (formData.SeconTyp1 === '03' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '03')) && (formData.PrimTyp2 === '012500' || (!isPrimTyp2Edited && defaultValues.PrimTyp2 === '012500')) && (
                                            <>

                                                <option value="012500">Deposit Money Banks</option>
                                            </>
                                        )}
                                        {(formData.PrimTyp1 === '01' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '01')) && (formData.SeconTyp1 === '01' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '01')) && (formData.PrimTyp2 === '111000' || (!isPrimTyp2Edited && defaultValues.PrimTyp2 === '111000')) && (
                                            <>

                                                <option value="111000">Food Ministry ( Including food divisions/directorates)</option>
                                            </>
                                        )}
                                        {(formData.PrimTyp1 === '02' || (!isPrimTyp1Edited && defaultValues.PrimTyp1 === '02')) && (formData.SeconTyp1 === '03' || (!isSeconTyp1Edited && defaultValues.SeconTyp1 === '03')) && (formData.PrimTyp2 === '912051' || (!isPrimTyp2Edited && defaultValues.PrimTyp2 === '912051')) && (
                                            <>

                                                <option value="912051">Foreign Offices/ Embassies/Enterprises/Companies/Liaison Offices/Firms/NGOs ( Excluding Multinational Companies incorporated in Bangladesh)</option>
                                            </>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['FnlSec'] ? 'red' : 'black' }}>
                                    Final Sector Code:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <select
                                        className="required"
                                        value={isFnlSecEdited ? formData.FnlSec : defaultValues.FnlSec || ''}
                                        onChange={(e) => {
                                            handleInputChange('FnlSec', e.target.value);
                                            setIsFnlSecEdited(true);
                                        }}
                                        disabled={!isSecndryTyp2Edited} 
                                        style={{ border: highlightedFields['FnlSec'] ? '2px solid red' : '1px black' }}
                                    >
                                        <option value="">Select</option>
                                        {finalSectorData[(formData.SecndryTyp2 || (!isSecndryTyp2Edited && defaultValues.SecndryTyp2))] &&
                                            finalSectorData[(formData.SecndryTyp2 || (!isSecndryTyp2Edited && defaultValues.SecndryTyp2))].map((sector) => (
                                                <option key={sector.value} value={sector.value}>
                                                    {sector.text}
                                                </option>
                                            ))}
                                    </select>

                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['PrevOccupationalCode'] ? 'red' : 'black' }}>
                                    Occupation or Profession:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <select
                                        value={isOccupCodeEdited ? formData.PrevOccupationalCode : defaultValues.PrevOccupationalCode || ''}
                                        onChange={(e) => {
                                            handleInputChange('PrevOccupationalCode', e.target.value);
                                            setIsOccupCodeEdited(true);
                                        }
                                        }
                                        style={{ border: highlightedFields['PrevOccupationalCode'] ? '2px solid red' : '1px black' }}
                                    >
                                        <option value="">Select</option>
                                        <option value="0000">Select</option>
                                        <option value="0001">Jewelry/Jewelry Shop/ Precious Metal Business</option>
                                        <option value="0002">Money exchanger/Courier Service/ Mobile  Agent Banking</option>
                                        <option value="0003">Real Estate Developer/ Agent</option>
                                        <option value="0004">Construction Project Promoter/ Contractor</option>
                                        <option value="0005">Offshore Corporation</option>
                                        <option value="0006">Painting/Antique Dealer</option>
                                        <option value="0007">Restaurant/Bar/Night Club/Residential Hotel/Parlor Business</option>
                                        <option value="0008">Import-Export Agent</option>
                                        <option value="0009">Cash Money investor (monthly 25 lac taka and above)</option>
                                        <option value="0010">Share/Stock Dealer</option>
                                        <option value="0011">Manpower Export Business</option>
                                        <option value="0012">Various Place Activities</option>
                                        <option value="0013">Film Production/ Film Distribution Firms</option>
                                        <option value="0014">Weapon Business</option>
                                        <option value="0015">Garments Business/ Garments Accessories/ Buying House</option>
                                        <option value="0016">Mobile Phone Operator</option>
                                        <option value="0017">Pilot/Flight Attendant</option>
                                        <option value="0018">Trusty</option>
                                        <option value="0019">Share/Stock  Market Investor</option>
                                        <option value="0020">Software Business/ ICT Business</option>
                                        <option value="0021">Expatriate (Foreign People working in Bangladesh)</option>
                                        <option value="0022">Co-Operative</option>
                                        <option value="0023">Yearly 1 Crore and above taka investor</option>
                                        <option value="0024">Travel Agent</option>
                                        <option value="0025">Freight/ Shipping / Cargo Agent</option>
                                        <option value="0026">Auto Car Business (New/ Recondition)</option>
                                        <option value="0027">Leather & Leather Related Goods Business</option>
                                        <option value="0028">House Building Materials Business</option>
                                        <option value="0029">Professionals (Journalist, Lawyer, Dr., Eng., CA)</option>
                                        <option value="0030">Director (Private or Public Limited Company)</option>
                                        <option value="0031">Senior Management People of Multi-national companies</option>
                                        <option value="0032">Housewife</option>
                                        <option value="0033">ICT Sector Related Service</option>
                                        <option value="0034">Player/Media Celebrity/Producer/Director of Media</option>
                                        <option value="0035">Freelance Software Developer</option>
                                        <option value="0036">Religious Institution / Organization</option>
                                        <option value="0037">NGO</option>
                                        <option value="0038">Clinic/ Hospital</option>
                                        <option value="0039">Business Agent</option>
                                        <option value="0040">Government Service Holder</option>
                                        <option value="0041">Land Lord</option>
                                        <option value="0042">Yarn Business / Sprinkle Business</option>
                                        <option value="0043">Vehicle Operator</option>
                                        <option value="0044">Tobacco and Cigarette Business</option>
                                        <option value="0045">Entertainment Company/ Park</option>
                                        <option value="0046">Motor Parts/ Workshop Business</option>
                                        <option value="0047">Private service managerial</option>
                                        <option value="0048">Club/ Society</option>
                                        <option value="0049">Insurance/ Brokerage Agency</option>
                                        <option value="0050">Data Entry/ Call Center</option>
                                        <option value="0051">Leasing/ Finance Company</option>
                                        <option value="0052">Teacher (Govt./Private/ Autonomous Edu. Inst.)</option>
                                        <option value="0053">Service (Private)</option>
                                        <option value="0054">Small Businessman (Yearly Turnover below 50 lac taka)</option>
                                        <option value="0055">Self Employed Professional</option>
                                        <option value="0056">Computer/ Mobile Phone Dealer</option>
                                        <option value="0057">Producer (Except Weapon)</option>
                                        <option value="0058">Student</option>
                                        <option value="0059">School/College/Madrasa</option>
                                        <option value="0060">Shop Owner (Small)</option>
                                        <option value="0061">Retired individual</option>
                                        <option value="0062">Farmer/Labor/Fisherman</option>
                                        <option value="0063">Others</option>
                                    </select>
                                </div>
                            </div>
                        </div>



                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['Attr10'] ? 'red' : 'black' }}>
                                    Occupation Details:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <input

                                        type="text"
                                        value={isAttr10Edited ? formData.Attr10 : defaultValues.Attr10 || ''}
                                        onChange={(e) => {
                                            handleInputChange('Attr10', e.target.value);
                                            setIsAttr10Edited(true);
                                        }
                                        }
                                        style={{ border: highlightedFields['Attr10'] ? '2px solid red' : '1px black' }}
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

export default GeneralInformation;