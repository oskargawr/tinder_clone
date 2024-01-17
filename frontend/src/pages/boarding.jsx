import React, {useState} from 'react'
import Nav from '../components/Nav.jsx'
import RegistrationForm from '../components/OnBoardingForm.jsx'
import '../style/index.scss';
import { AuthProvider } from '../context/AuthContext.jsx';

function Boarding() {
  return (
    <>
        <Nav minimal={true}
            setShowModal={() => {}}
            showModal={false}
            setIsSignUp={false}
        />
        <div className='onboarding'>
            <h2>Create account</h2>
            <RegistrationForm />
        </div>
    </>
  )
}

const BoardingWithAuth = () => (
  <AuthProvider>
    <Boarding />
  </AuthProvider>
);

export default BoardingWithAuth;