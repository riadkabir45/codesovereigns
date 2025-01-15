import React from "react";
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

function createCard(props){
    return(
      <Col key={props.id}>
        <Card className="h-100">
          <Card.Img variant="top" src={props.image} alt={props.name} />
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
          </Card.Body>
          <Card.Footer className="d-flex justify-content-between align-items-center">
          <Card.Text>${props.price}</Card.Text>
            <a href={"/product/"+props.id} className="btn btn-primary">View Details</a>
          </Card.Footer>
        </Card>
      </Col>
    );
}

function ProductDisplay(){

    const [laptops,setLaptops] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/laptops');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setLaptops(data['data']);
          } catch (error) {
            console.error("Error fetching product list:", error); 
          }
        };
    
        const intervalId = setInterval(fetchData, 500); 
    
        return () => clearInterval(intervalId); 
      }, []);

    

    return(
      <Container>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {laptops.map(createCard)}
      </Row>
    </Container>
    );
}

export default ProductDisplay;