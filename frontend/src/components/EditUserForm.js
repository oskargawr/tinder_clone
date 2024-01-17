import React, {useState} from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';

function EditUserForm({setShowEditUserForm, user, getUser, getGenderedUsers}) {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const router = useRouter();

    const closeForm = () => {
        setShowEditUserForm(false);
    }

    const initialValues = {
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender,
        gender_interest: user.gender_interest,
        img_url: user.img_url,
        about: user.about,
        location: user.location,
    };

    const validationSchema = Yup.object({
        first_name: Yup.string().required('Required'),
        last_name: Yup.string().required('Required'),
        gender: Yup.string().required('Required'),
        gender_interest: Yup.string().required('Required'),
        img_url: Yup.string().url('Invalid URL').required('Required'),
        about: Yup.string().required('Required').max(200, 'Must be 200 characters or less'),
        location: Yup.string().required('Required'),
    });

    const onSubmit = async (values) => {
        console.log('Form data', values);

        try {
            const formData = {
                ...values,
                user_id: user.user_id,
                matches: user.matches
            }
            const res = await axios.put('http://localhost:8000/edit_user', { ...values, user_id: cookies.UserId, matches: user.matches });
            console.log(res.data);

        } catch (err) {
            console.error(err);
        }

        setShowEditUserForm(false);
        getUser();
        getGenderedUsers();
    }

return (
    <div className='edit-user-form-container'>
        <div className="close-icon">
            <IoIosCloseCircleOutline style={{ fontSize: '24px'}} onClick={closeForm}/>
        </div>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form className="edit-user-form">
                <div className="form-content">
                    <div className="input-wrapper">
                        <label htmlFor="first_name" className='edit-label'>First Name</label>
                        <Field id="first_name" name="first_name" type="text" placeholder="First Name" />
                        <ErrorMessage name="first_name" />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="last_name" className='edit-label'>Last Name</label>
                        <Field id="last_name" name="last_name" type="text" placeholder="Last Name" />
                        <ErrorMessage name="last_name" />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="gender" className='edit-label'>Gender</label>
                        <Field as="select" id="gender" name="gender">
                            <option value="">Select...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Field>
                        <ErrorMessage name="gender" />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="gender_interest" className='edit-label'>Gender Interest</label>
                        <Field as="select" id="gender_interest" name="gender_interest">
                            <option value="">Select...</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Field>
                        <ErrorMessage name="gender_interest" />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="img_url" className='edit-label'>Image URL</label>
                        <Field id="img_url" name="img_url" type="text" placeholder="Image URL" />
                        <ErrorMessage name="img_url" />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="about" className='edit-label'>About</label>
                        <Field id="about" name="about" type="text" placeholder="About" />
                        <ErrorMessage name="about" />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="location" className='edit-label'>Location</label>
                        <Field id="location" name="location" type="text" placeholder="Location" />
                        <ErrorMessage name="location" />
                    </div>

                    <button type="submit">Submit</button>
                </div>
            </Form>
        </Formik>
    </div>
)
}

export default EditUserForm