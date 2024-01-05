import React from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

function AuthModalForm() {
    const isSignUp = true;

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
    })

    const onSubmit = values => {
        console.log(values)
    }
  return (
    <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
              <Form className='register-form'>
                  <div className='input-wrapper'>
                      <label htmlFor='email'>Email</label>
                      <Field name='email' type='email' />
                      <ErrorMessage name='email' component="div" className="error-message"/>
                  </div>
                  <div className='input-wrapper'>
                      <label htmlFor='password'>Password</label>
                      <Field name='password' type='password' />
                      <ErrorMessage name='password' component="div" className="error-message" />
                  </div>
                    {isSignUp && <div className='input-wrapper'>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <Field name='confirmPassword' type='password' />
                        <ErrorMessage name='confirmPassword' component="div" className="error-message"/>
                    </div>}
                  <button className='secondary-button' type='submit'>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</button>
              </Form>
    </Formik>
  )
}

export default AuthModalForm