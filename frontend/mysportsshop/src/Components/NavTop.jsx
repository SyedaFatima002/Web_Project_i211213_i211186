import Nav from 'react-bootstrap/Nav'
import '../CSS/navbar.css'
import Login from '../Assets/login.png'
import register from '../Assets/register.svg'
import wishlist from '../Assets/wishlist.svg'
import useUser from '../Hooks/useUser'
import useLogin from '../Hooks/useLogin'

function NavTop(){
    //deal with this during profiling
    const {username}=useUser();
    const {login}=useLogin();
    return (
        <>
            <Nav className="justify-content-end">
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
            </Nav>  
        </>    
    );
}

export default NavTop;