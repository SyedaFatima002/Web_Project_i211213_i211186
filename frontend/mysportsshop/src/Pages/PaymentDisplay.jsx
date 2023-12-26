import Background from '../Components/Background';
import usePage from '../Hooks/usePage';
import NavBar from '../Components/NavBar';


function PaymentDisplay() {
    const {setPage}=usePage();
    return (
        <>
            <NavBar />
            <Background>
                <p>Your Order is on the Way</p>
                <p className='returnHome' onClick={()=>setPage('ProductFeed')}>Return Home</p>
            </Background>
        </>
    );
}

export default PaymentDisplay;