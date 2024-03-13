import React, { useState, useEffect } from 'react';
import 'animate.css';
import '../styles/AmendCustomerButton.css';
import finalSectorData from'../Personal Account Sections/finalSector.json'


const GeneralInformation = ({ formData, defaultValues, handleInputChange, highlightedFields ={} }) => {
    const [isSectionOpen, setIsSectionOpen] = useState(true);
    const [isBusTypEdited, setIsBusTypEdited] = useState(false);
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
        <div className='animate__animated animate__slideInDown'>
            <div onClick={toggleSection} style={{ cursor: 'pointer', marginTop: '60px', marginBottom: '25px', fontSize: '10px', fontWeight: 'normal' }}>
                <strong className="title">General Information</strong> - {isSectionOpen ? 'Hide' : 'Show'}
            </div>

            {isSectionOpen && (
                <>
                    <div className="info">

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['BussSecCode'] ? 'red' : 'black' }}>
                                    Type of Business:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <select
                                        className="required"
                                        value={isBusTypEdited ? formData.BussSecCode : defaultValues.BussSecCode || ''}
                                        onChange={(e) => {
                                            handleInputChange('BussSecCode', e.target.value)
                                            setIsBusTypEdited(true)
                                        }}
                                        style={{ border: highlightedFields['BussSecCode'] ? '2px solid red' : '1px black' }}
                                    >
                                        <option value="">Select</option>
                                        <option value="00000">Select</option>
                                        <option value="00001">Jewelry/Jewelry Shop/ Precious Metal Business </option>
                                        <option value="00002">Money exchanger/Courier Service/ Mobile  Agent Banking</option>
                                        <option value="00003">Real Estate Developer/ Agent</option>
                                        <option value="00004">Development Project Promoter/Contractor</option>
                                        <option value="00005">Offshore Corporation </option>
                                        <option value="00006">Painting/Antique Dealer</option>
                                        <option value="00007">Restaurant/Bar/Night Club/Residential Hotel/Parlor Business </option>
                                        <option value="00008">Import-Export Agent</option>
                                        <option value="00009">Share/Stock Dealer/ Broker/ Port-folio Manager</option>
                                        <option value="00010">Manpower Export Business</option>
                                        <option value="00011">Film Production/ Film Distribution Firms</option>
                                        <option value="00012">Weapon Business</option>
                                        <option value="00013">Garments Business/ Garments Accessories/ Buying House</option>
                                        <option value="00014">NGO/NPO</option>
                                        <option value="00015">Mobile Phone Operator/Internet/Cable TV Operator</option>
                                        <option value="00016">Trusty</option>
                                        <option value="00017">Software Business/ ICT Business</option>
                                        <option value="00018">Business (Petrol Pump/ CNG Station)</option>
                                        <option value="00019">Co-operative</option>
                                        <option value="00020">Land/House Selling Broker (Institutional)</option>
                                        <option value="00021">Bank/Leasing/Financial Company</option>
                                        <option value="00022">Vehicale Operator</option>
                                        <option value="00023">Insurance/Broker Agencies</option>
                                        <option value="00024">Religious Institution or Organization and Education Institute</option>
                                        <option value="00025">Ship Breaking Business</option>
                                        <option value="00026">Tobacco and Cigarette Business</option>
                                        <option value="00027">Power Development and Tobacco Company</option>
                                        <option value="00028">Business (Dealer/Distributor/Agent)</option>
                                        <option value="00029">Business (Indenting)</option>
                                        <option value="00030">Business (Outsourcing)</option>
                                        <option value="00031">Event Management</option>
                                        <option value="00032">Travel Agent/Tourism Company</option>
                                        <option value="00033">Print/ELectric Media</option>
                                        <option value="00034">Fright/Shipping/Cargo Agent/C and F Agent</option>
                                        <option value="00035">Auto Business (New/Recondition Car)</option>
                                        <option value="00036">Leather and Leather Related Goods Business</option>
                                        <option value="00037">Telecommunication Business</option>
                                        <option value="00038">House Blinding Materials Business</option>
                                        <option value="00039">Law Firm/Enginerring Firm/Consultance Firm</option>
                                        <option value="00040">Chartered Accountant</option>
                                        <option value="00041">Business (Clearing and Forwarding Agent)</option>
                                        <option value="00042">Corporate Customer</option>
                                        <option value="00043">Fuel and Electricity Production Company</option>
                                        <option value="00044">Telecommunication Company</option>
                                        <option value="00045">Clinic/ Hospital</option>
                                        <option value="00046">Chain Store/Shopping Mall</option>
                                        <option value="00047">Textile / Spinning</option>
                                        <option value="00048">Motor Parts/ Workshop Business</option>
                                        <option value="00049">Medical Production and Supply Business</option>
                                        <option value="00050">Business Agent</option>
                                        <option value="00051">Cold Storage Business</option>
                                        <option value="00052">Frozen Food Business</option>
                                        <option value="00053">Hardwar Business</option>
                                        <option value="00054">Advertisement Business</option>
                                        <option value="00055">Service Provider</option>
                                        <option value="00056">Yarn Business/Sprinkle Business</option>
                                        <option value="00057">Vehicle Operator</option>
                                        <option value="00058">Entertainment Company/Park</option>
                                        <option value="00059">Provate Service Managerial</option>
                                        <option value="00060">Club/Society</option>
                                        <option value="00061">Insurance/Brokerage Agency</option>
                                        <option value="00062">Data Entry/Call Centre</option>
                                        <option value="00063">Leaning/Finance Company</option>
                                        <option value="00064">Poultry/Dairy/Fishing Firm</option>
                                        <option value="00065">Agro Business/Rice Mill Business/Bevarege</option>
                                        <option value="00066">Shop (Retail)</option>
                                        <option value="00067">Computer/Mobile Phone Dealer</option>
                                        <option value="00068">Producer (Except Weapon)</option>
                                        <option value="00069">Others</option>
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
                                        className="required"
                                        value={isFlag1Edited ? formData.Flag1 : defaultValues.Flag1 || ''}
                                        onChange={(e) => {
                                            handleInputChange('Flag1', e.target.value);
                                            setIsFlag1Edited(true);
                                        }
                                        }
                                        style={{ border: highlightedFields['Flag1'] ? '2px solid red' : '1px black' }}
                                    >
                                        <option value="0">Select</option>
                                        <option value="Y">yes</option>
                                        <option value="N">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['IncomeRange'] ? 'red' : 'black'}}>
                                    Net Worth:
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
                                        <option value="51">0 TK - 1 Core TK</option>
                                        <option value="52">More Than 1 Core TK - 3 Core TK</option>
                                        <option value="53">More Than 3 Core TK and Above</option>
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
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['Risk'] ? 'red' : 'black'}}>
                                    Country Risk Likelihood:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <select
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
                                            setIsSecndryTyp2Edited(true)
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
                    </div>
                </>
            )}
        </div>
    );
};

export default GeneralInformation;
