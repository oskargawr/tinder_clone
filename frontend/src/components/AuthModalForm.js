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
        confirmPassword: Yup.string()
            .when('isSignUp', {
                is: true,
                then: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
            }),
    })

    const onSubmit = (values) => {
        if (isSignUp) {
          axios
            .post('http://localhost:8000/signup', values)
            .then((res) => {
              console.log(res.data);
            
              const success = res.status === 201;
              console.log("sukces:" + res.status);
            
              setCookie('UserId', res.data.userId);
              setCookie('AuthToken', res.data.token);
            
              if (success) {
                console.log("sukces");
                router.push('/boarding');
              }
            })
            .catch((error) => {
              console.error(error);
              // Tutaj możesz obsłużyć błąd i podjąć odpowiednie kroki, na przykład powtórzyć żądanie fetch
            });
        } else {
          axios
            .post('http://localhost:8000/login', values)
            .then((res) => {
              console.log(res.data);
            
              const success = res.status === 201;
            
              setCookie('UserId', res.data.userId);
              setCookie('AuthToken', res.data.token);
            
              if (success) {
                router.push('/dashboard');
              }
            })
            .catch((error) => {
              console.error(error);
              // Tutaj możesz obsłużyć błąd i podjąć odpowiednie kroki
            });
        }
};
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