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
import useUser from "../Hooks/useUser";

function Profile() {
    const { error, isError, isLoading, data } = useProfile();
    
    return (
        <>
            {isError && <div>Sorry we cant do shit. Gonna change this late {error.message} </div>}
            {isLoading && <div>Loading Your Details</div>}
            {data &&
                <div>
                    <Form className='textsize textbox'>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
                            <Form.Control
                                defaultValue={data.username}
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                            <Button variant="warning">Update</Button>
                        </InputGroup>

                    </Form>
                </div>
            }
        </>
    );
    //email
    //username
    //phoneNumber
    //Address (address, city, country)
    //password
}

function ProfileTab() {
    const { username } = useUser();
    return (
        <div className="center">
            <div>
                <h1 style={{ color: 'white' }}>Welcome {username} </h1>
            </div>
            <Container className="itemContainer">
                <Tabs
                    defaultActiveKey="profile"
                    className="mb-3 tabtitle"
                    fill
                >
                    <Tab eventKey="profile" title="Your Profile">

                        <Profile />
                    </Tab>

                    <Tab eventKey="following" title="Following">
                        Tab content for Home
                    </Tab>

                    <Tab eventKey="history" title="Order History">
                        Tab content for Loooonger Tab
                    </Tab>

                    <Tab eventKey="loyalty" title="View Loyalty Points">
                        Tab content for Notifications
                    </Tab>

                    <Tab eventKey="notification" title="Notifications">
                        Tab content for Notifications
                    </Tab>
                </Tabs>
            </Container>
        </div>
    );
}


function ProfilePage() {

    return (
        <div>
            <NavBar />
            <ProfileTab />
        </div>
    );
}

export default ProfilePage