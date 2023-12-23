import NavBar from "../Components/NavBar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../CSS/itemdisplay.css'
import useItemDisplay from "../Hooks/useItemDisplay";
import useItemId from "../Hooks/useItemId";
import Image from 'react-bootstrap/Image';
import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';



function ItemDisplay() {
    const [key, setKey] = useState('description');

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
                <div className="center">
                    <Container className="itemContainer">
                        <Row>
                            <Col sm={6}>
                                <Image src={data.image} rounded className="imagSize padding" />
                            </Col>
                            <Col sm={6}>
                                <div className="padding">
                                    <p className="sport">{data.sport}</p>
                                    <p>
                                        <span className="name">{data.name} </span>
                                        <span className="collection">({data.Collection})</span>
                                    </p>
                                    <p>$ {data.price} each</p>
                                    <Tabs
                                        id="controlled-tab-example"
                                        activeKey={key}
                                        onSelect={(k) => setKey(k)}
                                        className="mb-3"
                                        fill
                                    >
                                        <Tab eventKey="description" title=" Product Description">
                                            <p>Gender: {data.gender}</p>
                                            <p>{data.description}</p>
                                        </Tab>
                                        <Tab eventKey="review" title="Reviews">
                                            //to be done
                                        </Tab>
                                    </Tabs>
                                    <div className="bordertop"></div>
                                    <p>Color</p>
                                    

                                    <div className="bordertop"></div>
                                    <p>Sizes</p>
                                    
                                    
                                //quantity option
                                //soldout symbol
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