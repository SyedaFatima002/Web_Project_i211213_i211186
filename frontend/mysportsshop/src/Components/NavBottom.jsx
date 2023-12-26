import Nav from 'react-bootstrap/Nav';
import useFilters from '../Hooks/useFilters';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import useGetFilters from '../Hooks/useGetFilters';
import { Col } from 'react-bootstrap';
import usePage from '../Hooks/usePage';

function Brand() {
    const { error, isError, isLoading, data } = useGetFilters();
    const { setBrand } = useFilters();
    const {currentPage, setPage}=usePage();

    const handleClick=(b)=>{
        setBrand(b)
        if (currentPage!='ProductFeed'){
            setPage('ProductFeed')
        }
    }
    return (
        
        <>
            {isError && <div>Error in getting Stuff</div>}
            {isLoading && <div>Stuff is on the way</div>}
            {data && 
            <Dropdown>
                <Dropdown.Toggle variant='dark'>
                    <Nav.Link eventKey="brand" style={{ color: 'rgb(214, 214, 26)' }}>Brand</Nav.Link>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {data.brandnames &&
                        data.brandnames.map((b, index) => (
                            <Dropdown.Item href="#"
                                key={index}
                                onClick={(e) => handleClick(b)}>{b}</Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>}
        </>
    );
}

function Collection(){
    const { error, isError, isLoading, data } = useGetFilters();
    const { setCollections } = useFilters();

    const {currentPage, setPage}=usePage();

    const handleClick=(c)=>{
        setCollections(c)
        if (currentPage!='ProductFeed'){
            setPage('ProductFeed')
        }
    }
    return (
        <>
            {isError && <div>Error in getting Stuff</div>}
            {isLoading && <div>Stuff is on the way</div>}
            {data &&<Dropdown>
                <Dropdown.Toggle variant='dark'>
                    <Nav.Link eventKey="collection" style={{ color: 'rgb(214, 214, 26)' }}>Collections</Nav.Link>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {data.Collections &&
                        data.Collections.map((c, index) => (
                            <Dropdown.Item href="#"
                                key={index}
                                onClick={(e) => handleClick(c)}>{c}</Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>}
        </>
    );
}


function NavBottom() {

    return (
        <>
            <Nav className="justify-content-center black" activeKey="Male">
                <Nav.Item>
                    <Brand />
                </Nav.Item>
                <Nav.Item>
                    <Collection />
                </Nav.Item>
            </Nav>
        </>
    )
}

export default NavBottom
