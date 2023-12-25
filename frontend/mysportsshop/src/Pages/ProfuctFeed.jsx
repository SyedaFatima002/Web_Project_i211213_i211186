import NavBar from "../Components/NavBar";
import useProductCall from "../Hooks/useProductCall";
import '../CSS/feed.css'
import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import showImage from '../Assets/menuOpen.svg'
import notshow from '../Assets/menuClosed.svg'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import usePage from "../Hooks/usePage";
import useItemId from "../Hooks/useItemId";
import useLogin from "../Hooks/useLogin";
import Pagination from 'react-bootstrap/Pagination';
import useFilters from "../Hooks/useFilters";
import useGetFilters from "../Hooks/useGetFilters";

function Price({ data }) {
    const { setPriceMin, setPriceMax } = useFilters();

    const handlePriceMin = (e) => {
        setPriceMin(e.target.value)
    }

    const handlePriceMax = (e) => {
        setPriceMax(e.target.value)
    }

    return (
        <>
            <Row>
                <Col>
                    <Form.Group controlId="priceRange">
                        <Form.Label>Select Price Preference</Form.Label>
                        <Form.Control type="textbox"
                            placeholder="Min Price"
                            style={{
                                fontSize: 'small',
                                marginBottom: '5px'
                            }}
                            onChange={handlePriceMin} />
                        <Form.Control type="textbox"
                            placeholder="Max Price"
                            style={{ fontSize: 'small', marginBottom: '15px' }}
                            onChange={handlePriceMax} />
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
}

function Gender({ data }) {
    const { gender, setGender } = useFilters();

    const handleGender = (gender) => {
        setGender(gender)
    }

    return (
        <div>
            <Row>
                <Col>
                    <Form.Group controlId="gender">
                        <Form.Label>Select Gender</Form.Label>
                        {data && data.gender.map((g, index) => (
                            <Form.Check
                                type={'radio'}
                                key={index}
                                id={g}
                                label={g}
                                checked={gender === g}
                                onChange={() => handleGender(g)}
                            />
                        ))}
                        <Form.Check
                            type={'radio'}
                            id={4}
                            label={'All'}
                            checked={gender === ''}
                            onChange={() => handleGender('')}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </div>
    )
}

function BrandName({ data }) {
    const { brandname, setBrand } = useFilters();

    const handleBrand=(brand)=>{
        setBrand(brand)
    }

    return (
        <div>
            <Row>
                <Col>
                    <Form.Group controlId="brand">
                        <Form.Label>Select By Brand Name</Form.Label>
                        <Form.Check
                            type={'radio'}
                            id={'none'}
                            label={'All'}
                            checked={'' === brandname}
                            onChange={()=>handleBrand('')}
                        />
                        {data && data.brandnames.map((brand, index)=>(
                            <Form.Check
                            type={'radio'}
                            key={index}
                            id={brand}
                            label={brand}
                            checked={brandname === brand}
                            onChange={()=>handleBrand(brand)}
                        />
                        ))}
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );
}

function Sport({ data }) {
    const { sport, setSport } = useFilters();

    const handleSport=(sport)=>{
        setSport(sport)
    }

    return (
        <div>
            <Row>
                <Col>
                    <Form.Group controlId="brand">
                        <Form.Label>Select By Sport</Form.Label>
                        <Form.Check
                            type={'radio'}
                            id={'all'}
                            label={'All'}
                            checked={sport === ''}
                            onChange={()=>handleSport('')}
                        />
                        {data && data.sports.map((brand, index)=>(
                            <Form.Check
                            type={'radio'}
                            key={index}
                            id={brand}
                            label={brand}
                            checked={sport === brand}
                            onChange={()=>handleSport(brand)}
                        />
                        ))}
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );
}

function Collections({ data }) {
    const { Collection,  setCollections } = useFilters();

    const handleCollections=(collect)=>{
        setCollections(collect)
    }

    return (
        <div>
            <Row>
                <Col>
                    <Form.Group controlId="brand">
                        <Form.Label>Select By Collections</Form.Label>
                        <Form.Check
                            type={'radio'}
                            id={'All'}
                            label={'All'}
                            checked={Collection === ''}
                            onChange={()=>handleCollections('')}
                        />
                        {data && data.Collections.map((c, index)=>(
                            <Form.Check
                            type={'radio'}
                            key={index}
                            id={c}
                            label={c}
                            checked={Collection === c}
                            onChange={()=>handleCollections(c)}
                        />
                        ))}
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );
}


function Filters() {
    const { error, isError, isLoading, data } = useGetFilters();
    console.log(data)

    return (
        <>
            {isLoading && <div>Loading Filters</div>}
            {isError && <div>Filters unavailable</div>}
            {data &&
                <div>
                    <Price data={data} />
                    <Gender data={data} />
                    <Sport data={data} />
                    <Collections data={data}/>
                    <BrandName data={data} />
                    
                </div>
            }
        </>
    );
}

function Display() {
    const { error, isError, isLoading, data } = useProductCall();

    const setPage = usePage((state) => state.setPage);
    const setItemId = useItemId((state) => state.setItemId);
    const { login } = useLogin();


    const handleItemClick = (itemid) => {
        console.log(itemid)
        setItemId(itemid);
        setPage("ItemDisplay")
    }

    const handleWishList = () => {
        if (login) {
            //add functionality
        }
        else {
            alert('You arent logged in')
        }
    }
    console.log(data)
    return (
        <div className="container">
            <Row xs={1} md={2} lg={3}>
                {isError && <div>Error in getting products</div>}
                {isLoading && <div> Products are on the way</div>}
                {data && data.length > 0 &&
                    (data.map((product) => (
                        <Col key={product._id} className="mb-4">
                            <Card style={{ height: '450px', width:'250px'}}>
                                <Card.Img variant="top"
                                    src={product.image}
                                    style={{ objectFit: 'cover', height: '40%' }} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text><b>Price:</b> ${product.price}<br></br>
                                        <b>For: </b> {product.sport} ({product.gender}) <br></br>
                                        <b>From:</b> {product.brandname}
                                        {product.Collection !== null && <span style={{ fontSize: "small" }}> ({product.Collection})</span>}
                                    </Card.Text>
                                    <Button variant="warning"
                                        style={{ marginRight: "10px", marginBottom: "5px" }}
                                        onClick={() => handleItemClick(product._id)}
                                    >View Item</Button>
                                    <Button variant="outline-danger" onClick={handleWishList}>Add to WishList</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )))
                }
            </Row>
        </div>
    );
}

function Pages() {
    const { setPageNum } = useFilters()
    const { page } = useFilters((state) => state.page);

    const handlePageChange = (pageNumber) => {
        setPageNum(pageNumber);
    };

    return (
        <Pagination>
            <Pagination.Prev
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
            />
            {Array.from({ length: 3 }, (_, index) => (
                <Pagination.Item
                    key={index + 1}
                    active={index + 1 === page}
                    onClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next
                onClick={() => handlePageChange(page + 1)}
                disabled={page === 3}
            />
        </Pagination>
    );

}

function ProductFeed() {
    const [show, setShow] = useState(true);

    const handleImageClick = () => {
        setShow(!show); // Toggle the show state on image click
    };

    return (
        <>
            <NavBar />
            <div className="feedflex">

                {show &&
                    (<div className="filtercol">{/*Div for the Filter portion*/}
                        <p><b>Filters</b></p>
                        <Filters />
                    </div>)
                }

                <div className="prodcol">{/*Div for the Product display portion*/}
                    <Row>
                        <Col>
                            {show &&
                                <>
                                    <img alt="Toggle"
                                        src={showImage}
                                        onClick={handleImageClick} />
                                    <span>Hide Filters</span>
                                </>}
                            {!show &&
                                <>
                                    <img alt="Toggle"
                                        src={notshow}
                                        onClick={handleImageClick} />
                                    <span>Show Filters</span>
                                </>}
                        </Col>
                    </Row>
                    <Row>
                        <Pages />
                    </Row>
                    <Row className="prods">
                        <Col>
                            <Display />
                        </Col>
                    </Row>

                </div>
            </div>
        </>
    )
}

export default ProductFeed