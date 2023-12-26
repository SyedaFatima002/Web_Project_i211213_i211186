import React from "react";
import '../CSS/profile.css';
import useFollowing from "../Hooks/useFollowing";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from "react-bootstrap";
import '../CSS/Wishlist.css'
import useUser from "../Hooks/useUser";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unfollowbrand } from "../ApiCalls/unfollowbrand";


function Following() {
    const { error, isError, isLoading, data } = useFollowing();
    const { token } = useUser();
    const queryClient = useQueryClient();

    const unfollowMutation = useMutation({
        mutationFn: async (variables) => {
            try {
                const result = await unfollowbrand(variables.token, variables.brand)
                return result
            } catch (error) {
                console.error('Error deleting wish item:', error);
                throw error;
            }
        }
    })

    const handleUnFollow = (e, brand) => {
        e.preventDefault();
        unfollowMutation.mutate({
            token: token,
            brand: brand
        },
            {
                onSuccess: (data) => {
                    console.log(data);
                    queryClient.invalidateQueries('getfollowing');
                },
            })
    }
    console.log(data)
    return (
        <div>
            <Row style={{  padding: '3%' }}>
                <Col xs={4}></Col>
                <Col xs={6}><h5>Your Favourite Brands</h5></Col>
                <Col xs={2}></Col>
            </Row>
            <Row>
                <Col><b>Brand Name</b></Col>
            </Row>
            {isError && <div>Sorry we cant do shit. Gonna change this late {error.message} </div>}
            {isLoading && <div>Loading Following List</div>}
            {data && data.followingBrands && data.followingBrands.length > 0 ? (
                data.followingBrands.map((brand, index) => (
                    <Container key={index} style={{marginBottom: '10px', padding:'5px'}}>
                        <Row>
                            <Col xs={8}>{index + 1}. {brand}</Col>
                            <Col xs={4}>
                                <Button variant={'outline-danger'} onClick={(e) => handleUnFollow(e, brand)}>UnFollow Brand</Button>
                            </Col>
                        </Row>
                    </Container>
                ))) : <div>You are not Following anybody</div>}
        </div>
    );
}

export default Following