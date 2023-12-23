import React from 'react';
import Background from '../Components/Background';
import usePage from '../Hooks/usePage';
import Card from 'react-bootstrap/Card';


function Login(){
    const {currentPage}=usePage();

    return(
        <Background>
            <div className="overlay-content">
                <Card>
                    
                </Card>
            </div>
        </Background>
    );
}

export default Login;