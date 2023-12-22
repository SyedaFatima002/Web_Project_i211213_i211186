import useWishItems from "../Hooks/useWishItems";
import '../CSS/Wishlist.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function WishItem(){
    const {error, isError, isLoading, data}=useWishItems();

    console.log(data)

    return(
        <>
        { isError && <div>Sorry we cant do shit. Gonna change this late</div>}
        { isLoading && <div>Loading Wish List</div>}
        {data && data.map((item)=>{
            return(
                <Container key={item._id} className="borderTop">
                    <Row className="rowSpace">
                        <Col xs={5}>
                            <img
                                alt="prodImage"
                                src={item.image}
                                width="70px"
                                height="70px"
                            /><span> {item.name}</span>                          
                        </Col>
                        <Col>{item.price}</Col>
                        <Col>{item.soldout?"Out of Stock":"In Stock"}</Col>
                        <Col>
                            <Button variant="outline-success" size="sm">Add to Cart</Button>{' '}
                            <Button variant="outline-danger" size="sm">Remove</Button>
                        </Col>
                    </Row>
                </Container>
            )
        })}
        </>
    );
}

export default WishItem;