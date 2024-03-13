import React, { useState } from 'react';
import 'animate.css';
import '../styles/AmendCustomerButton.css';


const VisaDetails = ({ formData, defaultValues, handleInputChange }) => {
    const [isSectionOpen, setIsSectionOpen] = useState(true);

    const toggleSection = () => {
        setIsSectionOpen(!isSectionOpen);
    };

    return (
        <div className='animate__animated animate__slideInDown'>
            <div onClick={toggleSection} style={{ cursor: 'pointer', marginTop: '60px', marginBottom: '25px', fontSize: '10px', fontWeight: 'normal' }}>
                <strong className="title">Visa Details</strong> - {isSectionOpen ? 'Hide' : 'Show'}
            </div>

            {isSectionOpen && (
                <>
                    <div className="info">


                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center' }}>
                                    Visa Detail:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <input
                                        
                                        type="text"
                                        value={formData.VisaDetail || defaultValues.VisaDetail || ''}
                                        onChange={(e) => handleInputChange('VisaDetail', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center' }}>
                                    Visa Issued By:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <input
                                        type="text"
                                        value={formData.VisaIssueBy || defaultValues.VisaIssueBy || ''}
                                        onChange={(e) => handleInputChange('VisaIssueBy', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center' }}>
                                    Visa Issued Date:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <input
                                        type="text"
                                        value={formData.VisaIssueDt || defaultValues.VisaIssueDt || ''}
                                        onChange={(e) => handleInputChange('VisaIssueDt', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center' }}>
                                    Visa Expiry Date:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <input
                                        type="text"
                                        value={formData.VisaExpryDt || defaultValues.VisaExpryDt || ''}
                                        onChange={(e) => handleInputChange('VisaExpryDt', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center' }}>
                                    Arrival Date:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <input
                                        type="text"
                                        value={formData.ArrivalDt || defaultValues.ArrivalDt || ''}
                                        onChange={(e) => handleInputChange('ArrivalDt', e.target.value)}
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

export default VisaDetails;
