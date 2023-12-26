import InputGroup from 'react-bootstrap/InputGroup';
import useProfile from "../Hooks/useProfile";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../CSS/profile.css';
import useUser from '../Hooks/useUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateEmail, updatePhone, updateUsername, updatePassword, updateAddress } from '../ApiCalls/updateProfile';

function UpdateProfile() {
    const { error, isError, isLoading, data } = useProfile();
    const { token, setusername, setemail } = useUser();

    const [un, setUsername] = useState();
    const [em, setEmail] = useState();
    const [ph, setPhone] = useState();
    const [show, setShow] = useState(false);
    const [pass, setPassword] = useState();
    const [add, setAdd]=useState();
    const [city, setCity]=useState();
    const [count, setCountry]=useState();
    const queryClient = useQueryClient();

    //handle username
    const usernameMutation = useMutation({
        mutationFn: async (user) => {
            try {
                const result = await updateUsername(user.token, user.newusername, user.setusername)
                return result
            } catch (error) {
                console.error('Error updating username:', error);
                throw error;
            }
        }
    })

    const handleUsername = (e) => {
        e.preventDefault();
        usernameMutation.mutate({
            token: token,
            newusername: un,
            setusername: setusername
        },
            {
                onSuccess: (data) => {
                    console.log(data);
                    queryClient.invalidateQueries('getuserprofile');
                    alert('Username Updated')
                },
            })
    }

    //handle email
    const emailMutation = useMutation({
        mutationFn: async (user) => {
            try {
                const result = await updateEmail(user.token, user.newemail, user.setemail)
                return result
            } catch (error) {
                console.error('Error updating useremail:', error);
                throw error;
            }
        }
    })

    const handleEmail = (e) => {
        e.preventDefault();
        emailMutation.mutate({
            token: token,
            newemail: em,
            setemail: setemail
        },
            {
                onSuccess: (data) => {
                    console.log(data);
                    queryClient.invalidateQueries('getuserprofile');
                    alert('Emil Updated')
                },
            })
    }

    //handle phone number
    const phoneMutation = useMutation({
        mutationFn: async (user) => {
            try {
                const result = await updatePhone(user.token, user.newphone)
                return result
            } catch (error) {
                console.error('Error updating useremail:', error);
                throw error;
            }
        }
    })

    const handlePhone = (e) => {
        e.preventDefault();
        phoneMutation.mutate({
            token: token,
            newphone: ph,
        },
            {
                onSuccess: (data) => {
                    console.log(data);
                    queryClient.invalidateQueries('getuserprofile');
                    alert('Emil Updated')
                },
            })
    }

    //handle password
    const passwordMutation = useMutation({
        mutationFn: async (user) => {
            try {
                const result = await updatePassword(user.token, user.newpassword)
                return result
            } catch (error) {
                console.error('Error updating user passwird:', error);
                throw error;
            }
        }
    })

    const handlePassword = (e, currpass) => {
        if (currpass !== pass) {
            e.preventDefault();
            passwordMutation.mutate({
                token: token,
                newpassword: pass,
            },
                {
                    onSuccess: (data) => {
                        console.log(data);
                        queryClient.invalidateQueries('getuserprofile');
                        alert('Password Updated')
                    },
                })
        }
        else{
            alert('New Password Should be Different')
        }
    }

    //handle address
    const AddMutation = useMutation({
        mutationFn: async (user) => {
            try {
                const result = await updateAddress(user.token, user.addressid, user.address, user.city, user.country)
                return result
            } catch (error) {
                console.error('Error updating user address:', error);
                throw error;
            }
        }
    })

    const handleAddress = (e, addid) => {
        e.preventDefault();
            AddMutation.mutate({
                token: token,
                addressid:addid,
                address:add, 
                city:city, 
                country:count
            },
                {
                    onSuccess: (data) => {
                        console.log(data);
                        queryClient.invalidateQueries('getuserprofile');
                        alert('Address Updated')
                    },
                })
    }

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
                            <Button variant="warning" size={'sm'} className='length' onClick={(e) => handleUsername(e)}>Update</Button>
                        </InputGroup>

                        <InputGroup className="mb-3 length">
                            <InputGroup.Text id="basic-addon2">Email</InputGroup.Text>
                            <Form.Control
                                defaultValue={data.email}
                                aria-label="Email"
                                aria-describedby="basic-addon2"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button variant="warning" size={'sm'} className='length' onClick={(e) => handleEmail(e)}>Update</Button>
                        </InputGroup>

                        <InputGroup className="mb-3 length">
                            <InputGroup.Text id="basic-addon3">Phone Number</InputGroup.Text>
                            <Form.Control
                                defaultValue={data.phoneNumber ? data.phoneNumber : ""}
                                aria-label="Phone"
                                aria-describedby="basic-addon3"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <Button variant="warning" size={'sm'} className='length' onClick={(e) => handlePhone(e)}>Update</Button>
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
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Button variant="danger" size={'sm'} onClick={(e)=>handlePassword(e, data.password)}>Update</Button>
                                </>
                            }
                        </InputGroup>

                        <InputGroup className="mb-3 length">
                            <InputGroup.Text id="basic-addon3">Address (Street)</InputGroup.Text>
                            <Form.Control
                                defaultValue={data.Address && data.Address[0] ? data.Address[0].address : ""}
                                aria-label="Phone"
                                aria-describedby="basic-addon3"
                                onChange={(e)=>setAdd(e.target.value)}
                            />
                            <InputGroup.Text id="basic-addon3">City</InputGroup.Text>
                            <Form.Control
                                defaultValue={data.Address && data.Address[0] ? data.Address[0].city : ""}
                                aria-label="Phone"
                                aria-describedby="basic-addon3"
                                onChange={(e)=>setCity(e.target.value)}

                            />
                            <InputGroup.Text id="basic-addon3">Country</InputGroup.Text>
                            <Form.Control
                                defaultValue={data.Address && data.Address[0] ? data.Address[0].country : ""}
                                aria-label="Phone"
                                aria-describedby="basic-addon3"
                                onChange={(e)=>setCountry(e.target.value)}
                            />
                        </InputGroup>
                        <Button variant="warning" size={'sm'} className='length'
                                            onClick={(e)=>handleAddress(e, data.Address[0]._id)}>Update Address</Button>

                    </Form>
                </div>
            }
        </div>
    );
}

export default UpdateProfile
