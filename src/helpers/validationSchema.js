// validationSchema.js
import * as Yup from 'yup'

const bookingSchema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, 'Phone must be 10 digits')
    .required('Phone number is required'),

  date: Yup.string()
    .required('Please select a date'),

  time: Yup.string()
    .required('Please select a time'),

  guests: Yup.number()
    .min(1, 'At least 1 guest required')
    .max(10, 'Maximum 10 guests allowed')
    .required('Number of guests is required'),

  occasion: Yup.string()
    .required('Please select an occasion'),
});

export { bookingSchema };