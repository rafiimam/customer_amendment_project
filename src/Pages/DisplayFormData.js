import React, { useState, useEffect } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MdError } from "react-icons/md";

export let keyMessageMap = {};
const DisplayFormData = ({ data }) => {
  let jsonData;

  // State variables for each section
  const [isMainDetailsMinimized, setIsMainDetailsMinimized] = useState(false);
  const [isPermanentAddressMinimized, setIsPermanentAddressMinimized] = useState(false);
  const [isPresentAddressMinimized, setIsPresentAddressMinimized] = useState(false);
  const [isGeneralInformationMinimized, setIsGeneralInformationMinimized] = useState(false);
  const [isIdentificationDetailsMinimized, setIsIdentificationDetailsMinimized] = useState(false);
  const [isVisaDetailsMinimized, setIsVisaDetailsMinimized] = useState(false);
  const [isComplianceMinimized, setIsComplianceMinimized] = useState(false);
  const [isEmergencyContactMinimized, setIsEmergencyContactMinimized] = useState(false);
  /* const [keyMessageMap, setKeyMessageMap] = useState([]); */

  const [checkedKeys, setCheckedKeys] = useState([]);


  // Effect to check the value of a key and set the initial state accordingly
  /* useEffect(() => {
    // Check if the key has a value 'n', if yes, set maximized state, else set minimized state
    const keyValue = data;

    if (keyValue) {
      let hasChanged = false;
      for (const key in keyValue.data) {
        const value = keyValue.data[key];
        const pattern = /\(changed\)$/;
        if (pattern.test(value) === true) {
          hasChanged = true;
          break; // No need to continue checking once a changed value is found
        }
      }
      // Set the state variable accordingly
      setIsMainDetailsMinimized(!hasChanged);
      setIsPermanentAddressMinimized(!hasChanged)
      setIsPresentAddressMinimized(!hasChanged)
      setIsGeneralInformationMinimized(!hasChanged)
      setIsIdentificationDetailsMinimized(!hasChanged)
      setIsVisaDetailsMinimized(!hasChanged)
    }
  }, []); */

  // Toggle function for each section
  const toggleSection = (section) => {
    switch (section) {
      case 'MainDetails':
        setIsMainDetailsMinimized(!isMainDetailsMinimized);
        break;
      case 'PermanentAddress':
        setIsPermanentAddressMinimized(!isPermanentAddressMinimized);
        break;
      case 'PresentAddress':
        setIsPresentAddressMinimized(!isPresentAddressMinimized);
        break;
      case 'GeneralInformation':
        setIsGeneralInformationMinimized(!isGeneralInformationMinimized);
        break;
      case 'IdentificationDetails':
        setIsIdentificationDetailsMinimized(!isIdentificationDetailsMinimized);
        break;
      case 'VisaDetails':
        setIsVisaDetailsMinimized(!isVisaDetailsMinimized);
        break;
      case 'Compliance':
        setIsComplianceMinimized(!isComplianceMinimized);
        break;
      case 'EmergencyContact':
        setIsEmergencyContactMinimized(!isEmergencyContactMinimized);
        break;
      default:
        break;
    }
  };

  // Parsing the data
  if (typeof data === 'string') {
    try {
      jsonData = JSON.parse(data);
    } catch (error) {
      console.error("Error parsing JSON string:", error);
      return <div>Error parsing JSON string</div>;
    }
  } else if (typeof data === 'object' && data !== null) {
    jsonData = data;
  } else {
    console.error("Invalid data type:", typeof data);
    return <div>Invalid data type</div>;
  }

  // Rendering sections based on keyOrder
  const keyOrder = {
    'MainDetails': ['CustGrp',
      'CustTyp',
      'CustNumber',
      'GndrCode',
      'TitleCode',
      'FirstName',
      'BussName',
      'BussNum',
      'LastName',
      'CustomerName',
      'FatherName',
      'MotherMaidenName',
      'DtOfBirth',
      'Dmcle',
      'ResdncyStat',
      'CountryOfBirth',
      'DisttBirth', ,
      'CountryOfTaxRsdnc',],
    //Permanent Address
    'PermanentAddress': ["AddrLine1",
      "AddrLine2",
      "CountryOfRes",
      "CustState",
      "CityBus",
      "Thana1",
      "SubOffice1",
      "BussPhnNum",],
    //Present Address
    'PresentAddress': ["Addr10",
      "Addr11",
      "CountryCode2",
      "StateCode1",
      "CityCode1",
      "Thana2",
      "SubOfc2",
      "PhnBus1",],
    //Generatil Information
    'GeneralInformation': ["Natlty",
      'Natlty2',
      'Flag1',
      "IncomeRange",
      "Caste",
      "CustRisk",
      "CustRiskImp",
      "Risk",
      "CounRiskImp",
      "PrimTyp1",
      "SeconTyp1",
      "PrimTyp2",
      "SecndryTyp2",
      "FnlSec",
      "Attr10",],
    //Identification
    'IdentificationDetails': ["IdTyp",
      "IdNum",
      "IdIssueDt",
      "IdIssueRmrk",
      "CountryTemp",
      "IdExpDt",],
    //Channels
    'VisaDetails': ["SmsRegDate",
      'SmsColectnAcct'
    ],
  };

  // Custom label mappings for keys
  const labelMappings = {
    'CustGrp': 'Customer Category',
    'CustTyp': 'Customer Type',
    'CustNumber': 'CIF No',
    'GndrCode': 'Gender',
    'TitleCode': 'Gender Type',
    'FirstName': 'First Name',
    'BussName': 'Business Name',
    'BussNum:': 'Registration Number',
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

  // Changed Value Remove and set value
  const customergroup = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').trim();
      // Return the remaining value with a red color
      switch (value) {
        case '01':
          return 'INDIVIDUAL';
        default:
          return 'NON-INDIVIDUAL';
      }
    } else {
      switch (value) {
        case '01':
          return 'INDIVIDUAL';
        default:
          return 'NON-INDIVIDUAL';
      }
    }
  };

  const customertype = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').trim();
      // Return the remaining value with a red color
      switch (value) {
        case '0103':
          return 'General';
        case '0104':
          return 'Jamuna Bank Employee';
        case '0105':
          return 'Senior Citizen';
        case '0106':
          return 'Minor';
        case '0107':
          return 'Foreign Nationals';
        case '0108':
          return 'Executor';
        case '0109':
          return 'Administrator';
        case "0110":
          return 'Illiterate';
        case "0111":
          return "Pardanasheen Woman";
        case "0112":
          return 'Blind Man';
        case "0113":
          return 'Unsound Mind';
        case "0114":
          return 'Drunker / Intoxicated Person';
        case "0115":
          return 'Liquidators';
        case "0116":
          return 'Lunatics';
        case "0217":
          return "Propietorship";
        case "0218":
          return "Registered Partnerships and Firms";
        case "0219":
          return "Unregistered Partnerships and Firms";
        case "0220":
          return "Joint Venture";
        case "0221":
          return "Public Limited Company";
        case "0222":
          return "Private Limited Company";
        case "0223":
          return "Government (Including Ministry, Department)";
        case "0224":
          return "Government Owned Entity";
        case "0225":
          return "Autonomous Body";
        case "0226":
          return "Semi-government";
        case "0227":
          return "Government Project under Government Ministry";
        case "0228":
          return "Non Government Organizaion (NGO)";
        case "0229":
          return "Chartible Organizaion";
        case "0230":
          return "Religious Organizaion";
        case "0231":
          return "Club";
        case "0232":
          return "Incorporated Societies";
        case "0233":
          return "Unincorporated Societies";
        case "0234":
          return "Foundations or Similar Entity";
        case "0235":
          return "Embassies";
        case "0236":
          return "Co-operative Society";
        case "0237":
          return "Private Madrasa";
        case "0238":
          return "Private School, College, University";
        case "0239":
          return "Limited Society";
        case "0240":
          return "Public Registered Trust";
        case "0241":
          return "Public Unregistered Trust";
        case "0242":
          return "Private Unregistered Trust";
        case "0243":
          return "Private Registered Trust";
        case "0299":
          return "Group Customer";
        default:
          return 'Unknown'; // Default value if value doesn't match any case
      }
    } else {
      switch (value) {
        case '0103':
          return 'General';
        case '0104':
          return 'Jamuna Bank Employee';
        case '0105':
          return 'Senior Citizen';
        case '0106':
          return 'Minor';
        case '0107':
          return 'Foreign Nationals';
        case '0108':
          return 'Executor';
        case '0109':
          return 'Administrator';
        case "0110":
          return 'Illiterate';
        case "0111":
          return "Pardanasheen Woman";
        case "0112":
          return 'Blind Man';
        case "0113":
          return 'Unsound Mind';
        case "0114":
          return 'Drunker / Intoxicated Person';
        case "0115":
          return 'Liquidators';
        case "0116":
          return 'Lunatics';
        case "0217":
          return "Propietorship";
        case "0218":
          return "Registered Partnerships and Firms";
        case "0219":
          return "Unregistered Partnerships and Firms";
        case "0220":
          return "Joint Venture";
        case "0221":
          return "Public Limited Company";
        case "0222":
          return "Private Limited Company";
        case "0223":
          return "Government (Including Ministry, Department)";
        case "0224":
          return "Government Owned Entity";
        case "0225":
          return "Autonomous Body";
        case "0226":
          return "Semi-government";
        case "0227":
          return "Government Project under Government Ministry";
        case "0228":
          return "Non Government Organizaion (NGO)";
        case "0229":
          return "Chartible Organizaion";
        case "0230":
          return "Religious Organizaion";
        case "0231":
          return "Club";
        case "0232":
          return "Incorporated Societies";
        case "0233":
          return "Unincorporated Societies";
        case "0234":
          return "Foundations or Similar Entity";
        case "0235":
          return "Embassies";
        case "0236":
          return "Co-operative Society";
        case "0237":
          return "Private Madrasa";
        case "0238":
          return "Private School, College, University";
        case "0239":
          return "Limited Society";
        case "0240":
          return "Public Registered Trust";
        case "0241":
          return "Public Unregistered Trust";
        case "0242":
          return "Private Unregistered Trust";
        case "0243":
          return "Private Registered Trust";
        case "0299":
          return "Group Customer";
        default:
          return 'Unknown'; // Default value if value doesn't match any case
      }
    }
  };

  const gendercode = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').trim();
      // Return the remaining value with a red color
      switch (value) {
        case 'M':
          return 'Male';
        case 'F':
          return 'Female';
        case 'O':
          return 'Third Gender';
        default:
          return 'Unknown';
      }
    } else {
      switch (value) {
        case 'M':
          return 'Male';
        case 'F':
          return 'Female';
        case 'O':
          return 'Third Gender';
        default:
          return 'Unknown';
      }
    }
  };

  const titlecode = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').trim();
      // Return the remaining value with a red color
      switch (value) {
        case '1':
          return 'Mr.';
        case '04':
          return 'Master';
        case '2':
          return 'Ms.';
        case '3':
          return 'Mrs.';
        default:
          return 'Unknown';
      }
    } else {
      switch (value) {
        case '1':
          return 'Mr.';
        case '04':
          return 'Master';
        case '2':
          return 'Ms.';
        case '3':
          return 'Mrs.';
        default:
          return 'Unknown';
      }
    }
  };
  const datevalue = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').trim();
      // Return the remaining value with a red color
      if (typeof value === 'string' && value.length === 8) {
        const day = value.substring(0, 2);
        const month = value.substring(2, 4);
        const year = value.substring(4);
        return `${day}/${month}/${year}`;
      } else {
        return 'Unknown';
      }
    } else {
      if (typeof value === 'string' && value.length === 8) {
        const day = value.substring(0, 2);
        const month = value.substring(2, 4);
        const year = value.substring(4);
        return `${day}/${month}/${year}`;
      } else {
        return 'Unknown';
      }
    }
  };

  const country = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').trim();
      // Return the remaining value with a red color
      switch (value) {
        case 'BD':
          return 'BANGLADESH';
        default:
          return 'FOREIGN COUNTRY';
      }
    } else {
      switch (value) {
        case 'BD':
          return 'BANGLADESH';
        default:
          return 'FOREIGN COUNTRY';
      }
    }
  };
  const residentialstatus = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').trim();
      // Return the remaining value with a red color
      switch (value) {
        case '1':
          return 'Resident';
        default:
          return 'Non Resident';
      }
    } else {
      switch (value) {
        case '1':
          return 'Resident';
        default:
          return 'Non Resident';
      }
    }
  };

  const division = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').trim();
      // Return the remaining value with a red color
      switch (value) {
        case "001":
          return "Dhaka";
        case "002":
          return "Chattogram";
        case "003":
          return "Barishal";
        case "004":
          return "Khulna";
        case "005":
          return "Sylhet";
        case "006":
          return "Rajshahi";
        case "007":
          return "Rangpur";
        case "008":
          return "Mymensingh";
        default:
          return 'Non Resident';
      }
    } else {
      switch (value) {
        case "001":
          return "Dhaka";
        case "002":
          return "Chattogram";
        case "003":
          return "Barishal";
        case "004":
          return "Khulna";
        case "005":
          return "Sylhet";
        case "006":
          return "Rajshahi";
        case "007":
          return "Rangpur";
        case "008":
          return "Mymensingh";
        default:
          return 'Non Resident';
      }
    }
  };

  const district = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').trim();
      // Return the remaining value with a red color
      switch (value) {
        case '1':
          return 'Resident';
        case "001":
          return "Dhaka";
        case "002":
          return "Faridpur";
        case "003":
          return "Gazipur";
        case "004":
          return "Gopalganj";
        case "005":
          return "Kishoreganj";
        case "006":
          return "Madaripur";
        case "007":
          return "Manikganj";
        case "008":
          return "Munshiganj";
        case "009":
          return "Narayanganj";
        case "010":
          return "Narsingdi";
        case "011":
          return "Rajsbari";
        case "012":
          return "Shariyatpur";
        case "013":
          return "Tangail";
        case "014":
          return "Bandarban";
        case "015":
          return "Brahmanbaria";
        case "016":
          return "Chandpur";
        case "017":
          return "Chattogram";
        case "018":
          return "Cumilla";
        case "019":
          return "Cox's Bazar";
        case "020":
          return "Feni";
        case "021":
          return "Khagrachari";
        case "022":
          return "Lakhmipur";
        case "023":
          return "Noakhali";
        case "024":
          return "Rangamati";
        case "025":
          return "Barguna";
        case "026":
          return "Barishal";
        case "027":
          return "Bhola";
        case "028":
          return "Jhalokathi";
        case "029":
          return "Patuakhali";
        case "030":
          return "Pirojpur";
        case "031":
          return "Bagherhat";
        case "032":
          return "Chuadanga";
        case "033":
          return "Jashore";
        case "034":
          return "Jinaidaha";
        case "035":
          return "Khulna";
        case "036":
          return "Kushtia";
        case "037":
          return "Magura";
        case "038":
          return "Meherpur";
        case "039":
          return "Narail";
        case "040":
          return "Shatkhira";
        case "041":
          return "Hobiganj";
        case "042":
          return "Moulvibazar";
        case "043":
          return "Sunamganj";
        case "044":
          return "Sylhet";
        case "045":
          return "Bogura";
        case "046":
          return "Chapainawabganj";
        case "047":
          return "Joypurhat";
        case "048":
          return "Naogaon";
        case "049":
          return "Natore";
        case "050":
          return "Pabna";
        case "051":
          return "Rajshahi";
        case "052":
          return "Sirajganj";
        case "061":
          return "Jamalpur";
        case "062":
          return "Mymensingh";
        case "063":
          return "Netrakona";
        case "064":
          return 'Sh"erpur';
        default:
          return 'Non Resident';
      }
    } else {
      switch (value) {
        case '1':
          return 'Resident';
        case "001":
          return "Dhaka";
        case "002":
          return "Faridpur";
        case "003":
          return "Gazipur";
        case "004":
          return "Gopalganj";
        case "005":
          return "Kishoreganj";
        case "006":
          return "Madaripur";
        case "007":
          return "Manikganj";
        case "008":
          return "Munshiganj";
        case "009":
          return "Narayanganj";
        case "010":
          return "Narsingdi";
        case "011":
          return "Rajsbari";
        case "012":
          return "Shariyatpur";
        case "013":
          return "Tangail";
        case "014":
          return "Bandarban";
        case "015":
          return "Brahmanbaria";
        case "016":
          return "Chandpur";
        case "017":
          return "Chattogram";
        case "018":
          return "Cumilla";
        case "019":
          return "Cox's Bazar";
        case "020":
          return "Feni";
        case "021":
          return "Khagrachari";
        case "022":
          return "Lakhmipur";
        case "023":
          return "Noakhali";
        case "024":
          return "Rangamati";
        case "025":
          return "Barguna";
        case "026":
          return "Barishal";
        case "027":
          return "Bhola";
        case "028":
          return "Jhalokathi";
        case "029":
          return "Patuakhali";
        case "030":
          return "Pirojpur";
        case "031":
          return "Bagherhat";
        case "032":
          return "Chuadanga";
        case "033":
          return "Jashore";
        case "034":
          return "Jinaidaha";
        case "035":
          return "Khulna";
        case "036":
          return "Kushtia";
        case "037":
          return "Magura";
        case "038":
          return "Meherpur";
        case "039":
          return "Narail";
        case "040":
          return "Shatkhira";
        case "041":
          return "Hobiganj";
        case "042":
          return "Moulvibazar";
        case "043":
          return "Sunamganj";
        case "044":
          return "Sylhet";
        case "045":
          return "Bogura";
        case "046":
          return "Chapainawabganj";
        case "047":
          return "Joypurhat";
        case "048":
          return "Naogaon";
        case "049":
          return "Natore";
        case "050":
          return "Pabna";
        case "051":
          return "Rajshahi";
        case "052":
          return "Sirajganj";
        case "061":
          return "Jamalpur";
        case "062":
          return "Mymensingh";
        case "063":
          return "Netrakona";
        case "064":
          return 'Sh"erpur';
        default:
          return 'Non Resident';
      }
    }
  };

  const thanaData = require('./thanaValue.json');

  const thana = (value) => {
    if (value.includes('(changed)')) {
      value = value.replace('(changed)', '').trim();
    }

    const thanaObject = thanaData.find(item => item.value === value);
    return thanaObject ? thanaObject.text : value;
  };


  const postOfficeData = require('./postOfficeValues.json');

  const postoffice = (value) => {
    if (value.includes('(changed)')) {
      value = value.replace('(changed)', '').trim();
    }

    const postOfficeObject = postOfficeData.find(item => item.value === value);
    return postOfficeObject ? postOfficeObject.text : value;
  };


  const fixedvalue = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)') || value.includes('(verified)') || value.includes('(not verified)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').replace('(verified)', '').replace('(not verified)', '').trim();
      // Return the remaining value with a red color
      switch (value) {
        case value:
          return value;
        default:
          return value;
      }
    } else {
      switch (value) {
        case value:
          return value;
        default:
          return value;
      }
    }
  };
  const smsflag = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').trim();
      // Return the remaining value with a red color
      switch (value) {
        case 'Y':
          return 'Yes';
        default:
          return 'No';
      }
    } else {
      switch (value) {
        case 'Y':
          return 'Yes';
        default:
          return 'No';
      }
    }
  };

  const monthlyincome = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').trim();
      // Return the remaining value with a red color
      switch (value) {
        case '01':
          return '0 tk to 1 Lac tk';
        case '02':
          return 'More Than 1 Lac tk to 3 Lac tk';
        case '03':
          return 'More Than 3 Lac tk and Above';
        default:
          return 'no monthly income';
      }
    } else {
      switch (value) {
        case '01':
          return '0 tk to 1 Lac tk';
        case '02':
          return 'More Than 1 Lac tk to 3 Lac tk';
        case '03':
          return 'More Than 3 Lac tk and Above';
        default:
          return 'no monthly income';
      }
    }
  };
  const religion = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').trim();
      // Return the remaining value with a red color
      switch (value) {
        case "001":
          return 'BUDDHISM'
        case "002":
          return 'CHRISTIANITY'
        case "003":
          return 'HINDUISM'
        case "004":
          return 'ISLAM'
        case "005":
          return 'JAINISM'
        case "006":
          return 'JUDAISAM'
        case "007":
          return 'OTHERS'
        case "008":
          return 'SIKHISM'
        default:
          return 'no';
      }
    } else {
      switch (value) {
        case "001":
          return 'BUDDHISM'
        case "002":
          return 'CHRISTIANITY'
        case "003":
          return 'HINDUISM'
        case "004":
          return 'ISLAM'
        case "005":
          return 'JAINISM'
        case "006":
          return 'JUDAISAM'
        case "007":
          return 'OTHERS'
        case "008":
          return 'SIKHISM'
        default:
          return 'Unknown';
      }
    }
  };
  const custrisklikelihood = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').trim();
      // Return the remaining value with a red color
      switch (value) {
        case "07":
          return 'Very Likely'
        case "08":
          return 'Likely'
        case "09":
          return 'Unlikely'
        default:
          return 'Unknown';
      }
    } else {
      switch (value) {
        case "07":
          return 'Very Likely'
        case "08":
          return 'Likely'
        case "09":
          return 'Unlikely'
        default:
          return 'Unknown';
      }
    }
  };
  const custriskimpact = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').trim();
      // Return the remaining value with a red color
      switch (value) {
        case "01":
          return 'Major'
        case "02":
          return 'Moderate'
        case "03":
          return 'Minor'
        default:
          return 'Unknown';
      }
    } else {
      switch (value) {
        case "01":
          return 'Major'
        case "02":
          return 'Moderate'
        case "03":
          return 'Minor'
        default:
          return 'Unknown';
      }
    }
  };
  const countryriskimpact = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').trim();
      // Return the remaining value with a red color
      switch (value) {
        case "01":
          return 'Major'
        case "02":
          return 'Moderate'
        case "03":
          return 'Minor'
        default:
          return 'Unknown';
      }
    } else {
      switch (value) {
        case "01":
          return 'Major'
        case "02":
          return 'Moderate'
        case "03":
          return 'Minor'
        default:
          return 'Unknown';
      }
    }
  };
  const countryrisklikelihood = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').trim();
      // Return the remaining value with a red color
      switch (value) {
        case "00":
          return 'Very Likely'
        case "01":
          return 'Likely'
        case "02":
          return 'Unlikely'
        default:
          return 'Unknown';
      }
    } else {
      switch (value) {
        case "00":
          return 'Very Likely'
        case "01":
          return 'Likely'
        case "02":
          return 'Unlikely'
        default:
          return 'Unknown';
      }
    }
  };
  const primarysectortype = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').trim();
      // Return the remaining value with a red color
      switch (value) {
        case "02":
          return 'PRIVATE SECTOR (Occupations/Activities)'
        case "01":
          return 'PUBLIC SECTOR'
        default:
          return 'Unknown';
      }
    } else {
      switch (value) {
        case "02":
          return 'PRIVATE SECTOR (Occupations/Activities)'
        case "01":
          return 'PUBLIC SECTOR'
        default:
          return 'Unknown';
      }
    }
  };
  const secondarysectortype = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').trim();
      // Return the remaining value with a red color
      switch (value) {
        case "01":
          return 'GOVERNMENT SECTOR'
        case "02":
          return 'OTHER PUBLIC SECTOR (OTHER THAN GOVT.)'
        case "03":
          return 'PRIVATE SECTOR (Occupations/Activities)'
        default:
          return 'Unknown';
      }
    } else {
      switch (value) {
        case "01":
          return 'GOVERNMENT SECTOR'
        case "02":
          return 'OTHER PUBLIC SECTOR (OTHER THAN GOVT.)'
        case "03":
          return 'PRIVATE SECTOR (Occupations/Activities)'
        default:
          return 'Unknown';
      }
    }
  };
  const primarysectorcode = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').trim();
      // Return the remaining value with a red color
      switch (value) {
        case "012120":
          return "Autonomous and Semi-Autonomous Bodies"
        case "111000":
          return "Food Ministry ( Including food divisions/directorates)"
        case "012110":
          return "Presidency, Prime Minister's Office, Other Ministries, Parliament, Judiciary, all Directorates and Departments"
        case "012250":
          return "Insurance Companies and Pension Funds (ICPF)-Public"
        case "012210":
          return "Local Authorities"
        case "012230":
          return "Non-Bank Depository Corporations (NBDC)- Public"
        case "012240":
          return "Other Financial Intermediaries (OFI) except DMBs-Public"
        case "012220":
          return "Public Non-financial Corporations"
        case "012390":
          return "Households ( Individual Customers)"
        case "012500":
          return "Deposit Money Banks"
        case "012330":
          return "FINANCIAL CORPORATIONS - Non-Bank Depository Corporations -Private"
        case "012340":
          return "FINANCIAL CORPORATIONS - Other Financial Intermediaries-- Private (Except DMBs)"
        case "012360":
          return "Financial Auxiliaries"
        case "912051":
          return "Foreign Offices/ Embassies/Enterprises/Companies/Liaison Offices/Firms/NGOs ( Excluding Multinational Companies incorporated in Bangladesh)"
        case "012350":
          return "Insurance Companies and Pension Funds-Private"
        case "012370":
          return "NON-FINANCIAL CORPORATIONS PRIVATE"
        case "012380":
          return "Non-profit institutions serving households (NPISH)"
      }
    } else {
      switch (value) {
        case "012120":
          return "Autonomous and Semi-Autonomous Bodies"
        case "111000":
          return "Food Ministry ( Including food divisions/directorates)"
        case "012110":
          return "Presidency, Prime Minister's Office, Other Ministries, Parliament, Judiciary, all Directorates and Departments"
        case "012250":
          return "Insurance Companies and Pension Funds (ICPF)-Public"
        case "012210":
          return "Local Authorities"
        case "012230":
          return "Non-Bank Depository Corporations (NBDC)- Public"
        case "012240":
          return "Other Financial Intermediaries (OFI) except DMBs-Public"
        case "012220":
          return "Public Non-financial Corporations"
        case "012390":
          return "Households ( Individual Customers)"
        case "012500":
          return "Deposit Money Banks"
        case "012330":
          return "FINANCIAL CORPORATIONS - Non-Bank Depository Corporations -Private"
        case "012340":
          return "FINANCIAL CORPORATIONS - Other Financial Intermediaries-- Private (Except DMBs)"
        case "012360":
          return "Financial Auxiliaries"
        case "912051":
          return "Foreign Offices/ Embassies/Enterprises/Companies/Liaison Offices/Firms/NGOs ( Excluding Multinational Companies incorporated in Bangladesh)"
        case "012350":
          return "Insurance Companies and Pension Funds-Private"
        case "012370":
          return "NON-FINANCIAL CORPORATIONS PRIVATE"
        case "012380":
          return "Non-profit institutions serving households (NPISH)"
      }
    }
  };
  const secondarysectorcode = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').trim();
      // Return the remaining value with a red color
      switch (value) {
        case "12110C":
          return "Bangladesh Post Office (Savings Bank Scheme)"
        case "12110B":
          return "Directorate of Bangladesh Post Office (Postal services)"
        case "12110A":
          return "Directorates, Departments and other Govt. offices"
        case "12120C":
          return "Academy, Research Institute, Training Institutes, Council & Development Centre"
        case "12120B":
          return "Government Educational Institutions"
        case "12120D":
          return "Other Autonomous & Semi-autonomous bodies (Commission, Authority, Development Board/Centre/Foundations etc.)"
        case "12120E":
          return "Publicity And News Media"
        case "12120A":
          return "Text Book Board and Education Boards"
        case "012210":
          return "Local Authorities"
        case "12220C":
          return "Bangladesh Chemical Industries Corporation and Related Enterprises - Public Non-financial Corporations"
        case "12220E":
          return "Bangladesh Jute Mills Corporation and Related Enterprises - Public Non-financial Corporations"
        case "12220F":
          return "Bangladesh Petroleum Corporation and Bangladesh Oil, Gas and Mineral Corporation and Related Enterprises"
        case "12220G":
          return "Bangladesh Power Development Board & Related Enterprises - Public Non-financial Corporations"
        case "12220D":
          return "Bangladesh Steel and Engineering Corporation and Related Enterprises"
        case "12220B":
          return "Bangladesh Sugar & Food Industries Corporation and Related Enterprises - Public Non-financial Corporations"
        case "12220A":
          return "Bangladesh Textile Mills Corporation & Related Enterprises - Public Non-financial Corporations"
        case "12220H":
          return "Other Non-financial Corporations- Public - Public Non-financial Corporations"
        case "012240":
          return "Other Financial Intermediaries (OFI) except DMBs-Public"
        case "012230":
          return "Non-Bank Depository Corporations (NBDC)- Public"
        case "012250":
          return "Insurance Companies and Pension Funds (ICPF)-Public"
        case "012330":
          return "FINANCIAL CORPORATIONS - A. Non-Bank Depository Corporations -Private"
        case "012340":
          return "FINANCIAL CORPORATIONS - Other Financial Intermediaries-- Private (Except DMBs)"
        case "012350":
          return "Insurance Companies and Pension Funds-Private"
        case "012360":
          return "Financial Auxiliaries"
        case "12370A":
          return "Agriculture, Fishing & Livestock"
        case "12370C":
          return "Commerce & Trade (excluding individual businessmen)"
        case "1237B1":
          return "Industries -  Manufactures/Manufacturing Companies"
        case "1237B2":
          return "Industries - Gas/Electricity/Power Generating Companies"
        case "1237B3":
          return "Industries - Service Industries"
        case "1237B4":
          return "Inustries - Agro-based and agro-processing industry"
        case "12370D":
          return "Non Govt. Publicity & News Media"
        case "12370F":
          return "Other Private Sector ( Official Account n.i.e)"
        case "12370E":
          return "Private Educational Institutions"
        case "012380":
          return "Non-profit institutions serving households (NPISH)"
        case "012390":
          return "Households ( Individual Customers)"
        case "012500":
          return "Deposit Money Banks"
        case "111000":
          return "Food Ministry ( Including food divisions/directorates)"
        case "912051":
          return "Foreign Offices/ Embassies/Enterprises/Companies/Liaison Offices/Firms/NGOs ( Excluding Multinational Companies incorporated in Bangladesh)"
        default:
          return 'Unknown';
      }
    } else {
      switch (value) {
        case "12110C":
          return "Bangladesh Post Office (Savings Bank Scheme)"
        case "12110B":
          return "Directorate of Bangladesh Post Office (Postal services)"
        case "12110A":
          return "Directorates, Departments and other Govt. offices"
        case "12120C":
          return "Academy, Research Institute, Training Institutes, Council & Development Centre"
        case "12120B":
          return "Government Educational Institutions"
        case "12120D":
          return "Other Autonomous & Semi-autonomous bodies (Commission, Authority, Development Board/Centre/Foundations etc.)"
        case "12120E":
          return "Publicity And News Media"
        case "12120A":
          return "Text Book Board and Education Boards"
        case "012210":
          return "Local Authorities"
        case "12220C":
          return "Bangladesh Chemical Industries Corporation and Related Enterprises - Public Non-financial Corporations"
        case "12220E":
          return "Bangladesh Jute Mills Corporation and Related Enterprises - Public Non-financial Corporations"
        case "12220F":
          return "Bangladesh Petroleum Corporation and Bangladesh Oil, Gas and Mineral Corporation and Related Enterprises"
        case "12220G":
          return "Bangladesh Power Development Board & Related Enterprises - Public Non-financial Corporations"
        case "12220D":
          return "Bangladesh Steel and Engineering Corporation and Related Enterprises"
        case "12220B":
          return "Bangladesh Sugar & Food Industries Corporation and Related Enterprises - Public Non-financial Corporations"
        case "12220A":
          return "Bangladesh Textile Mills Corporation & Related Enterprises - Public Non-financial Corporations"
        case "12220H":
          return "Other Non-financial Corporations- Public - Public Non-financial Corporations"
        case "012240":
          return "Other Financial Intermediaries (OFI) except DMBs-Public"
        case "012230":
          return "Non-Bank Depository Corporations (NBDC)- Public"
        case "012250":
          return "Insurance Companies and Pension Funds (ICPF)-Public"
        case "012330":
          return "FINANCIAL CORPORATIONS - A. Non-Bank Depository Corporations -Private"
        case "012340":
          return "FINANCIAL CORPORATIONS - Other Financial Intermediaries-- Private (Except DMBs)"
        case "012350":
          return "Insurance Companies and Pension Funds-Private"
        case "012360":
          return "Financial Auxiliaries"
        case "12370A":
          return "Agriculture, Fishing & Livestock"
        case "12370C":
          return "Commerce & Trade (excluding individual businessmen)"
        case "1237B1":
          return "Industries -  Manufactures/Manufacturing Companies"
        case "1237B2":
          return "Industries - Gas/Electricity/Power Generating Companies"
        case "1237B3":
          return "Industries - Service Industries"
        case "1237B4":
          return "Inustries - Agro-based and agro-processing industry"
        case "12370D":
          return "Non Govt. Publicity & News Media"
        case "12370F":
          return "Other Private Sector ( Official Account n.i.e)"
        case "12370E":
          return "Private Educational Institutions"
        case "012380":
          return "Non-profit institutions serving households (NPISH)"
        case "012390":
          return "Households ( Individual Customers)"
        case "012500":
          return "Deposit Money Banks"
        case "111000":
          return "Food Ministry ( Including food divisions/directorates)"
        case "912051":
          return "Foreign Offices/ Embassies/Enterprises/Companies/Liaison Offices/Firms/NGOs ( Excluding Multinational Companies incorporated in Bangladesh)"
        default:
          return 'Unknown';
      }
    }
  };

  const identitytype = (value) => {
    // Check if the value contains the word '(changed)'
    if (value.includes('(changed)')) {
      // Remove the word '(changed)' and trim any extra whitespace
      value = value.replace('(changed)', '').trim();
      // Return the remaining value with a red color
      switch (value) {
        case "99":
          return "Non Individual Group Customer"
        case "01":
          return "National Identity No. 10 Digit"
        case "02":
          return "NID (17 Digit)"
        case "03":
          return "Passport Number"
        case "04":
          return "Birth Reg. Cert."
        case "05":
          return "Driving License"
        case "06":
          return "Trade License"
        case "07":
          return "E-TIN"
        case "08":
          return "Cert. of Reg. of Partner. Firm"
        case "09":
          return "Cert. of incorporation"
        case "10":
          return "Cert. of Comm(For Pub.Ltd.Co.)"
        case "11":
          return "LOP for govt. acct(Aprop-auth)"
        case "12":
          return "COR(Club,Soc,Ltd.Soc/Coop-oth)"
        case "13":
          return "Business ID Number (BIN)"
        case "14":
          return "Imp. Reg. Certificate (IRC)"
        case "15":
          return "Exp. Reg. Certificate (ERC)"
        case "16":
          return "VAT Number"
        case "17":
          return "BEPZA Permission"
        case "18":
          return "BIDA Permission"
        case "19":
          return "FDI Permission"
        case "20":
          return "Bangladesh Bank License"
        case "21":
          return "Bangladesh Bank Permission"
        case "22":
          return "Commercial License"
        case "23":
          return "Porchitipotro(Intro. Hon. Per)"
        case "24":
          return "Owner doc of shop"
        case "25":
          return "Rent Receipt of the Shop"
        case "26":
          return "Membership Cert. of any assoc."
        case "27":
          return "Credit Card"
        case "28":
          return "Partnership Deed(Unregistered)"
        case "29":
          return "Resolution"
        case "30":
          return "Memo. and Articles of Assoc."
        case "31":
          return "Form XII Ltd.Co./Lst Mgmt Comm"
        case "32":
          return "Power of Attorney"
        case "33":
          return "Statue of FRMN of govt. ent."
        case "34":
          return "Doc. of nature of the NGO/NPO"
        case "35":
          return "By-Laws (Not Certified)"
        case "36":
          return "By-Laws (Certified)"
        case "37":
          return "Clearance of Foreign Ministry"
        case "38":
          return "Cert. True copy of Trusty Deed"
        case "39":
          return "FORM - QA-22/A-7 Declaration"
        case "40":
          return "Joint Venture Agreement Deed"
        case "41":
          return "RES(Pvt. Sch./College/Madrasa)"
        case "42":
          return "Cert(For-Dip Msn/NPOIntl/PC)"
        case "81":
          return "Tq ltr through postal dept."
        case "82":
          return "Tq ltr through courier"
        case "83":
          return "3rd party verification report"
        case "84":
          return "Phy verification rpt bank off."
        case "85":
          return "App/Parent util-bill(NOT&gt;3mth)"
        case "86":
          return "Resi. add. on off. Govt doc"
        default:
          return 'Unknown';
      }
    } else {
      switch (value) {
        case "99":
          return "Non Individual Group Customer"
        case "01":
          return "National Identity No. 10 Digit"
        case "02":
          return "NID (17 Digit)"
        case "03":
          return "Passport Number"
        case "04":
          return "Birth Reg. Cert."
        case "05":
          return "Driving License"
        case "06":
          return "Trade License"
        case "07":
          return "E-TIN"
        case "08":
          return "Cert. of Reg. of Partner. Firm"
        case "09":
          return "Cert. of incorporation"
        case "10":
          return "Cert. of Comm(For Pub.Ltd.Co.)"
        case "11":
          return "LOP for govt. acct(Aprop-auth)"
        case "12":
          return "COR(Club,Soc,Ltd.Soc/Coop-oth)"
        case "13":
          return "Business ID Number (BIN)"
        case "14":
          return "Imp. Reg. Certificate (IRC)"
        case "15":
          return "Exp. Reg. Certificate (ERC)"
        case "16":
          return "VAT Number"
        case "17":
          return "BEPZA Permission"
        case "18":
          return "BIDA Permission"
        case "19":
          return "FDI Permission"
        case "20":
          return "Bangladesh Bank License"
        case "21":
          return "Bangladesh Bank Permission"
        case "22":
          return "Commercial License"
        case "23":
          return "Porchitipotro(Intro. Hon. Per)"
        case "24":
          return "Owner doc of shop"
        case "25":
          return "Rent Receipt of the Shop"
        case "26":
          return "Membership Cert. of any assoc."
        case "27":
          return "Credit Card"
        case "28":
          return "Partnership Deed(Unregistered)"
        case "29":
          return "Resolution"
        case "30":
          return "Memo. and Articles of Assoc."
        case "31":
          return "Form XII Ltd.Co./Lst Mgmt Comm"
        case "32":
          return "Power of Attorney"
        case "33":
          return "Statue of FRMN of govt. ent."
        case "34":
          return "Doc. of nature of the NGO/NPO"
        case "35":
          return "By-Laws (Not Certified)"
        case "36":
          return "By-Laws (Certified)"
        case "37":
          return "Clearance of Foreign Ministry"
        case "38":
          return "Cert. True copy of Trusty Deed"
        case "39":
          return "FORM - QA-22/A-7 Declaration"
        case "40":
          return "Joint Venture Agreement Deed"
        case "41":
          return "RES(Pvt. Sch./College/Madrasa)"
        case "42":
          return "Cert(For-Dip Msn/NPOIntl/PC)"
        case "81":
          return "Tq ltr through postal dept."
        case "82":
          return "Tq ltr through courier"
        case "83":
          return "3rd party verification report"
        case "84":
          return "Phy verification rpt bank off."
        case "85":
          return "App/Parent util-bill(NOT&gt;3mth)"
        case "86":
          return "Resi. add. on off. Govt doc"
        default:
          return 'Unknown';
      }
    }
  };

  // Custom value mappings
  const valueMappings = {
    'CustGrp': (value) => customergroup(value),
    'CustTyp': (value) => customertype(value),
    'GndrCode': (value) => gendercode(value),
    'TitleCode': (value) => titlecode(value),
    'FirstName': (value) => fixedvalue(value),
    'CustMidName': (value) => fixedvalue(value),
    'LastName': (value) => fixedvalue(value),
    'FatherName': (value) => fixedvalue(value),
    'MotherMaidenName': (value) => fixedvalue(value),
    'DtOfBirth': (value) => datevalue(value),
    'Dmcle': (value) => country(value),
    'ResdncyStat': (value) => residentialstatus(value),
    'CountryOfBirth': (value) => country(value),
    'DisttBirth': (value) => district(value),
    'CountryOfTaxRsdnc': (value) => country(value),
    'CityCode1': (value) => district(value),
    'Thana1': (value) => thana(value),
    'SubOffice1': (value) => postoffice(value),
    'BussPhnNum': (value) => fixedvalue(value),
    'CountryCode2': (value) => country(value),
    'CustState': (value) => division(value),
    'AddrLine1': (value) => fixedvalue(value),
    'AddrLine2': (value) => fixedvalue(value),
    'CountryOfRes': (value) => country(value),
    'CustState': (value) => division(value),
    'CityBus': (value) => district(value),
    'Addr10': (value) => fixedvalue(value),
    'Addr11': (value) => fixedvalue(value),
    'CountryCode2': (value) => country(value),
    'StateCode1': (value) => division(value),
    'CityCode1': (value) => district(value),
    'Thana2': (value) => thana(value),
    'SubOfc2': (value) => postoffice(value),
    'PhnBus1': (value) => fixedvalue(value),
    'Natlty': (value) => country(value),
    'Natlty2': (value) => country(value),
    'Flag1': (value) => smsflag(value),
    'IncomeRange': (value) => monthlyincome(value),
    'Caste': (value) => religion(value),
    'CustRisk': (value) => custrisklikelihood(value),
    'CustRiskImp': (value) => custriskimpact(value),
    'Risk': (value) => countryrisklikelihood(value),
    'CounRiskImp': (value) => countryriskimpact(value),
    'PrimTyp1': (value) => primarysectortype(value),
    'SeconTyp1': (value) => secondarysectortype(value),
    'PrimTyp2': (value) => primarysectorcode(value),
    'SecndryTyp2': (value) => secondarysectorcode(value),
    'IdTyp': (value) => identitytype(value),
    'IdNum': (value) => fixedvalue(value),
    'IdIssueDt': (value) => datevalue(value),
    'IdIssueRmrk': (value) => fixedvalue(value),
    'CountryTemp': (value) => country(value),
    'IdExpDt': (value) => datevalue(value),
    'SmsRegDate': (value) => datevalue(value),
    'SmsColectnAcct': (value) => fixedvalue(value),

    'BussNum': (value) => fixedvalue(value),
  };


  // Custom section name mappings
  const sectionNameMappings = {
    'MainDetails': 'Main Details',
    'PermanentAddress': 'Permanent Address',
    'PresentAddress': 'Present Address',
    'GeneralInformation': 'General Information',
    'IdentificationDetails': 'Identification Details',
    'VisaDetails': 'Channels',
    /* 'Compliance': 'Compliance',
    'EmergencyContact': 'Emergency Contact' */
  };


  return (
    <>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        {/* Iterate over sections and render each section */}
        {Object.keys(keyOrder).map((section) => (
          <div key={section} style={{ marginBottom: "20px" }}>
            <h4
              onClick={() => toggleSection(section)}
              style={{
                cursor: "pointer",
                backgroundColor: "#f0f0f0",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "5px",
              }}
            >
              {sectionNameMappings[section]}
            </h4>
            <div
              style={{
                display: eval(`is${section}Minimized`) ? "none" : "block",
                backgroundColor: "#f9f9f9",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              {Object.keys(jsonData).map((dataKey) => (
                <div key={dataKey} style={{ marginBottom: "10px" }}>
                  {/* Separate table for each dataKey */}
                  <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <tbody>
                      {keyOrder[section].map((key) => (
                        // Checking if CustGrp is '02' and excluding certain keys based on that condition
                        (jsonData[dataKey]['CustGrp'] === '02' && ['GndrCode', 'TitleCode', 'Dmcle', 'DtOfBirth', 'CustomerName'].includes(key)) ? null : (
                          jsonData[dataKey].hasOwnProperty(key) && jsonData[dataKey][key] !== null && jsonData[dataKey][key] !== "" && jsonData[dataKey][key] !== "unknown" && (
                            <tr key={key} style={{ borderBottom: "1px solid #ddd" }}>
                              <td style={{ width: "25%", padding: "8px", textAlign: "left", borderRight: "1px solid #ddd" }}>
                                {/* Display custom label if available, else display key */}
                                {labelMappings[key] || key}
                              </td>
                              <td style={{ width: "25%", padding: "8px", textAlign: "left", borderRight: "1px solid #ddd" }}>
                                <span>
                                  {/* Render the value with appropriate styling based on conditions */}
                                  <span style={{
                                    color:
                                      jsonData[dataKey][key].toLowerCase().includes("not verified") ? "black" :
                                        jsonData[dataKey][key].toLowerCase().includes("verified") ? "black" :
                                          jsonData[dataKey][key].includes("(changed)") ? "red" :
                                            "inherit"
                                  }}>
                                    {valueMappings[key] ? valueMappings[key](jsonData[dataKey][key]) : jsonData[dataKey][key]}
                                  </span>
                                  {jsonData[dataKey][key].toLowerCase().includes("verified") && !jsonData[dataKey][key].toLowerCase().includes("not verified") && (
                                    <>
                                      <RiVerifiedBadgeFill style={{ color: "#0a91ff", marginLeft: "10px", marginBottom: "5px", fontSize: "20px" }} />
                                      <span style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "50px" }}> verified</span>
                                    </>
                                  )}
                                  {jsonData[dataKey][key].toLowerCase().includes("not verified") && (
                                    <>
                                      <MdError style={{ color: "red", marginLeft: "10px", marginBottom: "5px", fontSize: "20px" }} />
                                      <span style={{ fontSize: "15px", fontWeight: "bold", marginBottom: "50px" }}> not verified</span>
                                    </>
                                  )}
                                </span>
                              </td>
                            </tr>

                          )
                        )
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayFormData;