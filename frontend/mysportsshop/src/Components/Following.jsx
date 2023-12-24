import React from "react";
import '../CSS/profile.css';
import useFollowing from "../Hooks/useFollowing";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../CSS/Wishlist.css'

function Following(){
    const {error, isError, isLoading, data}=useFollowing();
    console.log(data)
    return (
        <>
            { isError && <div>Sorry we cant do shit. Gonna change this late {error.message} </div>}
            { isLoading && <div>Loading Following List</div>}
            {data && data.length>0 ? (data.map((brand, index)=>{
                <Container key={index}>
                    <Row>
                        <Col>{brand}</Col>
                    </Row>
                </Container>
            })):<div>You are not Following anybody</div> }
        </>
    );
}

export default Following