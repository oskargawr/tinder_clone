import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegistrationForm = () => {
    const initialValues = {
        first_name: '',
        last_name: '',
        dob: '',
        gender: '',
        gender_interest: '',
        img_url: '',
        about: '',
        location: '',
    };

    const isUnder18 = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthdiff = today.getMonth() - birthDate.getMonth();

        return age < 18 || (age === 18 && monthdiff < 0);
    }

    const validationSchema = Yup.object({
        first_name: Yup.string().required('Required'),
        last_name: Yup.string().required('Required'),
        dob: Yup.date()
            .required('Required')
            .max(new Date(), 'You cannot select a future date')
            .test('is-over-18', 'You must be 18 years or older', (dob) => !isUnder18(dob)),
        gender: Yup.string().required('Required'),
        gender_interest: Yup.string().required('Required'),
        img_url: Yup.string().url('Invalid URL').required('Required'),
        about: Yup.string().required('Required'),
        location: Yup.string().required('Required'),
    });

    const onSubmit = (values) => {
        console.log('Form data', values);
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>
                <Field type='text' id='first_name' name='first_name' placeholder='First Name' />
                <ErrorMessage name='first_name' />

                <Field type='text' id='last_name' name='last_name' placeholder='Last Name' />
                <ErrorMessage name='last_name' />

                <Field type='date' id='dob' name='dob' />
                <ErrorMessage name='dob' />

                <Field as='select' id='gender' name='gender'>
                    <option value=''>Select Gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </Field>
                <ErrorMessage name='gender' />

                <Field as='select' id='gender_interest' name='gender_interest'>
                    <option value=''>Interested in</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='both'>Both</option>
                </Field>
                <ErrorMessage name='gender_interest' />

                <Field type='text' id='img_url' name='img_url' placeholder='Image URL' />
                <ErrorMessage name='img_url' />

                <Field as='textarea' id='about' name='about' placeholder='About You' />
                <ErrorMessage name='about' />

                <Field type='text' id='location' name='location' placeholder='Location' />
                <ErrorMessage name='location' />

                <button type='submit'>Register</button>
            </Form>
        </Formik>
    );
};

export default RegistrationForm;