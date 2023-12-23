import NavBar from "../Components/NavBar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../CSS/itemdisplay.css'
import useItemDisplay from "../Hooks/useItemDisplay";
import useItemId from "../Hooks/useItemId";
import Image from 'react-bootstrap/Image';

function ItemDisplay(){
    const {itemId}=useItemId()
    console.log(itemId)
    const {error, isError, isLoading, data}=useItemDisplay(itemId)
    console.log(data)
    
    return (
        <>
            <NavBar />
            {isError && <div>Error in getting product {error}</div>}
            {isLoading && <div>Item on the Way...</div>}


            <div className="center">
                <Container className="itemContainer">
                    <Row>
                        <Col sm={6}>
                            <Image src={data.image} rounded className="imagSize padding"/>
                        </Col>
                        <Col sm={6}>
                            <div className="padding">
                                <h2>{data.name}</h2>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default ItemDisplay;