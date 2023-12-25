import Nav from 'react-bootstrap/Nav';

function NavBottom() {
    return (
        <>
            <Nav className="justify-content-center black" activeKey="Male">
                <Nav.Item>
                    <Nav.Link eventKey="Male" style={{ color: 'rgb(214, 214, 26)' }}>Male</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Female" style={{ color: 'rgb(214, 214, 26)' }}>Female</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="General" style={{ color: 'rgb(214, 214, 26)' }}>General</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="brand" style={{ color: 'rgb(214, 214, 26)' }}>Brand</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="collection" style={{ color: 'rgb(214, 214, 26)' }}>Collections</Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    )
}

export default NavBottom
