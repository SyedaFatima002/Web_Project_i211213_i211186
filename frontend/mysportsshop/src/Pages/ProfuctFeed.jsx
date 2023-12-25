import NavBar from "../Components/NavBar";
import useProductCall from "../Hooks/useProductCall";
import '../CSS/feed.css'
import { useState } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import showImage from '../Assets/menuOpen.svg'
import notshow from '../Assets/menuClosed.svg'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import usePage from "../Hooks/usePage";
import useItemId from "../Hooks/useItemId";
import useLogin from "../Hooks/useLogin";
import Pagination from 'react-bootstrap/Pagination';
import useFilters from "../Hooks/useFilters";

function Filters() {
    return (
        <>

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

        }
        else {
            alert('You arent logged in')
        }
    }
    console.log(data)
    return (
        <div className="container">
            <Row xs={1} md={2} lg={4}>
                {isError && <div>Error in getting products</div>}
                {isLoading && <div> Products are on the way</div>}
                {data && data.length > 0 &&
                    (data.map((product) => (
                        <Col key={product._id} className="mb-4">
                            <Card style={{ height: '450px' }}>
                                <Card.Img variant="top"
                                    src={product.image}
                                    style={{ objectFit: 'cover', height: '40%' }} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text><b>Price:</b> ${product.price}<br></br>
                                        <b>For: </b> {product.sport} <br></br>
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
                        <Display />
                    </Row>

                </div>
            </div>
        </>
    )
}

export default ProductFeed