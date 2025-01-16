import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Container, Row, Col, Spinner, Image, Button } from 'react-bootstrap';


function ProductSpecification() {

    const [product,setProdcut] = useState([])
    const { productId } = useParams();

    useEffect(() => {
        const fetctData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/laptops/'+productId);
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProdcut(data['data']);
                
            } catch (error) {
                console.error('Error fetching product', error);
                
            }
        }
        const intervalId = setInterval(fetctData,500);

        return () => clearInterval(intervalId);
    },[]);
    
    
    if(!product?.features)
        return (
            <Container className="d-flex justify-content-center align-items-center vh-100">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Container>
          );
    else
        return (
            <Container className="my-5">
                <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid rounded />
                </Col>
                <Col md={6}>
                    <h1 className="display-6 mb-4">{product.name}</h1>
                    <p className="lead">{product.description}</p>
                    <h4 className="mt-4">Price: <span className="text-primary">${product.price}</span></h4>
                    <div className="d-flex mt-3">
                    <Button variant="primary" className="me-3">Add to Cart</Button>
                    <Button variant="outline-secondary">Wishlist</Button>
                    </div>
                    <h3 className="mt-5">Specifications:</h3>
                    <ul className="list-group list-group-flush">
                    {
                        product.features ? (
                        product.features.map(([key, value], index) => (
                        <li key={uuidv4()} className="list-group-item">
                            <strong>{key}:</strong> {value}
                        </li>
                        ))
                    ) : (
                        <p>No specifications available.</p>
                    )}
                    </ul>
                </Col>
                </Row>
            </Container>
        );
}

export default ProductSpecification;

