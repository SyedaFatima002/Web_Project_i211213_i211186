import React from "react";
import '../CSS/profile.css';
import useLoyaltyPoints from "../Hooks/useLoyaltyPoints";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../CSS/Wishlist.css'

function LoyaltyPoints(){
    const {error, isError, isLoading, data}=useLoyaltyPoints();
    console.log(data)
    return (
        <>
            { isError && <div>Sorry we cant do shit. Gonna change this late {error.message} </div>}
            { isLoading && <div>Loading Pointst</div>}
            {data && data.points && data.points.length>0 ? (
                data.points.map((brand, index)=>{
                <Container key={index}>
                    <Row>
                        <Col>Brand Name: {brand.supplier} </Col>
                        <Col>Loyalty Points: {brand.points}</Col>
                    </Row>
                </Container>
            })):<div>You Dont have any Loyalty Points</div> }
        </>
    );
}

export default LoyaltyPoints