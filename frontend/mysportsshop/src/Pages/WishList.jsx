import NavBar from "../Components/NavBar";
import heart from '../Assets/wishlistFilled.svg'
import '../CSS/Wishlist.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import WishItem from "../Components/WishItem";

function WishList(){
    return(
        <div>
            <NavBar />
            <div className="whitespace">
                <img 
                    alt='WishList'
                    src={heart}
                    className='Size'
                />
                <h1>My WishList</h1>
            </div>
            <div className="flexWishlist">
                <Container>
                    <Row>
                        <Col xs={5}>Product Name</Col>
                        <Col>Unit Price</Col>
                        <Col>Stock Status</Col>
                        <Col>Add To Cart</Col>
                    </Row>
                </Container>
            </div>
            <WishItem />
        </div>
    );
}

export default WishList;