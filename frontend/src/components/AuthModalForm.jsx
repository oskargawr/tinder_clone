import React, { useEffect } from 'react'
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

function AuthModalForm({isSignUp}) {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
        confirmPassword: (isSignUp
           ? Yup.string()
               .oneOf([Yup.ref('password'), null], 'Passwords must match')
               .required('Required')
           : Yup.string().strip()
         ),
    })

    const onSubmit = async (values, router) => {
        if (isSignUp) {
            try {
                const res = await axios.post('http://localhost:8000/signup', values);

                const success = res.status === 201;

                setCookie('UserId', res.data.userId)
                setCookie('AuthToken', res.data.token)

                if (success) {
                    router.push('/boarding');
                }
            } catch (err) {
                console.error(err);
            }
        } else {
            try {
                const res = await axios.post('http://localhost:8000/login', values);
                const success = res.status === 201;


                setCookie('UserId', res.data.userId)
                setCookie('AuthToken', res.data.token)

                if (success) {
                    router.push('/dashboard');
                }
            } catch (err) {
                console.error(err);
            }
        }
    }
  return (
    <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => onSubmit(values, router)}
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