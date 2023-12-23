import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav'
import '../CSS/navbar.css'
import Login from '../Assets/login.png'
import register from '../Assets/register.svg'
import wishlist from '../Assets/wishlist.svg'
import wishlistFilled from '../Assets/wishlistFilled.svg'
import cart from '../Assets/cart.svg'
import useUser from '../Hooks/useUser'
import useLogin from '../Hooks/useLogin'
import useCart from '../Hooks/useCart'
import usePage from '../Hooks/usePage';

function NavTop(){
    //deal with this during profiling
    const {username}=useUser();
    const {login}=useLogin();
    const {items}=useCart();
    const setPage = usePage((state) => state.setPage);
    const [isHovered, setIsHovered] = useState(false);

    const handleLoginClick=()=>{
        if (!login){
            setPage('Login')
        }
        else{
            //add set page to profile page
        }
        
    }

    const handleRegisterClick=()=>{
        setPage('Register')
    }

    const handleWishListClick=()=>{
        if (login){
            setPage('WishList')
        }
        else{
            alert('You arent logged in')
        }
    }

    return (
        <>
            <Nav className="justify-content-end" >
                <Nav.Item className='classLink navtext' onClick={handleLoginClick} style={{cursor:"pointer"}}>
                    <img 
                        alt='Login'
                        src={Login}
                    />
                    {!login && <span>Login</span>}
                    {login && <span>{username}</span>}
                </Nav.Item>
                <Nav.Item className='classLink navtext' style={{cursor:"pointer"}} onClick={handleRegisterClick}>
                    <img 
                        alt='Register'
                        src={register}
                    />
                    <span>Register</span>
                </Nav.Item> 
                <Nav.Item   className='classLink navtext'
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={handleWishListClick}
                            style={{cursor:"pointer"}}
                >
                    <img 
                        alt='WishList'
                        src={isHovered ? wishlistFilled : wishlist}
                        style={{fill:"red"}}
                        className='imgSize'
                    />
                    <span>Wishlist</span>
                </Nav.Item>
                <Nav.Item className='classLink navtext' style={{cursor:"pointer"}}>
                    <img 
                        alt='Cart'
                        src={cart}
                    />
                    <span>Cart:({items})</span>
                </Nav.Item>
            </Nav>  
        </>    
    );
}

export default NavTop;