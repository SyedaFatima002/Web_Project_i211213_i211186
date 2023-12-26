import NavBar from "../Components/NavBar";
import Container from 'react-bootstrap/Container';
import '../CSS/profile.css';
import '../CSS/login.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import useUser from "../Hooks/useUser";
import Following from "../Components/Following";
import LoyaltyPoints from "../Components/LoyaltyPoints";
import Notification from "../Components/Notification";
import UpdateProfile from "../Components/UpdateProfile";

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
                        <UpdateProfile />
                    </Tab>

                    <Tab eventKey="following" title="Following">
                        <Following />
                    </Tab>

                    <Tab eventKey="history" title="Order History">
                        Tab content for Loooonger Tab
                    </Tab>

                    <Tab eventKey="loyalty" title="View Loyalty Points">
                        <LoyaltyPoints />
                    </Tab>

                    <Tab eventKey="notification" title="Notifications">
                        <Notification />
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