import NavBar from "../Components/NavBar";
import Container from 'react-bootstrap/Container';
import '../CSS/profile.css';
import '../CSS/login.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import useProfile from "../Hooks/useProfile";

function Profile() {
    const {error, isError, isLoading, data}=useProfile();

    return (
        <div>
            <Form className='textsize textbox'>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
                    <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Form>
        </div>
    );
}


function ProfilePage() {
    return (
        <div>
            <NavBar />
            <div className="center">
                <Container className="itemContainer">
                    <Tabs
                        defaultActiveKey="profile"
                        id="justify-tab-example"
                        className="mb-3"
                        justify
                    >
                        <Tab eventKey="profile" title="Profile">
                            User Information
                            <Profile />
                        </Tab>

                        <Tab eventKey="following" title="Following">
                            Tab content for Home
                        </Tab>

                        <Tab eventKey="history" title="Order History">
                            Tab content for Loooonger Tab
                        </Tab>

                        <Tab eventKey="notification" title="Notifications">
                            Tab content for Notifications
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        </div>
    );
}

export default ProfilePage