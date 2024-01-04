import React from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

function AuthModalForm() {
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
  )
}

export default AuthModalForm