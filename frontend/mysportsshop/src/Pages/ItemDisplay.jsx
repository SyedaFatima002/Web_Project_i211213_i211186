import NavBar from "../Components/NavBar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../CSS/itemdisplay.css'
import { getProduct } from "../ApiCalls/getProduct";
import { useMutation } from "@tanstack/react-query";

function ItemDisplay(){
    const getProductMutation=useMutation({
        mutationFn: (item)=>getProduct(item.productid)
    })

    
    return (
        <>
            <NavBar />
            <div className="center">
                <Container className="itemContainer">
                    <Row>
                        <Col sm={8}>sm=8</Col>
                        <Col sm={4}>sm=4</Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default ItemDisplay;