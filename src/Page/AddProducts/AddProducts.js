import React, { useRef, Component } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import './AddProduct.css'
const AddProducts = () => {
    const brandRef = useRef();
    const modelRef = useRef();

    const imgRef = useRef();

    const handleAddServices = e => {

        const brand = brandRef.current.value;
        const model = modelRef.current.value;

        const img = imgRef.current.value;
        const newServices = {
            brand, model, img
        }
        fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newServices)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Successfully Add Services')
                    e.target.reset();
                }
            })

        e.preventDefault();
    }
    return (
        <>
            <div className="add-product-background">

                <div className="container">
                    <div className="add-product-box">
                        <div className="row">
                            <h2> Add Product </h2>
                            <div className="col-md-12 add-product-left">
                            </div>
                            <div className="col-md-12 add-product-right">
                                <Form onSubmit={handleAddServices}>
                                    <Row className="mb-2">
                                        <Form.Group as={Col} className="col-12 col-lg-4" controlId="">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control ref={brandRef} type="text" placeholder="Enter Name" />
                                        </Form.Group>
                                        <Form.Group as={Col} className="col-12 col-lg-4" controlId="">
                                            <Form.Label>House</Form.Label>
                                            <Form.Control ref={modelRef} type="text" placeholder="Enter House" />
                                        </Form.Group>
                                    </Row>


                                    <Form.Group className="mb-3" controlId="">
                                        <Form.Label>Image URL</Form.Label>
                                        <Form.Control ref={imgRef} type="text" placeholder="Enter Image URL" />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" value="Add">
                                        Add product
                                    </Button>
                                </Form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default AddProducts;