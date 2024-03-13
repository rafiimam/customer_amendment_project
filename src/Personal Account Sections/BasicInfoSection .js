import React, { useState, useEffect } from "react";
import 'animate.css';
import '../styles/AmendCustomerButton.css';
import DatePicker from 'react-datepicker';

const BasicInfoSection = ({ formData, defaultValues, handleInputChange, highlightedFields = {} }) => {
  const [isSectionOpen, setIsSectionOpen] = useState(true);
  const [isCustTypEdited, setIsCustTypEdited] = useState(false);
  const [isGndrCodeEdited, setIsGndrCodeEdited] = useState(false);
  const [isCustomerNameEdited, setIsCustomerNameEdited] = useState(false);
  const [isTitleCodeEdited, setIsTitleCodeEdited] = useState(false);
  const [isFirstNameEdited, setIsFirstNameEdited] = useState(false);
  const [isLastNameEdited, setIsLastNameEdited] = useState(false);
  const [isFatherNameEdited, setIsFatherNameEdited] = useState(false);
  const [isMotherMaidenNameEdited, setIsMotherMaidenNameEdited] = useState(false);
  const [isDtOfBirthEdited, setIsDtOfBirthEdited] = useState(false);
  const [isDmcleEdited, setIsDmcleEdited] = useState(false);
  const [isResdncyStatEdited, setIsResdncyStatEdited] = useState(false);
  const [isCountryOfBirthEdited, setIsCountryOfBirthEdited] = useState(false);
  const [isDisttBirthEdited, setIsDisttBirthEdited] = useState(false);
  const [isCountryOfTaxRsdnceEdited, setIsCountryOfTaxRsdnceEdited] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleSection = () => {
    setIsSectionOpen(!isSectionOpen);
  };

  useEffect(() => {
    if (defaultValues.DtOfBirth) {
      const year = defaultValues.DtOfBirth.slice(4);
      const month = defaultValues.DtOfBirth.slice(2, 4) - 1;
      const day = defaultValues.DtOfBirth.slice(0, 2);
      setSelectedDate(new Date(year, month, day));
    }
  }, [defaultValues.DtOfBirth]);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return day + month + year;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsDtOfBirthEdited(true);
    const formattedDate = formatDate(date);
    handleInputChange('DtOfBirth', formattedDate);
  };

  return (
    <div className='animate__animated animate__slideInDown'>
      <div
        onClick={toggleSection}
        style={{
          cursor: "pointer",
          marginBottom: "25px",
          fontSize: "10px",
          fontWeight: "normal",
        }}
      >
        <strong className="title">Main Details</strong> -{" "}
        {isSectionOpen ? "Hide" : "Show"}
      </div>

      {isSectionOpen && (
        <>
          <div className="info">
            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ flex: "20%", paddingRight: "10px" }}>
                <label style={{ display: "flex", alignItems: "center", color: highlightedFields['CustTyp'] ? 'red' : 'black' }}>
                  Customer Type:
                </label>
              </div>
              <div style={{ flex: "80%", paddingLeft: "10px" }}>
                <div className="value">
                  <select
                    value={isCustTypEdited ? formData.CustTyp : defaultValues.CustTyp || ''}
                    onChange={(e) => {
                      handleInputChange('CustTyp', e.target.value);
                      setIsCustTypEdited(true);
                    }
                    }
                    style={{ border: highlightedFields['CustTyp'] ? '2px solid red' : '1px black' }}
                  >
                    <option value="0103">General</option>
                    <option value="0104">Jamuna Bank Employee</option>
                    <option value="0105">Senior Citizen</option>
                    <option value="0106">Minor</option>
                    <option value="0107">Foreign Nationals</option>
                    <option value="0108">Executor</option>
                    <option value="0109">Administrator</option>
                    <option value="0110">Illiterate Person</option>
                    <option value="0111">Pardanasheen Woman</option>
                    <option value="0112">Blind Man</option>
                    <option value="0113">Unsound Mind</option>
                    <option value="0114">Drunker / Intoxicated Person</option>
                    <option value="0115">Liquidators</option>
                    <option value="0116">Lunatics</option>
                  </select>
                </div>
              </div>
            </div>


            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ flex: "20%", paddingRight: "10px" }}>
                <label style={{ display: "flex", alignItems: "center", color: highlightedFields['GndrCode'] ? 'red' : 'black' }}>
                  Gender:
                </label>
              </div>
              <div style={{ flex: "80%", paddingLeft: "10px" }}>
                <div className="value">
                  <select
                    value={isGndrCodeEdited ? formData.GndrCode : defaultValues.GndrCode || ''}
                    onChange={(e) => {
                      handleInputChange('GndrCode', e.target.value);
                      setIsGndrCodeEdited(true);
                    }
                    }
                    style={{ border: highlightedFields['GndrCode'] ? '2px solid red' : '1px black' }}
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Third Gender</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ flex: "20%", paddingRight: "10px" }}>
                <label style={{ display: "flex", alignItems: "center", color: highlightedFields['TitleCode'] ? 'red' : 'black' }}>
                  Title:
                </label>
              </div>
              <div style={{ flex: "80%", paddingLeft: "10px" }}>
                <div className="value">
                  <select
                    value={isTitleCodeEdited ? formData.TitleCode : defaultValues.TitleCode || ''}
                    onChange={(e) => {
                      handleInputChange('TitleCode', e.target.value);
                      setIsTitleCodeEdited(true);
                    }}
                    style={{ border: highlightedFields['TitleCode'] ? '2px solid red' : '1px black' }}
                  >
                    {(formData.GndrCode === "M" || (!isGndrCodeEdited && defaultValues.GndrCode === 'M')) && (
                      <>
                        <option value="01">Mr.</option>
                        <option value="04">Master</option>
                      </>
                    )}
                    {(formData.GndrCode === "F" || (!isGndrCodeEdited && defaultValues.GndrCode === 'F')) && (
                      <>
                        <option value="02">Ms.</option>
                        <option value="03">Mrs.</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>



            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ flex: "20%", paddingRight: "10px" }}>
                <label style={{ display: "flex", alignItems: "center", color: highlightedFields['FirstName'] ? 'red' : 'black' }}>
                  First Name:
                </label>
              </div>
              <div style={{ flex: "80%", paddingLeft: "10px" }}>
                <div className="value">
                  <input
                    type="text"
                    value={isFirstNameEdited ? formData.FirstName : defaultValues.FirstName || ''}
                    onChange={(e) => {
                      handleInputChange('FirstName', e.target.value);
                      setIsFirstNameEdited(true);
                    }
                    }
                    style={{ border: highlightedFields['FirstName'] ? '2px solid red' : '1px black' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ flex: "20%", paddingRight: "10px" }}>
                <label style={{ display: "flex", alignItems: "center", color: highlightedFields['LastName'] ? 'red' : 'black' }}>
                  Last Name:
                </label>
              </div>
              <div style={{ flex: "80%", paddingLeft: "10px" }}>
                <div className="value">
                  <input
                    type="text"
                    value={isLastNameEdited ? formData.LastName : defaultValues.LastName || ''}
                    onChange={(e) => {
                      handleInputChange('LastName', e.target.value);
                      setIsLastNameEdited(true);
                    }
                    }
                    style={{ border: highlightedFields['LastName'] ? '2px solid red' : '1px black' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ flex: "20%", paddingRight: "10px" }}>
                <label style={{ display: "flex", alignItems: "center", color: highlightedFields['CustomerName'] ? 'red' : 'black' }}>
                  Customer’s Name (CIB):
                </label>
              </div>
              <div style={{ flex: "80%", paddingLeft: "10px" }}>
                <div className="value">
                  <input
                  className="required"
                    type="text"
                    value={isCustomerNameEdited ? formData.CustomerName : defaultValues.CustomerName || ''}
                    onChange={(e) => {
                      handleInputChange('CustomerName', e.target.value);
                      setIsCustomerNameEdited(true);
                    }
                    }
                    style={{ border: highlightedFields['CustomerName'] ? '2px solid red' : '1px black' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ flex: "20%", paddingRight: "10px" }}>
                <label style={{ display: "flex", alignItems: "center", color: highlightedFields['FatherName'] ? 'red' : 'black' }}>
                  Father's' Name:
                </label>
              </div>
              <div style={{ flex: "80%", paddingLeft: "10px" }}>
                <div className="value">
                  <input
                    type="text"
                    value={isFatherNameEdited ? formData.FatherName : defaultValues.FatherName || ''}
                    onChange={(e) => {
                      handleInputChange('FatherName', e.target.value);
                      setIsFatherNameEdited(true);
                    }
                    }
                    style={{ border: highlightedFields['FatherName'] ? '2px solid red' : '1px black' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ flex: "20%", paddingRight: "10px" }}>
                <label style={{ display: "flex", alignItems: "center", color: highlightedFields['MotherMaidenName'] ? 'red' : 'black' }}>
                  Mother's' Name:
                </label>
              </div>
              <div style={{ flex: "80%", paddingLeft: "10px" }}>
                <div className="value">
                  <input
                    type="text"
                    value={isMotherMaidenNameEdited ? formData.MotherMaidenName : defaultValues.MotherMaidenName || ''}
                    onChange={(e) => {
                      handleInputChange('MotherMaidenName', e.target.value);
                      setIsMotherMaidenNameEdited(true);
                    }
                    }
                    style={{ border: highlightedFields['MotherMaidenName'] ? '2px solid red' : '1px black' }}
                  />
                </div>
              </div>
            </div>


            <div style={{ display: 'flex', width: '100%' }}>
              <div style={{ flex: '20%', paddingRight: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['DtOfBirth'] ? 'red' : 'black' }}>
                  Date of Birth:
                </label>
              </div>
              <div style={{ flex: '80%', paddingLeft: '10px' }}>
                <div className="value">
                  <DatePicker
                    selected={selectedDate} // Set the selected date
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy" // Format of the displayed date
                    maxDate={new Date()}
                    className="required"
                    style={{ border: highlightedFields['DtOfBirth'] ? '2px solid red' : '1px black' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ flex: "20%", paddingRight: "10px" }}>
                <label style={{ display: "flex", alignItems: "center" , color: highlightedFields['Dmcle'] ? 'red' : 'black'}}>
                  Domicile:
                </label>
              </div>
              <div style={{ flex: "80%", paddingLeft: "10px" }}>
                <div className="value">
                  <select
                    value={isDmcleEdited ? formData.Dmcle : defaultValues.Dmcle || ''}
                    onChange={(e) => {
                      handleInputChange('Dmcle', e.target.value);
                      setIsDmcleEdited(true);
                    }
                    }
                    style={{ border: highlightedFields['Dmcle'] ? '2px solid red' : '1px black' }}
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

            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ flex: "20%", paddingRight: "10px" }}>
                <label style={{ display: "flex", alignItems: "center", color: highlightedFields['ResdncyStat'] ? 'red' : 'black' }}>
                  Residential Status:
                </label>
              </div>
              <div style={{ flex: "80%", paddingLeft: "10px" }}>
                <div className="value">
                  <select
                    className="required"
                    value={isResdncyStatEdited ? formData.ResdncyStat : defaultValues.ResdncyStat || ''}
                    onChange={(e) => {
                      handleInputChange('ResdncyStat', e.target.value);
                      setIsResdncyStatEdited(true);
                    }
                    }
                    style={{ border: highlightedFields['ResdncyStat'] ? '2px solid red' : '1px black' }}
                  >
                    <option value="1">Resident</option>
                    <option value="2">Non Resident</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ flex: "20%", paddingRight: "10px" }}>
                <label style={{ display: "flex", alignItems: "center", color: highlightedFields['CountryOfBirth'] ? 'red' : 'black' }}>
                  Country of Birth:
                </label>
              </div>
              <div style={{ flex: "80%", paddingLeft: "10px" }}>
                <div className="value">
                  <select
                    className="required"
                    value={isCountryOfBirthEdited ? formData.CountryOfBirth : defaultValues.CountryOfBirth || ''}
                    onChange={(e) => {
                      handleInputChange('CountryOfBirth', e.target.value);
                      setIsCountryOfBirthEdited(true);
                    }
                    }
                    style={{ border: highlightedFields['CountryOfBirth'] ? '2px solid red' : '1px black' }}
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

            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ flex: "20%", paddingRight: "10px" }}>
                <label style={{ display: "flex", alignItems: "center", color: highlightedFields['DisttBirth'] ? 'red' : 'black' }}>
                  District of Birth:
                </label>
              </div>
              <div style={{ flex: "80%", paddingLeft: "10px" }}>
                <div className="value">
                  <select
                    className="required"
                    value={isDisttBirthEdited ? formData.DisttBirth : defaultValues.DisttBirth || ''}
                    onChange={(e) => {
                      handleInputChange('DisttBirth', e.target.value);
                      setIsDisttBirthEdited(true);
                    }
                    }
                    style={{ border: highlightedFields['DisttBirth'] ? '2px solid red' : '1px black' }}
                  >
                    <option>Select</option>
                    <option value="001">Dhaka</option>
                    <option value="002">Faridpur</option>
                    <option value="003">Gazipur</option>
                    <option value="004">Gopalganj</option>
                    <option value="005">Kishoreganj</option>
                    <option value="006">Madaripur</option>
                    <option value="007">Manikganj</option>
                    <option value="008">Munshiganj</option>
                    <option value="009">Narayanganj</option>
                    <option value="010">Narsingdi</option>
                    <option value="011">Rajsbari</option>
                    <option value="012">Shariyatpur</option>
                    <option value="013">Tangail</option>
                    <option value="014">Bandarban</option>
                    <option value="015">Brahmanbaria</option>
                    <option value="016">Chandpur</option>
                    <option value="017">Chattogram</option>
                    <option value="018">Cumilla</option>
                    <option value="019">Cox's Bazar</option>
                    <option value="020">Feni</option>
                    <option value="021">Khagrachari</option>
                    <option value="022">Lakhmipur</option>
                    <option value="023">Noakhali</option>
                    <option value="024">Rangamati</option>
                    <option value="025">Barguna</option>
                    <option value="026">Barishal</option>
                    <option value="027">Bhola</option>
                    <option value="028">Jhalokathi</option>
                    <option value="029">Patuakhali</option>
                    <option value="030">Pirojpur</option>
                    <option value="031">Bagherhat</option>
                    <option value="032">Chuadanga</option>
                    <option value="033">Jashore</option>
                    <option value="034">Jinaidaha</option>
                    <option value="035">Khulna</option>
                    <option value="036">Kushtia</option>
                    <option value="037">Magura</option>
                    <option value="038">Meherpur</option>
                    <option value="039">Narail</option>
                    <option value="040">Shatkhira</option>
                    <option value="041">Hobiganj</option>
                    <option value="042">Moulvibazar</option>
                    <option value="043">Sunamganj</option>
                    <option value="044">Sylhet</option>
                    <option value="045">Bogura</option>
                    <option value="046">Chapainawabganj</option>
                    <option value="047">Joypurhat</option>
                    <option value="048">Naogaon</option>
                    <option value="049">Natore</option>
                    <option value="050">Pabna</option>
                    <option value="051">Rajshahi</option>
                    <option value="052">Sirajganj</option>
                    <option value="053">Dinajpur</option>
                    <option value="054">Gainbandha</option>
                    <option value="055">Kurigram</option>
                    <option value="056">Lalmonirhat</option>
                    <option value="057">Nilphamari</option>
                    <option value="058">Panchagarh</option>
                    <option value="059">Rangpur</option>
                    <option value="060">Thakurgaon</option>
                    <option value="061">Jamalpur</option>
                    <option value="062">Mymensingh</option>
                    <option value="063">Netrakona</option>
                    <option value="064">Sherpur</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ flex: "20%", paddingRight: "10px" }}>
                <label style={{ display: "flex", alignItems: "center", color: highlightedFields['CountryOfTaxRsdnc'] ? 'red' : 'black'  }}>
                  Country of Tax Residence:
                </label>
              </div>
              <div style={{ flex: "80%", paddingLeft: "10px" }}>
                <div className="value">
                  <select
                    className="required"
                    value={isCountryOfTaxRsdnceEdited ? formData.CountryOfTaxRsdnc : defaultValues.CountryOfTaxRsdnc || ''}
                    onChange={(e) => {
                      handleInputChange('CountryOfTaxRsdnc', e.target.value);
                      setIsCountryOfTaxRsdnceEdited(true);
                    }
                    }
                    style={{ border: highlightedFields['CountryOfTaxRsdnc'] ? '2px solid red' : '1px black' }}
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
          </div>
        </>
      )}
    </div>
  );
};

export default BasicInfoSection;
