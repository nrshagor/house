import React, { useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, InputGroup, Row, Spinner } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import './Registation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser, faAt, faFileSignature } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../Hook/useAuth';

const Registration = () => {
    const [loginData, setLoginData] = useState({});
    const location = useLocation();
    const history = useNavigate();
    const { user, authError, registerUser, signInWithGogle, isLoading } = useAuth();
    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
        console.log(field, value);
    }
    const handleloginSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert('password did not match');
            return
        }
        registerUser(loginData.email, loginData.password, loginData.name, history);
        e.preventDefult();

    }
    const handleGoogleSignIn = () => {
        signInWithGogle();
    }
    return (
        <>
            <div className="registration-background">

                <div className="container">
                    <div className="registration-box">
                        <div className="row">
                            <div className="col-md-6 registration-left">
                                <h1>Registation</h1>
                                {!isLoading &&
                                    <>
                                        <Form onSubmit={handleloginSubmit} className="my-5">

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text><FontAwesomeIcon icon={faFileSignature} /></InputGroup.Text>
                                                    <Form.Control type="text" name="name" onBlur={handleOnChange} placeholder="Enter Your Name" />
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group className="mb-3" >
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                                                    <Form.Control type="email" name="email" onBlur={handleOnChange} placeholder="Enter email" />
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group className="mb-3" >
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text><FontAwesomeIcon icon={faKey} /></InputGroup.Text>
                                                    <Form.Control type="password" name="password" onBlur={handleOnChange} placeholder="Password" />
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group className="mb-3" >
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text><FontAwesomeIcon icon={faKey} /></InputGroup.Text>
                                                    <Form.Control type="password" name="password2" onBlur={handleOnChange} placeholder="Re-Type Password" />
                                                </InputGroup>
                                            </Form.Group>
                                            <Button variant="primary" type="submit">
                                                Submit
                                            </Button>
                                            <Link to="/login"><Button variant="text">
                                                Already Registerd
                                            </Button></Link>
                                        </Form>
                                        <p>================</p>
                                        <Button onClick={handleGoogleSignIn} variant="primary" >
                                            Google Sign In
                                        </Button>
                                    </>
                                }
                                {isLoading && <Spinner animation="border" variant="danger" />}
                                {user?.email && <Alert variant="success">
                                    User Created Successfully
                                </Alert>}
                                {authError && <Alert variant="danger">
                                    {authError}
                                </Alert>}

                            </div>
                            <div className="col-md-6 registration-right">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Registration;