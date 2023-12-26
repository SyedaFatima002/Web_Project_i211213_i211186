import React from "react";
import '../CSS/profile.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../CSS/Wishlist.css'
import useLoyalty from "../Hooks/useLoyalty";

function LoyaltyPoints(){
    const { error, isError, isLoading, data }=useLoyalty();


    console.log(data)
    return (
        <>
            <Row style={{  padding: '3%' }}>
                <Col xs={4}></Col>
                <Col xs={6}><h5>Your Loyalty Points</h5></Col>
                <Col xs={2}></Col>
            </Row>
            { isError && <div>Sorry we cant do shit. Gonna change this late {error.message} </div>}
            { isLoading && <div>Loading Pointst</div>}
            {data ? 
                (
                    <div style={{textAlign:'center', paddingBottom:'5%'}}>You have {data.points} Loyalty Points</div>
                )
            :<div>You Dont have any Loyalty Points</div> }
        </>
    );
}

export default LoyaltyPoints