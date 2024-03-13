import React, { useState } from 'react';
import 'animate.css';
import '../styles/AmendCustomerButton.css';


const EmergencyContactInfo = ({ formData, defaultValues, handleInputChange }) => {
    const [isSectionOpen, setIsSectionOpen] = useState(true);

    const toggleSection = () => {
        setIsSectionOpen(!isSectionOpen);
    };

    return (
        <div className='animate__animated animate__slideInDown'>
            <div onClick={toggleSection} style={{ cursor: 'pointer', marginTop: '60px', marginBottom: '25px', fontSize: '10px', fontWeight: 'normal' }}>
                <strong className="title">Emergency Contact Info</strong> - {isSectionOpen ? 'Hide' : 'Show'}
            </div>

            {isSectionOpen && (
                <>
                    <div className="info">

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center' }}>
                                    Name:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <input
                                        
                                        type="text"
                                        value={formData.NameEmg || defaultValues.NameEmg || ''}
                                        onChange={(e) => handleInputChange('NameEmg', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center' }}>
                                    Relationship:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <select
                                        value={formData.RelationEmg || defaultValues.RelationEmg || ''}
                                        onChange={(e) => handleInputChange('RelationEmg', e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        <option value="01">Brother</option>
                                        <option value="02">Daughter</option>
                                        <option value="03">Father</option>
                                        <option value="04">Husband</option>
                                        <option value="05">Mother</option>
                                        <option value="06">Other</option>
                                        <option value="07">Sister</option>
                                        <option value="08">Son</option>
                                        <option value="09">Wife</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center' }}>
                                    Mobile Number:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <input
                                        
                                        type="text"
                                        value={formData.MoblieEmg || defaultValues.MoblieEmg || ''}
                                        onChange={(e) => handleInputChange('MoblieEmg', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>


                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center' }}>
                                    Email Address:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <input
                                        
                                        type="text"
                                        value={formData.EmailEmg || defaultValues.EmailEmg || ''}
                                        onChange={(e) => handleInputChange('EmailEmg', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center' }}>
                                    Address :
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <input
                                        
                                        type="text"
                                        value={formData.Addr8 || defaultValues.Addr8 || ''}
                                        onChange={(e) => handleInputChange('Addr8', e.target.value)}
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

export default EmergencyContactInfo;
