import React, { useState, Component, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [userType, setUserType] = useState('');
    const navigate = useNavigate();


    const validationSchema = Yup.object().shape({
        yupFirstName: Yup.string().required("First Name is Required."),
        yupLastName: Yup.string().required("Last Name is Required"),
        yupUsername: Yup.string()
            .required("Username is Required.")
            .min(6, "Username must be at least 6 characters.")
            .max(20, "Username must be less than 20 characters."),
        yupEmail: Yup.string()
            .required("Email Address is Required")
            .email("Email is invalid."),
        yupPassword: Yup.string()
            .required("Password is Required.")
            .min(6, "Password must be at least 6 characters")
            .max(40, "Password must be less than 40 characters"),
        yupConfirmPassword: Yup.string()
            .required("Confirm Password is Required.")
            .oneOf([Yup.ref('yupPassword'), null], "Confirm Password does not match."),
        yupRadio: Yup.string().required("An account type is required.").nullable()
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = data => {
        console.log(JSON.stringify(data, null, 2));
        console.log(userType);
        Axios.post('http://localhost:3001/api/insert', {
            firstName: firstName,
            lastName: lastName,
            username: username,
            emailAddress: emailAddress,
            password: password,
            userType: userType
        }).then(() => {
            alert("Successful Insert");
        })
        navigate("/main");
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <div className="register-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h3>Sign Up</h3>
                        <div className="form-group">
                            <label>First name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.yupFirstName ? 'is-invalid' : ''}`}
                                placeholder="First name"
                                {...register('yupFirstName')}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <div className="invalid-feedback">{errors.yupFirstName?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label>Last name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.yupLastName ? 'is-invalid' : ''}`}
                                placeholder="Last name"
                                {...register('yupLastName')}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <div className="invalid-feedback">{errors.yupLastName?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label>Username</label>
                            <input
                                type="text"
                                className={`form-control ${errors.yupUsername ? 'is-invalid' : ''}`}
                                placeholder="Username"
                                {...register('yupUsername')}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <div className="invalid-feedback">{errors.yupUsername?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className={`form-control ${errors.yupEmail ? 'is-invalid' : ''}`}
                                placeholder="Enter email"
                                {...register('yupEmail')}
                                onChange={(e) => setEmailAddress(e.target.value)}
                            />
                            <div className="invalid-feedback">{errors.yupEmail?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className={`form-control ${errors.yupPassword ? 'is-invalid' : ''}`}
                                placeholder="Enter password"
                                {...register('yupPassword')}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="invalid-feedback">{errors.yupPassword?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className={`form-control ${errors.yupConfirmPassword ? 'is-invalid' : ''}`}
                                placeholder="Confirm password"
                                {...register('yupConfirmPassword')}
                            />
                            <div className="invalid-feedback">{errors.yupConfirmPassword?.message}</div>
                        </div>
                        <div class="form-check">
                            <input
                                type="radio"
                                class={`form-check-input ${errors.yupRadio ? 'is-invalid' : ''}`}
                                id="radio1"
                                name="optradio"
                                value="customer"
                                {...register('yupRadio')}
                                onChange={(e) => setUserType(e.target.value)} />I'm a Customer
                            <label class="form-check-label" for="radio1"></label>
                        </div>
                        <div class="form-check">
                            <input
                                type="radio"
                                class={`form-check-input ${errors.yupRadio ? 'is-invalid' : ''}`}
                                id="radio2" name="optradio"
                                value="employee"
                                {...register('yupRadio')}
                                onChange={(e) => setUserType(e.target.value)} />I'm an Employee
                            <label class="form-check-label" for="radio2"></label>
                        </div>
                        <div class="form-check">
                            <input
                                type="radio"
                                class={`form-check-input ${errors.yupRadio ? 'is-invalid' : ''}`}
                                id="radio3" name="optradio"
                                value="manager"
                                {...register('yupRadio')}
                                onChange={(e) => setUserType(e.target.value)} />I'm a Manager
                            <label class="form-check-label" for="radio3"></label>
                            <div className="invalid-feedback">{errors.yupRadio?.message}</div>
                        </div>

                        <div className='d-grid'>
                            <button type='submit' className='btn btn-primary'>Submit</button>
                        </div>
                        <p className="forgot-password text-right">
                            Already registered: <a href="/sign-in"> Sign In</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SignUp;