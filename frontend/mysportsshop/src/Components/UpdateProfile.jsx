import InputGroup from 'react-bootstrap/InputGroup';
import useProfile from "../Hooks/useProfile";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../CSS/profile.css';

function UpdateProfile() {
    const { error, isError, isLoading, data } = useProfile();

    const [un, setUsername] = useState();
    const [em, setEmail] = useState();
    const [ph, setPhone] = useState();
    const [show, setShow] = useState(false);


    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <h5>Your Profile</h5>
            </div>
            {isError && <div>Sorry we cant do shit. Gonna change this late {error.message} </div>}
            {isLoading && <div>Loading Your Details</div>}
            {data &&
                <div>
                    <Form className='textsize textbox'>
                        <InputGroup className="mb-3 length">
                            <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
                            <Form.Control
                                defaultValue={data.username}
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Button variant="warning" size={'sm'} className='length'>Update</Button>
                        </InputGroup>

                        <InputGroup className="mb-3 length">
                            <InputGroup.Text id="basic-addon2">Email</InputGroup.Text>
                            <Form.Control
                                defaultValue={data.email}
                                aria-label="Email"
                                aria-describedby="basic-addon2"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button variant="warning" size={'sm'} className='length'>Update</Button>
                        </InputGroup>

                        <InputGroup className="mb-3 length">
                            <InputGroup.Text id="basic-addon3">Phone Number</InputGroup.Text>
                            <Form.Control
                                defaultValue={data.phoneNumber}
                                aria-label="Phone"
                                aria-describedby="basic-addon3"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <Button variant="warning" size={'sm'} className='length'>Update</Button>
                        </InputGroup>

                        <InputGroup className="mb-3 length">
                            <InputGroup.Text id="basic-addon3">Password</InputGroup.Text>
                            <Button variant="warning" size={'sm'} className='length' onClick={() => setShow(!show)}>Click to Update</Button>
                            {show &&
                                <>
                                    <Form.Control
                                        type='password'
                                        defaultValue={data.password}
                                        aria-label="password"
                                        aria-describedby="basic-addon3"
                                    />
                                    <Button variant="danger" size={'sm'}>Update</Button>
                                </>
                            }
                        </InputGroup>

                        <InputGroup className="mb-3 length">
                            <InputGroup.Text id="basic-addon3">Address (Street)</InputGroup.Text>
                            <Form.Control
                                defaultValue={data.Address[0].address}
                                aria-label="Phone"
                                aria-describedby="basic-addon3"
                                
                            />
                            <InputGroup.Text id="basic-addon3">City</InputGroup.Text>
                            <Form.Control
                                defaultValue={data.Address[0].city}
                                aria-label="Phone"
                                aria-describedby="basic-addon3"
                                
                            />
                            <InputGroup.Text id="basic-addon3">Country</InputGroup.Text>
                            <Form.Control
                                defaultValue={data.Address[0].country}
                                aria-label="Phone"
                                aria-describedby="basic-addon3"
                                
                            />
                        </InputGroup>
                        <Button variant="warning" size={'sm'} className='length'>Update</Button>

                    </Form>
                </div>
            }
        </div>
    );
    //Address (address, city, country)
}

export default UpdateProfile
