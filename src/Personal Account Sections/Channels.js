import React, { useState, useEffect } from 'react';
import '../styles/AmendCustomerButton.css';
import DatePicker from 'react-datepicker';

const Channels = ({ formData, defaultValues, handleInputChange, highlightedFields ={} }) => {
    const [isSmsRegDateEdited, setIsSmsRegDateEdited] = useState(false);
    const [isAttr7Edited, setIsAttr7Edited] =  useState(false);
    const [isSmsColectnAcctEdited, setIsSmsColectnAcctEdited] = useState(false);
    const [isSectionOpen, setIsSectionOpen] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        if (defaultValues.SmsRegDate) {
            const year = defaultValues.SmsRegDate.slice(4);
            const month = defaultValues.SmsRegDate.slice(2, 4) - 1; // Month is 0-indexed
            const day = defaultValues.SmsRegDate.slice(0, 2);
            setSelectedDate(new Date(year, month, day));
        }
    }, [defaultValues.SmsRegDate]); // Update selectedDate when defaultValues.SmsRegDate changes

    const toggleSection = () => {
        setIsSectionOpen(!isSectionOpen);
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
        return day + month + year;
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setIsSmsRegDateEdited(true);
        const formattedDate = formatDate(date);
        handleInputChange('SmsRegDate', formattedDate);
    };

    return (
        <div>
            <div onClick={toggleSection} style={{ cursor: 'pointer', marginTop: '60px', marginBottom: '25px', fontSize: '10px', fontWeight: 'normal' }}>
                <strong className="title">Channels</strong> - {isSectionOpen ? 'Hide' : 'Show'}
            </div>

            {isSectionOpen && (
                <>
                    <div className="info">

                    <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['Attr7'] ? 'red' : 'black' }}>
                                    SMS Mobile Number:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <input
                                        className="required"
                                        type="text"
                                        value={isAttr7Edited ? (formData.Attr7 || '') : (defaultValues.Attr7 || '')}
                                        onChange={(e) => {
                                            handleInputChange('Attr7', e.target.value);
                                            setIsAttr7Edited(true);
                                        }}
                                        style={{ border: highlightedFields['Attr7'] ? '2px solid red' : '1px black' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['SmsRegDate'] ? 'red' : 'black' }}>
                                    SMS Registration Date:
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
                                        style={{ border: highlightedFields['SmsRegDate'] ? '2px solid red' : '1px black' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', width: '100%' }}>
                            <div style={{ flex: '20%', paddingRight: '10px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', color: highlightedFields['SmsColectnAcct'] ? 'red' : 'black' }}>
                                    SMS Coll. CASA Acct:
                                </label>
                            </div>
                            <div style={{ flex: '80%', paddingLeft: '10px' }}>
                                <div className="value">
                                    <input
                                        className="required"
                                        type="text"
                                        value={isSmsColectnAcctEdited ? (formData.SmsColectnAcct || '') : (defaultValues.SmsColectnAcct || '')}
                                        onChange={(e) => {
                                            handleInputChange('SmsColectnAcct', e.target.value);
                                            setIsSmsColectnAcctEdited(true);
                                        }}
                                        style={{ border: highlightedFields['SmsColectnAcct'] ? '2px solid red' : '1px black' }}
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

export default Channels;
