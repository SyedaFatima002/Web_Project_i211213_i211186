import NavBar from "../Components/NavBar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../CSS/itemdisplay.css'
import useItemDisplay from "../Hooks/useItemDisplay";
import useItemId from "../Hooks/useItemId";
import Image from 'react-bootstrap/Image';
import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import useLogin from "../Hooks/useLogin";
import useUser from "../Hooks/useUser";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendReview } from "../ApiCalls/addReview";


//titles and soldout symbol
function ProductTitle({ data }) {
    let sumDiscount = data.discount.reduce((acc, disc) => acc + disc, 0)
    const discounted = ((100 - sumDiscount) * data.price) / 100

    return (
        <>
            <p className="sport">{data.sport}</p>
            <p>
                <span className="name">{data.name} </span>
                <span className="collection">({data.Collection})</span>
            </p>

            {data.discount.length > 0 ? (
                <p>
                    <s style={{ color: "red" }}>${data.price} </s>
                    <span style={{ color: "green" }}> {discounted} each </span>
                </p>
            )
                : (<p>$ {data.price} each</p>)}

            {data.soldout ? (<p style={{ color: "red" }}>Soldout</p>) : (<p style={{ color: "green" }}>Stock Available</p>)}
        </>
    );
}

//product description
function Description({ data }) {
    return (
        <>
            <p>Gender: {data.gender}</p>
            <p>{data.description}</p>
        </>
    );
}

//reviews and comments and option to do that
function Reviews({ data }) {
    console.log(data.comments)
    return (
        <>
            {data.comments && data.comments.length > 0 ? (
                data.comments.map((comm, index) => (
                    <Container key={index} className="bt">
                        <Row >
                            <Col><b>Customer:</b> {comm.customer}</Col>
                            <Col><b>Rating:</b> {comm.rating}</Col>
                        </Row>
                        <Row style={{ paddingBottom: "10px" }}>
                            <Col>{comm.comment}</Col>
                        </Row>
                    </Container>
                ))
            ) : (
                <p>This product has yet to get reviews</p>
            )}
        </>
    );
}

//send review
function PlaceReview({ productid }) {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState();
    const [name, setName] = useState();
    const { token } = useUser();

    const handleRatingChange = (e) => {
        setRating(parseInt(e.target.value, 10));
    };

    const reviewMutation = useMutation({
        mutationFn: async (review) => {
            try {
                const result = await sendReview(review.token, review.username, review.rating, review.comment, review.productid)
                return result
            } catch (err) {
                console.error('Error in sending review:', err);
                throw err;
            }
        }
    })

    const handleReview = (e) => {
        e.preventDefault();
        reviewMutation.mutate({
            token: token,
            username: name,
            rating: rating,
            comment: comment,
            productid: productid
        }, {
            onSuccess: (data) => {
                console.log(data)
            }
        })
    }

    return (
        <Form style={{ marginBottom: "10px" }}>
            <Form.Group className="mb-3" >
                <Form.Label><b>Username</b></Form.Label>
                <Form.Control type="username" placeholder="Enter username/name of choice" onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Label><b>Rating</b></Form.Label>
            <Form.Range
                value={rating}
                onChange={handleRatingChange}
                min={1}
                max={5}
                step={1}
            />
            <p><b>Selected Rating:</b> {rating}</p>

            <Form.Group className="mb-3">
                <Form.Label><b>Comment</b></Form.Label>
                <Form.Control as="textarea" rows={3} onChange={(e) => setComment(e.target.value)} />
            </Form.Group>

            <Button variant="warning" onClick={(e) => handleReview(e)}>Submit Review</Button>
        </Form>
    );
}

//color display
function Color({ data }) {
    return (
        <>

        </>
    );
}

//size display

//quantity button

//add to cart option


//follow brand option

function ItemDisplay() {
    const [key, setKey] = useState('description');
    const { login } = useLogin();

    const { itemId } = useItemId()
    console.log(itemId)
    const { error, isError, isLoading, data } = useItemDisplay(itemId)
    console.log(data)

    return (
        <>
            <NavBar />
            {isError && <div>Error in getting product {error}</div>}
            {isLoading && <div>Item on the Way...</div>}

            {data &&
                <div className="bg">
                    <Container className="itemContainers">
                        <Row>
                            <Col sm={6}>
                                <Image src={data.image} rounded className="imagSize padding" />
                            </Col>
                            <Col sm={6}>
                                <div className="padding">
                                    <ProductTitle data={data}></ProductTitle>
                                    <Tabs
                                        id="controlled-tab-example"
                                        activeKey={key}
                                        onSelect={(k) => setKey(k)}
                                        className="mb-3"
                                        fill
                                    >
                                        <Tab eventKey="description" title=" Product Description">
                                            <Description data={data}></Description>
                                        </Tab>
                                        <Tab eventKey="review" title="Reviews">
                                            {login && <Reviews data={data}></Reviews>}
                                            {!login && <div>Please Login to Leave Review</div>}
                                        </Tab>

                                        <Tab eventKey="sendreview" title="Review Product">
                                            <PlaceReview productid={data._id} />
                                        </Tab>
                                    </Tabs>
                                    <div className="bordertop"></div>
                                    <Color data={data} />


                                    <div className="bordertop"></div>
                                    <p>Sizes</p>


                                //quantity option
                                //Add to Cart option
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

            }
        </>
    );
}

export default ItemDisplay;

/**
 * 
 * 
Collection
: 
"New Arrival"
brandname
: 
"Nike"
categories
: 
(2) ['Footwear', 'Running']
color
: 
(2) ['Blue', 'White']
comments
: 
[]
description
: 
"High-performance running shoes for athletes."
discount
: 
[10]
gender
: 
"unisex"
image
: 
"https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
name
: 
"Running Shoes"
options
: 
(2) ['Size 9', 'Size 10']
price
: 
99.99
ratings
: 
[]
soldout
: 
false
sport
: 
"Running"
stock
: 
10
__v
: 
0
_id
: 
"657e8b99ac6f3f002f3a964e"
[[Prototype]]
: 
Object
 */