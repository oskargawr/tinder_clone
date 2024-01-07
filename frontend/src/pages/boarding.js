import React, {useState} from 'react'
import Nav from '../components/Nav.js'
import RegistrationForm from '../components/OnBoardingForm.js'
import '../style/index.scss';

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

export default Boarding