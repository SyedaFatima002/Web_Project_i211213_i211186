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
import { useMutation, useQueryClient} from '@tanstack/react-query';
import { sendReview } from "../ApiCalls/addReview";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import useCart from "../Hooks/useCart";
import { addToWishList } from "../ApiCalls/addToWishlist";
import { followBrand } from "../ApiCalls/followBrand";



//titles and soldout symbol
function ProductTitle({ data }) {
    let sumDiscount = data.discount ? data.discount.reduce((acc, disc) => acc + disc, 0) : 0
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
            <p>By: {data.brandname}</p>
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
    const queryClient = useQueryClient();

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
                queryClient.invalidateQueries('getItem');
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
function Color({ data, newProduct }) {
    const [radioValue, setRadioValue] = useState(data.color[0]);

    const handleRadioChange = (value) => {
        console.log(value)
        setRadioValue(value);
        newProduct.options[0] = value
    };

    return (
        <>
            <span>Colors: </span>
            <ButtonGroup>
                {data.color.map((color, idx) => (
                    <ToggleButton
                        key={idx}
                        type="radio"
                        variant={'outline-dark'}
                        name="radio"
                        value={color}
                        checked={radioValue === color}
                        onClick={() => handleRadioChange(color)}
                    >
                        {color}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </>
    );
}

//size display
function Size({ data, newProduct }) {
    const [radioVal, setRadioVal] = useState(data.options[0]);

    const handleRadioChange = (value) => {
        console.log(value)
        setRadioVal(value);
        newProduct.options[1] = value
    };

    return (
        <>
            <span>Option: </span>
            <ButtonGroup>
                {data.options.map((option, idx) => (
                    <ToggleButton
                        key={idx}
                        type="radio"
                        variant={'outline-dark'}
                        name="optradio"
                        value={option}
                        checked={radioVal === option}
                        onClick={() => handleRadioChange(option)}
                    >
                        {option}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </>
    );
}

//quantity button
//add to cart option
//follow brand option
function FinalButtons({ newProduct }) {
    const [quantity, setQuantity] = useState(1);
    const [check, setCheck]=useState(true)
    const { addToCart } = useCart((state) => state);
    const {token}=useUser();

    const additionMutation=useMutation({
        mutationFn: async(item)=> {
            try{
                const result= await addToWishList(item.token, item.wishId)
                return result
            }catch(err){
                console.error('Error deleting wish item:', err);
                throw err;
            }
        }
    })

    const followingMutation=useMutation({
        mutationFn: async(item)=> {
            try{
                const result= await followBrand(item.token, item.followid)
                return result
            }catch(err){
                console.error('Error deleting wish item:', err);
                throw err;
            }
        }
    })

    const handleAddToCart = () => {
        newProduct.quantity = quantity
        addToCart(newProduct, 'cash on delivery')
        
        alert('Added to Cart');
    };

    const handleFollowBrand = (e) => {
        e.preventDefault();
        followingMutation.mutate({
            token,
            followid:newProduct.brand
        },{ 
            onSuccess: (data) => {
                console.log(data);
            },
        })
        console.log('Followed Brand');
        setCheck(false)
        alert('You now follow '+ newProduct.brand)
    };

    const handleAddToWishList=(e)=>{
        e.preventDefault();
        additionMutation.mutate({
            token,
            wishId:newProduct.productID
        },{
            onSuccess: (data) => {
                console.log(data);
            },
        })

        
    }

    return (
        <>
            <div>
                <Button variant="outline-success" onClick={() => setQuantity(quantity + 1)} style={{ margin: "10px" }}>
                    + Quantity
                </Button>
                <span className="mx-2" style={{ border: "1px solid lightgray", padding: "10px" }}>{quantity}</span>
            </div>
            <div className="d-flex">
                <Button variant="warning" onClick={handleAddToCart} style={{ margin: "10px" }}>
                    Add to Cart
                </Button>

                <Button variant="dark" onClick={(e)=>handleFollowBrand(e)} style={{ margin: "10px" }} active={check}>
                    Follow Brand
                </Button>

                <Button variant="danger" onClick={(e)=>handleAddToWishList(e)} style={{ margin: "10px" }}>
                    Add Item To Wishlist
                </Button>
            </div>
        </>
    );
}

function ItemDisplay() {
    const [key, setKey] = useState('description');
    const { login } = useLogin();

    const { itemId } = useItemId()
    console.log(itemId)
    const { error, isError, isLoading, data } = useItemDisplay(itemId)
    console.log(data)

    //storing new product in cart
    const newProduct = data ? {
        productID: data._id,
        productname: data.name,
        brand: data.brandname,
        unitprice: data.price,
        options: ['color', 'option'],
        discount: data.discount,
        quantity: 1, 
        image:data.image
    } : null;

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
                                            <Reviews data={data}></Reviews>
                                        </Tab>

                                        <Tab eventKey="sendreview" title="Review Product">
                                            {login && <PlaceReview productid={data._id} />} 
                                            {!login && <div>Please Login to Leave Review</div>}
                                        </Tab>
                                    </Tabs>
                                    <div className="bordertop"></div>
                                    <Color data={data} newProduct={newProduct} />
                                    <div className="bordertop"></div>
                                    <Size data={data} newProduct={newProduct} />
                                    <div className="bordertop"></div>
                                    <FinalButtons newProduct={newProduct} />
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

