import React, {useState} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';


const RegistrationForm = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const router = useRouter();

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

    const [formData, setFormData] = useState({
        user_id: '',
        first_name: '',
        last_name: '',
        dob: '',
        gender: '',
        gender_interest: '',
        img_url: '',
        about: '',
        location: '',
        matches: [],
    })

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
        about: Yup.string().required('Required').max(200, 'Must be 200 characters or less'),
        location: Yup.string().required('Required'),
    });

    const onSubmit = async (values) => {
        try {
            const formData = {
                ...values,
                user_id: cookies.UserId,
            }
            const res = await axios.put('http://localhost:8000/update_user', { ...values, user_id: cookies.UserId });
            const success = res.status === 200;

            if (success) {
                router.push('/dashboard');
            } else {
                console.log("err");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleImgUrlChange = (event, setFieldValue) => {
        const imgUrl = event.target.value;
        setFieldValue('img_url', imgUrl);
        setFormData({
            ...formData,
            img_url: imgUrl,
        });
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ setFieldValue }) => (
            <Form className='onboarding-form'>
                <div className="form-content">
                <section className='left-side-form'>
                <div className="input-wrapper">
                <Field type='text' id='first_name' name='first_name' placeholder='First Name' />
                <ErrorMessage name='first_name' component="div" className="error-message"/>
                </div>

                <div className="input-wrapper">
                <Field type='text' id='last_name' name='last_name' placeholder='Last Name' />
                <ErrorMessage name='last_name' component="div" className="error-message"/>
                </div>

                <div className="input-wrapper">
                <Field type='date' id='dob' name='dob' />
                <ErrorMessage name='dob' component="div" className="error-message"/>
                </div>

                <div className="input-wrapper">
                <Field as='select' id='gender' name='gender'>
                    <option value=''>Select Gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </Field>
                <ErrorMessage name='gender' component="div" className="error-message"/>
                </div>

                <div className="input-wrapper">
                <Field as='select' id='gender_interest' name='gender_interest'>
                    <option value=''>Interested in</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    {/* <option value='both'>Both</option> */}
                </Field>
                <ErrorMessage name='gender_interest' component="div" className="error-message"/>
                </div>



                <div className="input-wrapper">
                <Field as='textarea' id='about' name='about' placeholder='About You' />
                <ErrorMessage name='about' component="div" className="error-message"/>
                </div>

                <div className="input-wrapper">
                <Field type='text' id='location' name='location' placeholder='Location' />
                <ErrorMessage name='location' component="div" className="error-message"/>
                </div>
                </section>
                


                <section className="photo-section">
                <div className="input-wrapper">
                <Field type='text' id='img_url' name='img_url' placeholder='Image URL' onChange={(event) => handleImgUrlChange(event, setFieldValue)} />
                <ErrorMessage name='img_url' component="div" className="error-message"/>
                </div>
                <div className="photo-container">
                    <img src={formData.img_url} alt="Image Preview" />
                </div>
                </section>
                </div>
                

                <button type='submit'>Submit</button>
            </Form>
            )}
        </Formik>
    );
};

export default RegistrationForm;