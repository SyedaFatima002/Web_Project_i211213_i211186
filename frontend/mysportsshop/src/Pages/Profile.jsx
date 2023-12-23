import NavBar from "../Components/NavBar";
import Container from 'react-bootstrap/Container';
import '../CSS/profile.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

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
                            Tab content for Profile
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