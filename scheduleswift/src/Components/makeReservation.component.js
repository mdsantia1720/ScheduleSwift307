import React, { Component } from 'react';
export default class MakeReservation extends Component {
    render() {
        return (
            <form class="reservation-form">
                <div class="form-header">
                    <h1>Reservation Form</h1>
                </div>
                {/* First Name and Last Name Fields */}
                <div className="form-body">
                    <div className="horizontal-group">
                        <div className="form-group left">
                            <label for="firstname" className="label-title">First Name *</label>
                            <input 
                                type="text"
                                className="form-input" 
                                id="firstname"
                                placeholder="Enter Your First Name" 
                                required="required"
                            />
                        </div>
                        <div className="form-group right">
                            <label for="lastname" className="label-title">Last Name *</label>
                            <input
                                type="text"
                                className="form-input"
                                id="lastname"
                                placeholder="Enter Your First Name"
                                requried="required"
                            />   
                        </div>
                    </div>

                    {/* Email and Phone Number Fields */}
                    <div className="horizontal-group">
                        <div className="form-group left">
                            <label for="email" className="label-title">Email *</label>
                            <input
                                type="email"
                                className="form-input"
                                id="email"
                                placeholder="email@example.com"
                                required="required"
                            />
                        </div>
                        <div className="form-group right">
                            <label for="phone" className="label-title">Phone Number *</label>
                            <input
                                type="tel"
                                className="form-input"
                                id="phone"
                                placeholder="(XXX) XXX-XXXX"
                                pattern="([0-9]{3})-[0-9]{2}-[0-9]"
                                required="required"
                            />
                        </div>
                    </div>

                    {/* Date and Time Fields */}
                    <div className="horizontal-group">
                        <div className="form-group left">
                            <label for="date" className="label-title">Date *</label>
                            <input
                                type="date"
                                className="form-input"
                                id="date"
                                required="required"
                            />
                        </div>
                        <div className="form-group right">
                            <label for="time" className="label-title">Time *</label>
                            <input
                                type="time"
                                className="form-input"
                                id="time"
                                required="required"
                            />
                        </div>
                    </div>

                    {/* Item Fields */}
                    <div className="horizontal-group">
                        <div className="form-group left">
                            <label for="item1" className="label-title">Item #1</label>
                            <input
                                type="text"
                                className="form-input"
                                id="item1"
                            />
                        </div>
                        <div className="form-group right">
                            <label for="item2" className="label-title">Item #2</label>
                            <input
                                type="text"
                                className="form-input"
                                id="item2"
                            />
                        </div>
                    </div>

                    {/* Additional Information Field */}
                    <div className="form-group">
                        <label for="additionalinfo" className="label-title">Additional Information</label>
                        <textarea
                            type="text"
                            className="form-input"
                            id="additionalinfo"
                            placeholder="Please include any important additional information about your reservation here."
                        />
                    </div>

                    {/* Reservation Notification Options */}

                    {/* Submit and Cancel Buttons */}

                </div>
        </form>
        ) 
    }
}