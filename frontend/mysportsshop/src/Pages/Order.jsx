import useCart from "../Hooks/useCart"
import NavBar from "../Components/NavBar"
import useUser from "../Hooks/useUser";
import useLogin from "../Hooks/useLogin";

import Form from 'react-bootstrap/Form';


function BillingDetails() {
    const { login } = useLogin();

    return (
        <>
            <div style={{ margin: '3%' }}>
                <h3>Billing Details</h3>
            </div>
            <Form style={{ margin: '3%' }}>
                
            </Form>
        </>
    );
}

function Order() {
    return (
        <>
            <NavBar />
            <div style={{
                textAlign: 'center',
                margin: '3%',
                borderBottom: '2px solid rgb(150, 1, 1)'
            }}>
                <h1>Welcome to CheckOut</h1>
            </div>
            <BillingDetails />
        </>
    )
}

export default Order