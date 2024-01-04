import React from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

function AuthModal({setShowModal}) {
    const handleClick = () => {
        setShowModal(false)
    }

    const isSignUp = true;

    const initialValues = {
        email: '',
        password: '',
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
    })

    const onSubmit = values => {
        console.log(values)
    }


  return (
    <div className="auth-modal-wrapper">
      <div className='auth-modal'>
          <div onClick={handleClick} className='close-icon'>ⓧ</div>
          <h2 className=''> {isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
          <p>By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cook</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
              <Form>
                  <div className='input-wrapper'>
                      <label htmlFor='email'>Email</label>
                      <Field name='email' type='email' />
                      <ErrorMessage name='email' />
                  </div>
                  <div className='input-wrapper'>
                      <label htmlFor='password'>Password</label>
                      <Field name='password' type='password' />
                      <ErrorMessage name='password' />
                  </div>
                  <button className='primary-button' type='submit'>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</button>
              </Form>
          </Formik>
          
          <p>AUTH MODAL</p>
      </div>
    </div>
  )
}

export default AuthModal