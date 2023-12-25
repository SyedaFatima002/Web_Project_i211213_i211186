import NavBar from "../Components/NavBar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useProductCall from "../Hooks/useProductCall";

function Display(){
    const {error, isError, isLoading, data}=useProductCall();
    console.log(data)
    return (
        <>
        hello
        </>
    );
}

function ProductFeed(){
    return (
        <div>
            <NavBar />
            <Container>
                <Row>
                    <Col>h1</Col>
                    <Col xs={10}>
                        <Display />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProductFeed