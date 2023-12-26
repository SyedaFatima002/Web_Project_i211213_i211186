import React from "react";
import '../CSS/profile.css';
import useNotification from "../Hooks/useNotification";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../CSS/Wishlist.css'

function Notification(){
    const {error, isError, isLoading, data}=useNotification();
    console.log(data)
    return (
        <div style={{padding:'5%'}}>
            <div style={{textAlign:'center'}}>
                <h5>Your Notifications</h5>
            </div>
            {isError && <div>Sorry we cant do shit. Gonna change this late {error.message}</div>}
            {isLoading && <div>Loading Following List</div>}
            {data && data.notifications && data.notifications.length > 0 ? (
                data.notifications.map((noti, index) => (
                    <Container key={index}>
                        <Row>
                            <Col>{index+1}. {noti}</Col>
                        </Row>
                    </Container>
                ))
            ) : (
                <div>You Don't Have any Notifications</div>
            )}
        </div>
    );
}

export default Notification