import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios, { AxiosError } from 'axios';
import Qs from 'qs';
import SmallAlert from '../Alerts/SmallAlert';
import SolidButton from '../Buttons/SolidButton';

interface PostValuesTypes {
    name: string;
    email: string;
    telegram: string;
    message: string;
}

interface ApiResponse {
  success: {
    data: {
      [key: string]: string;
    };
    message: string;
  };
  error: {
    data: {
      [key: string]: string;
    };
    message: string;
  }
}

interface ContactFormProps extends React.ComponentProps<'form'> {
}


export default function ContactForm({className, ...props}: ContactFormProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setsuccess] = useState({
    status: false,
    message: ""
  });

  const sendEmailNotification = (values: PostValuesTypes, resetForm: () => void): void => {
    setSubmitting(true);
    axios({
      url: "https://tteb.finance/tteb-finance-mailer?" + Qs.stringify(values),
      method: "GET",
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      }
    }).then((res) => {
      const response = res.data.success as ApiResponse['success'];
      if(response !== null) {
        // Show alert
        setsuccess({status: true, message: response.message});

        // reset the form
        resetForm();
      }
      setSubmitting(false);
      setShowAlert(true);
    }).catch((err: AxiosError) => {
      if (err.response) {
        const response = err.response.data;
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setsuccess({status: false, message: response.error.message});
        
      } else if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        setsuccess({status: false, message: "Some error occured, please check your internet connection or try again later."});
      } else {
        // Something happened in setting up the request that triggered an Error
        setsuccess({status: false, message: "Something went wrong, please try again later."});
      }
      setSubmitting(false);
      setShowAlert(true);
    });
  
  }
  
  const formValidationSchema = Yup.object({
    name: Yup.string().required('this field is required'),
    email: Yup.string().email('Invalid email address.').required('this field is required'),
    telegram: Yup.string().required("this field is required"),
    message: Yup.string().nullable()
  });

  return (
    <div>
      <Formik
        initialValues={{name: '', email: '', telegram: '', message: '' }}
        validationSchema={formValidationSchema}
        onSubmit={(values, { resetForm }) => { sendEmailNotification(values, resetForm)}}
      >
        <Form autoComplete="on" noValidate id="airdrop-form">
            <div className="p-3">
                <TextInput
                    name="name"
                    type="text"
                    label="Full name"
                    placeholder="Full name*"
                />
                <TextInput
                    name="email"
                    type="text"
                    label="Email address"
                    placeholder="Email address*"
                />
                <TextInput
                    name="telegram"
                    type="text"
                    label="Telegram username"
                    placeholder="Telegram username*"
                />
                <TextInput
                    name="message"
                    label="Message"
                    placeholder="Message"
                    as="textarea"
                    className="h-40"
                />
                {showAlert &&
                <SmallAlert
                    success={success.status}
                    error={!success.status}
                    message={success.message}
                    toggle={setShowAlert}
                    delay={4000}
                />}

                {/* Add a loading indicator to button */}

                <SolidButton
                    label={submitting || showAlert ? "Processing..." : "Submit"}
                    disabled={submitting || showAlert}
                    type="submit"
                    className="w-auto my-4 block mx-auto"
                />
            </div>
          </Form>
      </Formik>
    </div>
  )
};

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    as?: string;
    type?: React.HTMLInputTypeAttribute;
    placeholder: string;
}

function TextInput({name, type, label, className, placeholder, ...rest}: TextInputProps) {
    return (
        <label className="relative block my-4">
            <Field
              name={name}
              type={type}
              placeholder={placeholder}
              className={`p-2 w-full text-gray-700 bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 ${className}`}
              {...rest}
            />
            <small className="block text-red-600 font-bold text-xs mt-2">
                <ErrorMessage name={name} />
            </small>
        </label>
    )
}