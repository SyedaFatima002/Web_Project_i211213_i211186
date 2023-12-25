import NavTop from "./NavTop";
import '../CSS/navbar.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../Assets/logo.png';
import usePage from "../Hooks/usePage";
import NavBottom from "./NavBottom";

function NavBar() {
    const setPage = usePage((state) => state.setPage);
    return (
        <>
            <NavTop />
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand>
                        <img
                            alt='Logo'
                            src={Logo}
                            width="40px"
                            height="40px"
                            onClick={() => setPage("HomePage")}
                        />
                        <span className="font" onClick={() => setPage("HomePage")}><b>The Sports Store</b></span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-3"
                                aria-label="Search"
                            />
                            <Button variant="outline-warning">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <NavBottom />
        </>
    );
}

export default NavBar;