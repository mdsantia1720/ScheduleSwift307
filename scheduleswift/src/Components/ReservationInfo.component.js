import React, { Component, ReactDOM } from 'react';
import Event from '../Event.js';
import Reservationinfo from '../Reservationinfo';
import ReservationForm from './makeReservation.component';
import Registration from '../Registration';
import { useNavigate } from "react-router-dom";

///TODO : Missing event Listener to buttons and access event information from the database

const ReservationInfo = () => {
    const navigate = useNavigate();
    const login = () => {
        return (<ReservationForm/>);
    }

    return (
        <form class="reservation-info">
            <div class="form-header">
                <h1>Reservation Information</h1>
            </div>
            {/* First Name and Last Name Fields */}
            <div className="form-body">
                <div className="horizontal-group">
                    <div className="form-group left">
                        <label for="Host" className="label-title">Host</label>
                        <div className="form-body">
                            <field-info for="Host" className="label">[Host name]</field-info>
                        </div>
                    </div>
                    <div className="form-group right">
                    <label for="Organizers" className="label-title">Organizers</label>
                        <div className="form-body">
                            <field-info for="Organizers" className="label">[User Organizers]</field-info>
                        </div>
                    </div>
                </div>

                {/* Email and Phone Number Fields */}
                <div className="horizontal-group">
                    <div className="form-group left">
                        <label for="email" className="label-title">Email</label>
                        <div className="form-body">
                            <field-info for="Email" className="label">email@example.com</field-info>
                        </div>
                    </div>
                    <div className="form-group right">
                        <label for="phone" className="label-title">Phone Number</label>
                        <div className="form-body">
                            <field-info for="Telephone" className="label">(XXX) XXX-XXXX</field-info>
                        </div>
                    </div>
                </div>

                {/* Date and Time Fields */}
                <div className="horizontal-group">
                    <div className="form-group left">
                        <label for="date" className="label-title">Date</label>
                        <div className="form-body">
                            <field-info for="Date" className="label">mm/dd/yyyy</field-info>
                        </div>
                    </div>
                    <div className="form-group right">
                        <label for="time" className="label-title">Time</label>
                        <div className="form-body">
                            <field-info for="Time" className="label">--:--AM - --:--PM</field-info>
                        </div>
                    </div>
                </div>

                {/* Item Fields */}
                <div className="horizontal-group">
                    <div className="form-group left">
                        <label for="item1" className="label-title">Item #1</label>
                        <div className="form-body">
                            <field-info for="item1" className="label">Selected/Quantity</field-info>
                        </div>
                    </div>
                    <div className="form-group right">
                        <label for="item2" className="label-title">Item #2</label>
                        <div className="form-body">
                            <field-info for="item2" className="label">Selected/Quantity</field-info>
                        </div>
                    </div>
                </div>

                <div className="horizontal-group">
                    <div className="form-group left">
                        <label for="item3" className="label-title">Item #3</label>
                        <div className="form-body">
                            <field-info for="item3" className="label">Selected/Quantity</field-info>
                        </div>
                    </div>
                    <div className="form-group right">
                        <label for="item4" className="label-title">Item #4</label>
                        <div className="form-body">
                            <field-info for="item4" className="label">Selected/Quantity</field-info>
                        </div>
                    </div>
                </div>
                <div className="horizontal-group">
                    <div className="form-group left">
                        <label for="item5" className="label-title">Item #5</label>
                        <div className="form-body">
                            <field-info for="item5" className="label">Selected/Quantity</field-info>
                        </div>
                    </div>
                    <div className="form-group right">
                        <label for="item6" className="label-title">Item #6</label>
                        <div className="form-body">
                            <field-info for="item6" className="label">Selected/Quantity</field-info>
                        </div>
                    </div>
                </div>

                {/* Additional Information Field */}
                <div className="form-group">
                    <label for="additionalinfo" className="label-title">Additional Information</label>
                    <div className="form-body">
                        <field-info for="addinfo" className="label">Please include any important additional information about your reservation here.</field-info>
                    </div>
                </div>

                {/* Reservation Notification Options */}
                <label className="label-title">Please select at least one way in which you would like to receive notifications and reminders about this reservation.</label>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="option1"
                        value="email"
                        // TODO change to be true if the box was selected
                        checked="true"
                    />
                    <label className="form-check-label">Email</label>
                </div>
                <div className="form-check">
                <input
                        type="checkbox"
                        className="form-check-input"
                        id="option2"
                        value="txtmessage"
                        // TODO change to be true if the box was selected
                        checked="true"
                    />
                    <label className="form-check-label">Text Message</label>
                </div>
                <br></br>

                {/* Submit and Cancel Buttons */}
                <div class="form-footer">
                    <center>
                        <button type="submit" className="btn" onClick={<Registration />}>Close</button>
                        <div className="divider"/>
                        <button type="submit" className="btn" onClick={login}>Edit</button>
                    </center>
                </div>
            </div>
    </form>
    );
}

export default ReservationInfo;
/** Initial attempt to incorporate scroll bar */
// ReactDOM.render(<ReservationInfo/>, document.querySelector('#growth'));