import NavBar from "../Components/NavBar";
import useProductCall from "../Hooks/useProductCall";
import '../CSS/feed.css'
import { useState } from "react";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import showImage from '../Assets/menuOpen.svg'
import notshow from '../Assets/menuClosed.svg'


function Display() {
    const { error, isError, isLoading, data } = useProductCall();
    console.log(data)
    return (
        <>
            hello
        </>
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
                        louewufherfviebruf
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
                </div>
            </div>
        </>
    )
}

export default ProductFeed