import React, { useState } from 'react';
import '../styles/AmendCustomerButton.css';

const Compliance = ({ formData, defaultValues, handleInputChange }) => {
    const [isSectionOpen, setIsSectionOpen] = useState(true);

    const toggleSection = () => {
        setIsSectionOpen(!isSectionOpen);
    };

    return (
        <div>
            <div onClick={toggleSection} style={{ cursor: 'pointer', marginTop: '60px', marginBottom: '25px', fontSize: '10px', fontWeight: 'normal' }}>
                <strong className="title">Compliance/Regulatory </strong> - {isSectionOpen ? 'Hide' : 'Show'}
            </div>

            {isSectionOpen && (
                <>
                    <div className="info">


                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center' }}>
                                    KYC Review Date:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <input
                                        className="required"
                                        type="text"
                                        value={formData.KYCDt || defaultValues.KYCDt || ''}
                                        onChange={(e) => handleInputChange('KYCDt', e.target.value)}
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

export default Compliance;
