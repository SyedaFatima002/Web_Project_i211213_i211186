import Nav from 'react-bootstrap/Nav'
import '../CSS/navbar.css'
import Login from '../Assets/login.png'
import register from '../Assets/register.svg'
import wishlist from '../Assets/wishlist.svg'
import cart from '../Assets/cart.svg'
import useUser from '../Hooks/useUser'
import useLogin from '../Hooks/useLogin'
import useCart from '../Hooks/useCart'

function NavTop(){
    //deal with this during profiling
    const {username}=useUser();
    const {login}=useLogin();
    const {items}=useCart();
    return (
        <>
            <Nav className="justify-content-end" >
                <Nav.Item className='classLink navtext'>
                    <img 
                        alt='Login'
                        src={Login}
                    />
                    <span>Login</span>
                </Nav.Item>
                <Nav.Item className='classLink navtext'>
                    <img 
                        alt='Register'
                        src={register}
                    />
                    <span>Register</span>
                </Nav.Item> 
                <Nav.Item className='classLink navtext'>
                    <img 
                        alt='WishList'
                        src={wishlist}
                    />
                    <span>Wishlist</span>
                </Nav.Item>
                <Nav.Item className='classLink navtext'>
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