import React, { useState, Component, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from 'axios';
import HashTable from '../HashTable';

const MakeReservation = () => {
    const [confID=location.state.confID, setConfID] = useState('');
    const [firstName=location.state.firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [numItem1, setNumItem1] = useState(0);
    const [numItem2, setNumItem2] = useState(0);
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [communicationMethod, setCommunicationMethod] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange=(evnt, value)=>{  
        if (evnt.currentTarget.id == "firstnameinput") {
            setFirstName(`${value}`);
        } else if (evnt.currentTarget.id == "lastname") {
            setLastName(`${value}`);
        } else if (evnt.currentTarget.id == "email") {
            setEmailAddress(`${value}`);
        } else if (evnt.currentTarget.id == "date") {
            setDate(`${value}`);
        } else if (evnt.currentTarget.id == "phone") {
            setPhoneNumber(`${value}`);
        } else if (evnt.currentTarget.id == "starttime") {
            setStartTime(`${value}`);
        } else if (evnt.currentTarget.id == "endtime") {
            setEndTime(`${value}`);
        } else if (evnt.currentTarget.id == "item1") {
            setNumItem1(`${value}`);
        } else if (evnt.currentTarget.id == "item2") {
            setNumItem2(`${value}`);
        } else if (evnt.currentTarget.id == "additionalinfo") {
            setAdditionalInfo(`${value}`);
        }
    }

    const main = () => {
        navigate("/main");
    }

    let location = useLocation();

    const info = () => {
        navigate("/info", {
            state : {
                date : 'result.data.date',
                email : 'result.data.email',
                phone : 'result.data.phone',
                starttime : 'result.data.starttime',
                endtime : 'result.data.endtime',
                organizers : 'result.data.organizers',
                confID : 'confID',
            }
        });
    }
    
    const makeUniqueID = () => {
        // Reference to ran string https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        var hashLength = Math.random() * 10;
        for ( var i = 0; i < hashLength; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const onSubmit = () => {
        var result = makeUniqueID();
        // TODO GET INPUT TO INSERT TO DATABASE
        Axios.post('http://localhost:3001/api/eventInsert', {
            username : 'jpha',
            confID: result,
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            phoneNumber: phoneNumber,
            // TODO CONVERT DATE FORMAT TO DATABASE
            date: 2020-22-12,
            startTime: startTime,
            endTime: endTime,
            numItem1: numItem1,
            numItem2: numItem2,
            additionalInfo: additionalInfo,
            communicationMethod: communicationMethod
        }).then((result) => {
            if (!result.data.err) {
                alert(`Successful Insert! Your Confirmation ID is ${result}`);
                // TODO OPEN THE ACTUAL MADE RESERVATION
                //'ER_TRUNCATED_WRONG_VALUE'
                info();
            } if (result.data.err === "ER_TRUNCATED_WRONG_VALUE") {
                // break
            } else {
                onSubmit();
            }
        });
    };

    return (
        <form className="reservation-form" id="makeform">
            <div className="form-header">
                <h1>Reservation Form</h1>
                <h2>[Business Name]</h2>
                <h3>[Name of Reservation/Event]</h3>
            </div>
            {/* First Name and Last Name Fields */}
            <div className="form-body">
                <div className="horizontal-group">
                    <div className="form-group left">
                        <label for="firstname" className="label-title">First Name</label>
                        <input 
                            onChange={e => handleChange(e, e.target.value)}
                            value={firstName}
                            type="text"
                            className="form-input" 
                            id="firstnameinput"
                            placeholder="Enter Your First Name"
                            required="required"
                        />
                    </div>
                    <div className="form-group right">
                        <label for="lastname" className="label-title">Last Name</label>
                        <input
                            onChange={e => handleChange(e, e.target.value)}
                            value={lastName}
                            type="text"
                            className="form-input"
                            id="lastname"
                            placeholder="Enter Your Last Name"
                            requried="required"
                        />   
                    </div>
                </div>

                {/* Email and Phone Number Fields */}
                <div className="horizontal-group">
                    <div className="form-group left">
                        <label for="email" className="label-title">Email</label>
                        <input
                            onChange={e => handleChange(e, e.target.value)}
                            value={emailAddress}
                            type="email"
                            className="form-input-email"
                            id="email"
                            placeholder="email@example.com"
                            required="required"
                        />
                    </div>
                    <div className="form-group right">
                        <label for="phone" className="label-title">Phone Number</label>
                        <input
                            onChange={e => handleChange(e, e.target.value)}
                            value={phoneNumber}
                            type="tel"
                            className="form-input"
                            id="phone"
                            placeholder="XXXXXXXXXX"
                            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                            required="required"
                        />
                    </div>
                </div>

                {/* Date and Time Fields */}
                <div className="horizontal-group">
                    <div className="form-group left">
                        <label for="date" className="label-title">Date</label>
                        <input
                            onChange={e => handleChange(e, e.target.value)}
                            value={date}
                            type="date"
                            className="form-input"
                            id="date"
                            required="required"
                        />
                    </div>
                    <div className="form-group right">
                        <label for="time" className="label-title">Time</label>
                        <div className="two-column">
                            <input
                                onChange={e => handleChange(e, e.target.value)}
                                value={startTime}
                                type="time"
                                className="form-input"
                                id="starttime"
                                required="required"
                            />
                            <div className="divider"></div>
                            <label for="endtime" className="label-title">to</label>
                            <div className="divider"></div>
                            <input
                                onChange={e => handleChange(e, e.target.value)}
                                value={endTime}
                                type="time" 
                                className="form-input"
                                id="endtime"
                                required="required"
                            />                                    
                        </div>
                    </div>
                </div>
                
                {/* Item Fields */}
                <div className="horizontal-group">
                    <div className="form-group left">
                        <div className="two-column">
                            <label for="item1" className="label-title">Number Of Item #1:</label>
                            <div className="divider"></div>
                            <input
                                onChange={e => handleChange(e, e.target.value)}
                                value={numItem1}
                                type="number"
                                className="form-input-item"
                                id="item1"
                                min="0"
                                max="10"
                            />
                        </div>
                    </div>
                    <div className="form-group right">
                        <label for="item2" className="label-title">Number Of Item #2:</label>
                        <div className="divider"></div>
                        <input
                            onChange={e => handleChange(e, e.target.value)}
                            value={numItem2}
                            type="number"
                            className="form-input-item"
                            id="item2"
                            min="0"
                            max="10"
                        />
                    </div>
                </div>

                {/* Additional Information Field */}
                <div className="form-group">
                    <label for="additionalinfo" className="label-title">Additional Information</label>
                    <textarea
                        onChange={e => handleChange(e, e.target.value)}
                        value={additionalInfo}
                        rows="4"
                        cols="50"
                        className="form-input"
                        id="additionalinfo"
                        placeholder="Please include any important additional information about your reservation here."
                    />
                </div>

                {/* Reservation Notification Options */}
                <label className="label-title">Please select your preferred method of communication for receiving notifications and reminders about this reservation.</label>
                <div className="input-group">
                    <input
                        // value={location.state.communicationMethod}
                        type="radio"
                        className="input-group-input"
                        name="communication"
                        id="option1"
                        required="required"
                    />
                    <label className="input-group-label">Email</label>
                </div>
                <div className="input-group">
                <input
                        // value={location.state.communicationMethod}
                        type="radio"
                        className="input-group-input"
                        name="communication"
                        id="option2"
                        required="required"
                    />
                    <label className="input-group-label">Text Message</label>
                </div>
                <br></br>

                {/* Make Reservation and Cancel Buttons */}
                <div class="form-footer">
                    <center>
                        <button type="submit" className="btn" id="make" onClick={onSubmit}>Make Reservation</button>
                        <div className="divider"/>
                        <button type="submit" className="btn" onClick={main}>Cancel</button>
                    </center>
                </div>
            </div>
    </form>
    ) 
}

export default MakeReservation;