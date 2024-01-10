import React, {useState} from 'react'
import Nav from '../components/Nav.js'
import RegistrationForm from '../components/OnBoardingForm.js'
import '../style/index.scss';
import { AuthProvider } from '../context/AuthContext.js';

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